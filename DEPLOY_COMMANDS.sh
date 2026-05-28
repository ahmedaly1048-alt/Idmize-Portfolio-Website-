#!/bin/bash
# 🚀 Quick Deployment Commands for Hetzner Server
# Copy & paste these commands in order to deploy

# ════════════════════════════════════════════════════════════════════════════
# STEP 1: SSH into your server
# ════════════════════════════════════════════════════════════════════════════

# ssh user@your-server-ip
# cd /app/idmize-web


# ════════════════════════════════════════════════════════════════════════════
# STEP 2: Pull latest changes
# ════════════════════════════════════════════════════════════════════════════

git pull origin main


# ════════════════════════════════════════════════════════════════════════════
# STEP 3: Generate and set ADMIN_TOKEN
# ════════════════════════════════════════════════════════════════════════════

# Generate strong token
ADMIN_TOKEN=$(openssl rand -hex 32)

# Add to backend .env
echo "ADMIN_TOKEN=$ADMIN_TOKEN" >> backend/.env
echo "COOKIE_CONSENT_EXPIRATION_DAYS=365" >> backend/.env
echo "COOKIE_HISTORY_RETENTION_DAYS=90" >> backend/.env
echo "ENABLE_GDPR_ENDPOINTS=true" >> backend/.env

# Show what was added (for reference)
echo "✓ Admin token generated: $ADMIN_TOKEN"
echo "✓ Variables added to .env"


# ════════════════════════════════════════════════════════════════════════════
# STEP 4: Set up frontend analytics ID
# ════════════════════════════════════════════════════════════════════════════

# Create .env.local if not exists
if [ ! -f idmize-web/.env.local ]; then
  echo "NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX" > idmize-web/.env.local
  echo "✓ Created idmize-web/.env.local"
  echo "  → EDIT: Add your Google Analytics ID"
else
  echo "✓ idmize-web/.env.local already exists"
fi


# ════════════════════════════════════════════════════════════════════════════
# STEP 5: Install dependencies
# ════════════════════════════════════════════════════════════════════════════

# Frontend
npm install --prefix idmize-web

# Backend
npm install --prefix backend


# ════════════════════════════════════════════════════════════════════════════
# STEP 6: Run database migration
# ════════════════════════════════════════════════════════════════════════════

cd backend
npx prisma migrate deploy
# If first time:
# npx prisma migrate dev --name add_cookie_consent
cd ..


# ════════════════════════════════════════════════════════════════════════════
# STEP 7: Verify database tables
# ════════════════════════════════════════════════════════════════════════════

# Connect to your database and run:
# psql -d your_database_name
# \dt cookie*
# \dt privacy*
# \q

echo "✓ Verify tables with: psql -d your_db -c '\\dt cookie* privacy*'"


# ════════════════════════════════════════════════════════════════════════════
# STEP 8: Build both services
# ════════════════════════════════════════════════════════════════════════════

npm run build --prefix idmize-web

# Backend doesn't need build, but verify
cd backend && npm list && cd ..


# ════════════════════════════════════════════════════════════════════════════
# STEP 9: Stop existing services
# ════════════════════════════════════════════════════════════════════════════

pm2 stop idmize-api idmize-web


# ════════════════════════════════════════════════════════════════════════════
# STEP 10: Start services
# ════════════════════════════════════════════════════════════════════════════

# Option A: Using PM2 directly
pm2 start "npm run start --prefix idmize-web" --name idmize-web
pm2 start "npm run start --prefix backend" --name idmize-api

# Option B: Using ecosystem file (if you have one)
# pm2 start ecosystem.config.js


# ════════════════════════════════════════════════════════════════════════════
# STEP 11: Verify services are running
# ════════════════════════════════════════════════════════════════════════════

pm2 status
pm2 logs --lines 50


# ════════════════════════════════════════════════════════════════════════════
# STEP 12: Test API endpoints
# ════════════════════════════════════════════════════════════════════════════

# Health check
echo "Testing health endpoint..."
curl https://api.idmize.com/health

# Test consent endpoint
echo -e "\nTesting consent endpoint..."
curl https://api.idmize.com/api/cookies/consent

# Test record consent
echo -e "\nTesting record consent..."
curl -X POST https://api.idmize.com/api/cookies/consent \
  -H "Content-Type: application/json" \
  -d '{
    "essential": true,
    "analytics": true,
    "marketing": false
  }'

# Test admin stats (replace with your actual token)
echo -e "\nTesting admin stats..."
ADMIN_TOKEN=$(grep ADMIN_TOKEN backend/.env | cut -d= -f2)
curl https://api.idmize.com/api/cookies/stats \
  -H "Authorization: Bearer $ADMIN_TOKEN"


# ════════════════════════════════════════════════════════════════════════════
# STEP 13: Test website
# ════════════════════════════════════════════════════════════════════════════

# Visit website in incognito window
# https://idmize.com
# Should see:
# ✓ Cookie banner appears
# ✓ Can expand "Cookie Details"
# ✓ Can toggle analytics/marketing
# ✓ Can click Accept/Reject
# ✓ No JavaScript errors in console


# ════════════════════════════════════════════════════════════════════════════
# STEP 14: Create initial privacy policy
# ════════════════════════════════════════════════════════════════════════════

ADMIN_TOKEN=$(grep ADMIN_TOKEN backend/.env | cut -d= -f2)

curl -X POST https://api.idmize.com/api/privacy-policy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "version": "1.0",
    "content": "Your full privacy policy text here...",
    "publish": true
  }'


# ════════════════════════════════════════════════════════════════════════════
# STEP 15: Monitor services
# ════════════════════════════════════════════════════════════════════════════

# Watch real-time logs
pm2 logs

# Or watch specific service
pm2 logs idmize-api
pm2 logs idmize-web


# ════════════════════════════════════════════════════════════════════════════
# FINAL CHECKLIST
# ════════════════════════════════════════════════════════════════════════════

echo ""
echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║  ✅ DEPLOYMENT COMPLETE - FINAL CHECKLIST                              ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "Before going live, verify:"
echo ""
echo "  ✓ Banner appears on https://idmize.com (incognito window)"
echo "  ✓ API endpoint responds: curl https://api.idmize.com/api/cookies/consent"
echo "  ✓ Database tables exist: psql -d idmize -c '\\dt cookie* privacy*'"
echo "  ✓ Services running: pm2 status"
echo "  ✓ No errors in logs: pm2 logs | grep -i error"
echo "  ✓ ADMIN_TOKEN saved: grep ADMIN_TOKEN backend/.env"
echo "  ✓ Google Analytics ID set: grep GA_ID idmize-web/.env.local"
echo "  ✓ Privacy policy v1.0 created"
echo ""
echo "Next steps:"
echo "  1. Customize banner styling if needed"
echo "  2. Add your Google Analytics ID"
echo "  3. Create privacy policy content"
echo "  4. Set up marketing pixels (optional)"
echo "  5. Monitor consent rates: curl https://api.idmize.com/api/cookies/stats"
echo ""
echo "Documentation:"
echo "  • DEPLOYMENT_SUMMARY.md - Overview"
echo "  • HETZNER_DEPLOYMENT.md - Full guide"
echo "  • BACKEND_COOKIE_SETUP.md - Backend details"
echo "  • COOKIES_QUICK_REFERENCE.md - Quick lookup"
echo ""
echo "Good luck! 🚀"
echo ""
