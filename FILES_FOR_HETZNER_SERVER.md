# Complete List of New Backend Files

## Created Files for Cookie Management

Your Hetzner server needs these files (all located in the `backend/` directory):

### 1. Controllers
```
backend/src/controllers/cookieController.js
```
- Records and manages cookie consent
- Exports user data (GDPR)
- Manages privacy policy versions
- Provides admin statistics

### 2. Routes
```
backend/src/routes/cookieRoutes.js
```
- POST /api/cookies/consent - Record consent
- GET /api/cookies/consent - Get user's consent
- PATCH /api/cookies/consent - Update consent
- DELETE /api/cookies/consent - Withdraw consent
- GET/POST /api/privacy-policy - Privacy policy management
- GET /api/cookies/export - Export user data
- DELETE /api/cookies/data - Delete user data (GDPR)
- GET /api/cookies/stats - Admin statistics

### 3. Middleware
```
backend/src/middleware/consentMiddleware.js
backend/src/utils/consentUtils.js
```
- Tracking middleware for requests
- Consent verification helpers
- Admin authentication
- Utility functions for consent checks

### 4. Database Schema
```
backend/prisma/schema.prisma (UPDATED)
```
- Added CookieConsent model
- Added CookieConsentHistory model
- Added PrivacyPolicyVersion model

### 5. Configuration
```
backend/.env.example (UPDATED)
backend/src/app.js (UPDATED)
```
- Updated with cookie variables
- Added cookie routes to app
- Added CORS for PATCH/DELETE methods

### 6. Documentation
```
BACKEND_COOKIE_SETUP.md
backend/setup-cookies.sh
```
- Complete setup guide
- Automated setup script

## File Structure on Server

```
/app/idmize-web/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── cookieController.js          ✨ NEW
│   │   │   ├── demoController.js            (existing)
│   │   │   └── contactController.js         (existing)
│   │   ├── routes/
│   │   │   ├── cookieRoutes.js              ✨ NEW
│   │   │   ├── demoRoutes.js                (existing)
│   │   │   └── contactRoutes.js             (existing)
│   │   ├── middleware/
│   │   │   ├── consentMiddleware.js         ✨ NEW
│   │   ├── utils/
│   │   │   ├── consentUtils.js              ✨ NEW
│   │   ├── models/
│   │   │   └── prismaClient.js              (existing)
│   │   └── app.js                           (UPDATED)
│   ├── prisma/
│   │   ├── schema.prisma                    (UPDATED)
│   │   └── migrations/
│   │       └── [date]_add_cookie_consent/   ✨ NEW
│   ├── .env                                 (update with new vars)
│   ├── .env.example                         (UPDATED)
│   ├── setup-cookies.sh                     ✨ NEW
│   └── package.json                         (no changes needed)
```

## Summary of Changes

### New Files (7)
1. cookieController.js
2. cookieRoutes.js
3. consentMiddleware.js
4. consentUtils.js
5. BACKEND_COOKIE_SETUP.md
6. setup-cookies.sh
7. cookieModels.prisma (reference file)

### Modified Files (2)
1. .env.example - Added cookie variables
2. src/app.js - Added cookie routes & middleware
3. prisma/schema.prisma - Added cookie models

### Database Migration (1)
1. Automatic Prisma migration creates 3 new tables

## Quick Deployment Checklist

- [ ] Copy all new files to Hetzner server
- [ ] Update .env with ADMIN_TOKEN
- [ ] Run: `npm install`
- [ ] Run: `npx prisma migrate deploy`
- [ ] Verify tables: `psql -d your_db -c "\dt cookie*"`
- [ ] Restart server: `pm2 restart idmize-api`
- [ ] Test: `curl http://localhost:5001/api/cookies/consent`
- [ ] Create privacy policy version 1.0
- [ ] Update frontend API URLs

## Environment Variables to Add

```bash
# Add to .env file
ADMIN_TOKEN="your-strong-random-token"
COOKIE_CONSENT_EXPIRATION_DAYS=365
COOKIE_HISTORY_RETENTION_DAYS=90
ENABLE_GDPR_ENDPOINTS=true
```

## Deployment Methods

### Option 1: Git Push (Recommended)
```bash
git add backend/
git commit -m "feat: add cookie management backend"
git push origin main
# Then SSH into server and git pull
```

### Option 2: Manual Copy
```bash
# On local machine
scp -r backend/* user@server:/app/idmize-web/backend/

# On server
cd /app/idmize-web/backend
npm install
npx prisma migrate deploy
pm2 restart idmize-api
```

### Option 3: Direct SSH
```bash
ssh user@server "cd /app/idmize-web && npm install && npx prisma migrate deploy && pm2 restart idmize-api"
```

## Verification

After deployment, verify everything works:

```bash
# Check health
curl https://api.idmize.com/health

# Test consent endpoint
curl https://api.idmize.com/api/cookies/consent

# Test with data
curl -X POST https://api.idmize.com/api/cookies/consent \
  -H "Content-Type: application/json" \
  -d '{"essential":true,"analytics":true,"marketing":false}'

# Check stats (requires ADMIN_TOKEN)
curl https://api.idmize.com/api/cookies/stats \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Support

For issues, check:
1. Server logs: `pm2 logs`
2. Database: `psql -d idmize -c "SELECT * FROM cookie_consents;"`
3. Routes: `curl http://localhost:5001/api/cookies/consent`
4. CORS: Check browser console for CORS errors

See BACKEND_COOKIE_SETUP.md for detailed troubleshooting.
