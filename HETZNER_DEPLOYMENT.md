# Complete Hetzner Deployment Guide for Cookie Management

## Overview

This guide walks you through deploying the complete cookie management system (frontend + backend) to your Hetzner server.

## What You're Deploying

### Frontend (Next.js)
- Cookie consent banner
- Cookie preference management
- Google Analytics integration
- Marketing pixel support

### Backend (Node.js/Express)
- Cookie consent API
- Privacy policy management
- GDPR compliance endpoints
- Admin dashboard support

### Database (PostgreSQL)
- 3 new tables for cookie tracking
- Audit trail for consent changes
- Privacy policy versioning

---

## Deployment Steps

### Phase 1: Prepare Your Local Environment

#### 1.1 Commit Changes to Git
```bash
cd idmize-web
git status  # Review all changes
git add .
git commit -m "feat: add complete cookie management system (frontend + backend)"
git push origin main
```

#### 1.2 Verify All Files Are Present
```bash
# Frontend files
ls src/lib/cookieConfig.ts
ls src/lib/cookieUtils.ts
ls src/components/CookieConsent.tsx
ls src/components/GoogleAnalytics.tsx
ls src/components/MarketingTracking.tsx

# Backend files
ls backend/src/controllers/cookieController.js
ls backend/src/routes/cookieRoutes.js
ls backend/src/middleware/consentMiddleware.js
ls backend/src/utils/consentUtils.js

# Configuration
ls BACKEND_COOKIE_SETUP.md
ls FILES_FOR_HETZNER_SERVER.md
```

---

### Phase 2: Deploy to Hetzner Server

#### 2.1 SSH into Your Server
```bash
ssh user@your-server-ip
cd /app/idmize-web
```

#### 2.2 Pull Latest Changes
```bash
git pull origin main
```

#### 2.3 Update Backend Environment
```bash
# Edit .env file
nano .env

# Add/update these variables:
ADMIN_TOKEN="$(openssl rand -hex 32)"  # Generate new token
COOKIE_CONSENT_EXPIRATION_DAYS=365
COOKIE_HISTORY_RETENTION_DAYS=90
ENABLE_GDPR_ENDPOINTS=true
```

#### 2.4 Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### 2.5 Run Database Migration
```bash
cd backend
npx prisma migrate deploy
# Or if this is first migration:
# npx prisma migrate dev --name add_cookie_consent
cd ..
```

#### 2.6 Verify Database Tables Created
```bash
# Connect to database
psql -d your_database_name

# Check tables
\dt cookie*
\dt privacy*

# Exit
\q
```

#### 2.7 Update Frontend Environment
```bash
# Copy .env.local.example if not exists
cp idmize-web/.env.local.example idmize-web/.env.local

# Edit frontend config
nano idmize-web/.env.local

# Add Google Analytics ID:
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# Add optional marketing IDs:
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id
NEXT_PUBLIC_GOOGLE_ADS_ID=your-ads-id
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=your-partner-id
```

#### 2.8 Build Backend
```bash
cd backend
npm run build 2>/dev/null || echo "No build script needed"
cd ..
```

#### 2.9 Build Frontend
```bash
cd idmize-web
npm run build
cd ..
```

#### 2.10 Restart Services

```bash
# Stop services
pm2 stop idmize-api idmize-web

# Start services
pm2 start "npm run dev --prefix backend" --name idmize-api
pm2 start "npm run start --prefix idmize-web" --name idmize-web

# Or if using ecosystem file:
pm2 start ecosystem.config.js

# Verify status
pm2 status
pm2 logs
```

---

### Phase 3: Verification

#### 3.1 Test Backend API

```bash
# Health check
curl https://api.idmize.com/health

# Test consent endpoint
curl https://api.idmize.com/api/cookies/consent

# Test record consent
curl -X POST https://api.idmize.com/api/cookies/consent \
  -H "Content-Type: application/json" \
  -d '{
    "essential": true,
    "analytics": true,
    "marketing": false
  }'

# Test admin stats (requires ADMIN_TOKEN)
ADMIN_TOKEN=$(grep ADMIN_TOKEN .env | cut -d= -f2)
curl https://api.idmize.com/api/cookies/stats \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 3.2 Test Frontend

```bash
# Visit your site in incognito/private mode
# You should see the cookie banner
https://idmize.com

