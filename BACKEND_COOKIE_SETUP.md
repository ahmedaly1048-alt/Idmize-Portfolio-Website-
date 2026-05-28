# Backend Cookie Management Setup Guide

This guide explains how to set up the cookie consent backend on your Hetzner server.

## What's Included

### Files Created

**Controllers:**
- `src/controllers/cookieController.js` - All cookie consent logic

**Routes:**
- `src/routes/cookieRoutes.js` - Cookie consent API endpoints

**Middleware:**
- `src/middleware/consentMiddleware.js` - Consent tracking and verification
- `src/utils/consentUtils.js` - Utility functions

**Database:**
- `prisma/schema.prisma` - Updated with cookie models
- Migration files ready to run

**Configuration:**
- `.env.example` - Updated with new variables
- `src/app.js` - Updated to include cookie routes

## Database Models

### CookieConsent
Stores user's current cookie preferences
- `clientId` - Unique identifier (hash of IP + User Agent)
- `essential`, `analytics`, `marketing` - Boolean preferences
- `expiresAt` - Expires after 1 year

### CookieConsentHistory
Audit trail of consent changes
- `clientId` - Which user made the change
- `action` - 'accepted', 'rejected', 'updated', 'withdrawn'
- `createdAt` - When the change occurred

### PrivacyPolicyVersion
Versioned privacy policies
- `version` - Version number (e.g., "1.0", "1.1")
- `content` - Full policy text
- `published` - Only one version is published at a time

## API Endpoints

### Record/Update Consent
```
POST /api/cookies/consent
PATCH /api/cookies/consent
```
Body:
```json
{
  "essential": true,
  "analytics": true,
  "marketing": false
}
```

### Get User's Consent
```
GET /api/cookies/consent
```

### Withdraw Consent
```
DELETE /api/cookies/consent
```

### Privacy Policy
```
GET /api/privacy-policy
GET /api/privacy-policy?version=1.0
POST /api/privacy-policy (admin only)
```

### GDPR Endpoints
```
GET /api/cookies/export       # Export user's consent data
DELETE /api/cookies/data      # Delete user's data (right to be forgotten)
```

### Admin Stats
```
GET /api/cookies/stats        # Requires Authorization: Bearer ADMIN_TOKEN
```

## Installation Steps

### 1. Update Environment Variables

Edit `.env` on your server:

```bash
# Add to existing .env file:
ADMIN_TOKEN="your-super-secret-token-change-this"
COOKIE_CONSENT_EXPIRATION_DAYS=365
COOKIE_HISTORY_RETENTION_DAYS=90
ENABLE_GDPR_ENDPOINTS=true
```

**Important:** Generate a strong random token:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Run Database Migration

```bash
# Generate migration
npm run migrate:dev -- --name add_cookie_consent

# Or create migration file manually if needed
npx prisma migrate dev
```

The migration will create these tables:
- `cookie_consents`
- `cookie_consent_history`
- `privacy_policy_versions`

### 3. Verify Routes Are Active

Restart your backend server:
```bash
pm2 restart idmize-api
# or
systemctl restart idmize-api
```

Check logs:
```bash
pm2 logs idmize-api | grep "cookie"
```

## Testing the Backend

### Test Record Consent
```bash
curl -X POST http://localhost:5001/api/cookies/consent \
  -H "Content-Type: application/json" \
  -d '{
    "essential": true,
    "analytics": true,
    "marketing": false
  }'
```

### Test Get Consent
```bash
curl http://localhost:5001/api/cookies/consent
```

### Test Get Stats (Admin)
```bash
curl http://localhost:5001/api/cookies/stats \
  -H "Authorization: Bearer your-admin-token"
```

## Integration with Frontend

The frontend sends requests to these endpoints:

```typescript
// Get user's consent from backend
const response = await fetch('https://api.idmize.com/api/cookies/consent');
const consent = await response.json();

// Send user's choice to backend
fetch('https://api.idmize.com/api/cookies/consent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    essential: true,
    analytics: true,
    marketing: false
  })
});
```

## Server Deployment Checklist

- [ ] Update `.env` with `ADMIN_TOKEN`
- [ ] Run Prisma migration: `npx prisma migrate deploy`
- [ ] Verify tables created: `psql -d your_db -c "\dt"`
- [ ] Restart backend service
- [ ] Test consent endpoints
- [ ] Verify CORS allows frontend domain
- [ ] Monitor logs for errors
- [ ] Set up privacy policy version 1.0 (see below)

## Creating Initial Privacy Policy

```bash
curl -X POST http://localhost:5001/api/privacy-policy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-admin-token" \
  -d '{
    "version": "1.0",
    "content": "Your full privacy policy text here...",
    "publish": true
  }'
```

## CORS Configuration

Update `src/app.js` to include your Hetzner domain:

```javascript
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "https://idmize.com",
    "https://www.idmize.com",
    "https://api.idmize.com",  // Add your API domain
    "http://localhost:3000",
  ],
}));
```

## Data Privacy & Compliance

### What's Stored
- Hashed client identifier (not reversible)
- Anonymized IP (last octet removed)
- User agent string
- Consent preferences
- Timestamps

### What's NOT Stored
- Personal data
- Full IP addresses
- Cookies themselves

### Compliance Features
- GDPR-compliant data storage
- Right to access: `GET /api/cookies/export`
- Right to be forgotten: `DELETE /api/cookies/data`
- Audit trail in history table
- Automatic expiration after 1 year

## Monitoring & Maintenance

### Check Consent Stats
```bash
curl http://localhost:5001/api/cookies/stats \
  -H "Authorization: Bearer your-admin-token"
```

Returns:
```json
{
  "total": 1500,
  "analytics": {
    "count": 950,
    "percentage": "63.33"
  },
  "marketing": {
    "count": 650,
    "percentage": "43.33"
  }
}
```

### Clean Up Expired Consents
Add a cron job to delete expired records:

```bash
# In your cron or scheduler
0 2 * * * node -e "
  const prisma = require('./backend/src/models/prismaClient');
  prisma.cookieConsent.deleteMany({
    where: { expiresAt: { lt: new Date() } }
  });
"
```

### View Recent Consent Changes
```sql
SELECT * FROM cookie_consent_history 
ORDER BY "createdAt" DESC 
LIMIT 100;
```

## Security Best Practices

1. **Change ADMIN_TOKEN** - Use a strong, unique token
2. **Enable HTTPS** - All endpoints should use HTTPS
3. **Rate Limiting** - Add rate limiting to prevent abuse
4. **Logging** - Monitor admin endpoints for suspicious access
5. **Backups** - Regular database backups
6. **Updates** - Keep dependencies updated

## Troubleshooting

### Migration Fails
```bash
# Check Prisma status
npx prisma migrate status

# Reset database (development only!)
npx prisma migrate reset
```

### Routes Not Working
```bash
# Check if routes are registered
curl http://localhost:5001/health
curl http://localhost:5001/api/cookies/consent
```

### Admin Token Issues
```bash
# Verify token in .env
grep ADMIN_TOKEN .env

# Test with token
curl http://localhost:5001/api/cookies/stats \
  -H "Authorization: Bearer $(grep ADMIN_TOKEN .env | cut -d= -f2)"
```

## Next Steps

1. Deploy files to Hetzner server
2. Update environment variables
3. Run database migration
4. Test all endpoints
5. Set up initial privacy policy
6. Monitor usage and compliance

## Support

- Check logs: `pm2 logs`
- Verify routes: Check `src/routes/cookieRoutes.js`
- Database issues: Check Prisma logs
- CORS problems: Verify frontend URL in CORS config