# Test:
# 1. Banner appears on first visit
# 2. Can expand cookie details
# 3. Can accept/reject cookies
# 4. Preferences are saved
# 5. Banner doesn't show on second visit
# 6. Can clear cookies to see banner again
```

#### 3.3 Check Browser Console
```javascript
// In browser DevTools → Console:

// Check if cookie is set
document.cookie

// Check stored consent
localStorage.getItem('idmize_cookie_consent')

// Check if Analytics loaded
window.gtag ? console.log('Analytics ready') : console.log('Analytics not loaded')
```

#### 3.4 Monitor Logs

```bash
# Watch real-time logs
pm2 logs idmize-api --lines 50
pm2 logs idmize-web --lines 50

# Look for errors
pm2 logs | grep -i error
pm2 logs | grep -i cookie
```

---

### Phase 4: Initial Setup

#### 4.1 Create Privacy Policy

```bash
# Get your ADMIN_TOKEN
ADMIN_TOKEN=$(grep ADMIN_TOKEN /app/idmize-web/backend/.env | cut -d= -f2)

# Create initial privacy policy version
curl -X POST https://api.idmize.com/api/privacy-policy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "version": "1.0",
    "content": "Your full privacy policy text here...",
    "publish": true
  }'
```

#### 4.2 Configure CORS (if needed)

Edit `backend/src/app.js` and ensure your domains are included:

```javascript
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "https://idmize.com",
    "https://www.idmize.com",
    "https://api.idmize.com",  // Your API domain
    "http://localhost:3000",
  ],
}));
```

Then restart backend:
```bash
pm2 restart idmize-api
```

---

## File Checklist

### Frontend Files ✓
- [x] src/lib/cookieConfig.ts
- [x] src/lib/cookieUtils.ts
- [x] src/components/CookieConsent.tsx
- [x] src/components/GoogleAnalytics.tsx
- [x] src/components/MarketingTracking.tsx
- [x] src/types/cookies.d.ts
- [x] .env.local.example (updated)
- [x] src/app/layout.tsx (updated)

### Backend Files ✓
- [x] backend/src/controllers/cookieController.js
- [x] backend/src/routes/cookieRoutes.js
- [x] backend/src/middleware/consentMiddleware.js
- [x] backend/src/utils/consentUtils.js
- [x] backend/prisma/schema.prisma (updated)
- [x] backend/src/app.js (updated)
- [x] backend/.env.example (updated)
- [x] backend/setup-cookies.sh
- [x] backend/prisma/migrations/cookie_schema.sql

### Documentation ✓
- [x] COOKIES_QUICK_REFERENCE.md
- [x] COOKIE_SETUP.md
- [x] BACKEND_COOKIE_SETUP.md
- [x] MARKETING_TRACKING_SETUP.md
- [x] PRIVACY_POLICY_TEMPLATE.md
- [x] FILES_FOR_HETZNER_SERVER.md
- [x] HETZNER_DEPLOYMENT.md (this file)

---

## Environment Variables Summary

### Backend `.env`
```
# Server
PORT=5001
NODE_ENV=production

# Database
DATABASE_URL="postgresql://..."

# Frontend
FRONTEND_URL=https://idmize.com

# Security
ADMIN_TOKEN="your-random-token-here"

# Cookies
COOKIE_CONSENT_EXPIRATION_DAYS=365
COOKIE_HISTORY_RETENTION_DAYS=90
ENABLE_GDPR_ENDPOINTS=true
```

### Frontend `.env.local`
```
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional Marketing
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id
NEXT_PUBLIC_GOOGLE_ADS_ID=your-conversion-id
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=your-partner-id
```

---

## Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Verify all endpoints working
- [ ] Test cookie banner on website
- [ ] Check browser console for errors
- [ ] Monitor server logs
- [ ] Create initial privacy policy version

### Short Term (Week 1)
- [ ] Customize cookie banner styling if needed
- [ ] Set up Google Analytics views/reports
- [ ] Configure marketing pixels (Facebook, LinkedIn, etc.)
- [ ] Test consent tracking
- [ ] Verify GDPR compliance

### Ongoing
- [ ] Monitor cookie consent rates
- [ ] Review analytics data
- [ ] Update privacy policy if needed
- [ ] Clean up expired consents (set up cron)
- [ ] Monitor logs for errors

---

## Rollback Plan

If something goes wrong, you can rollback:

```bash
# Revert database migration
cd backend
npx prisma migrate resolve --rolled-back add_cookie_consent
cd ..

# Revert code changes
git revert HEAD

# Restart services
pm2 restart idmize-api idmize-web

# Verify
curl https://api.idmize.com/health
```

---

## Monitoring Commands

### Check Service Status
```bash
pm2 status
pm2 info idmize-api
pm2 info idmize-web
```

### View Recent Logs
```bash
pm2 logs idmize-api --lines 100
pm2 logs idmize-web --lines 100
pm2 logs | tail -50
```

### Database Health
```bash
# Connect to database
psql -d your_database

# Check row counts
SELECT 'cookie_consents' as table_name, COUNT(*) as count FROM cookie_consents
UNION ALL
SELECT 'cookie_consent_history', COUNT(*) FROM cookie_consent_history
UNION ALL
SELECT 'privacy_policy_versions', COUNT(*) FROM privacy_policy_versions;

# Check for errors
SELECT * FROM cookie_consent_history WHERE action IN ('rejected', 'withdrawn') ORDER BY createdAt DESC LIMIT 10;
```

### Performance Monitoring
```bash
# Check memory usage
pm2 monit

# Check disk space
df -h

# Check CPU
top -b -n 1 | head -20
```

---

## Troubleshooting

### Issue: Migration Fails
```bash
# Check migration status
cd backend
npx prisma migrate status

# If stuck, reset (development only)
npx prisma migrate reset

# Or manually create tables
psql -d your_database -f prisma/migrations/cookie_schema.sql
```

### Issue: API Endpoints Not Responding
```bash
# Check if service is running
pm2 status

# Check logs
pm2 logs idmize-api

# Try manual test
curl http://localhost:5001/api/cookies/consent

# Restart if needed
pm2 restart idmize-api
```

### Issue: CORS Errors in Browser
```bash
# Edit app.js and verify your domain is in CORS list
nano backend/src/app.js

# Restart backend
pm2 restart idmize-api

# Test CORS
curl -H "Origin: https://idmize.com" -v https://api.idmize.com/api/cookies/consent
```

### Issue: Cookies Not Saving
```bash
# Check .env variables
grep COOKIE_CONSENT backend/.env

# Verify database connection
psql -d your_database -c "SELECT COUNT(*) FROM cookie_consents;"

# Check browser storage
# DevTools → Application → Cookies → Check idmize_cookie_consent
```

---

## Support Resources

- Backend Guide: [BACKEND_COOKIE_SETUP.md](BACKEND_COOKIE_SETUP.md)
- Files List: [FILES_FOR_HETZNER_SERVER.md](FILES_FOR_HETZNER_SERVER.md)
- Frontend Setup: [COOKIE_SETUP.md](COOKIE_SETUP.md)
- Marketing Setup: [MARKETING_TRACKING_SETUP.md](MARKETING_TRACKING_SETUP.md)

---

## Security Checklist

- [ ] ADMIN_TOKEN is strong and unique
- [ ] Database credentials are secure
- [ ] HTTPS is enabled for all endpoints
- [ ] CORS origins are restricted
- [ ] Rate limiting is configured
- [ ] Backups are scheduled
- [ ] Logs are monitored
- [ ] Dependencies are up to date

---

## Success Indicators

You'll know the deployment is successful when:

1. ✅ Cookie banner appears on first visit
2. ✅ Users can accept/reject cookies
3. ✅ Preferences persist across page reloads
4. ✅ Admin stats show consent counts
5. ✅ Privacy policy is accessible
6. ✅ No JavaScript errors in console
7. ✅ Analytics loads when consented
8. ✅ GDPR endpoints work (export/delete)

---

## Need Help?

Check:
1. Server logs: `pm2 logs`
2. Database: `psql -d your_db -c "\dt"`
3. Documentation files in project root
4. Comments in controller files

Good luck! 🚀
