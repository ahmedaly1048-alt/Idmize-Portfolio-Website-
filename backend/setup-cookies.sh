#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Backend Cookie Setup Script for Hetzner Server
# Run this script to set up cookie management on your server
# ─────────────────────────────────────────────────────────────

set -e

echo "🍪 Cookie Management Backend Setup"
echo "═══════════════════════════════════════════════════════════"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if Node.js is installed
echo -e "${BLUE}Step 1: Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"

# Step 2: Install dependencies (if needed)
echo -e "${BLUE}Step 2: Installing/updating dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Generate admin token if not exists
echo -e "${BLUE}Step 3: Checking ADMIN_TOKEN...${NC}"
if grep -q "^ADMIN_TOKEN=" .env; then
    echo -e "${GREEN}✓ ADMIN_TOKEN already set${NC}"
else
    TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    echo "ADMIN_TOKEN=$TOKEN" >> .env
    echo -e "${GREEN}✓ Generated new ADMIN_TOKEN: $TOKEN${NC}"
fi

# Step 4: Run Prisma migration
echo -e "${BLUE}Step 4: Running database migration...${NC}"
npx prisma migrate deploy || npx prisma migrate dev --name add_cookie_consent
echo -e "${GREEN}✓ Database migration completed${NC}"

# Step 5: Seed initial data (optional)
echo -e "${BLUE}Step 5: Setting up initial privacy policy...${NC}"
read -p "Do you want to create initial privacy policy? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter privacy policy version (default: 1.0): " VERSION
    VERSION=${VERSION:-1.0}
    echo -e "${YELLOW}Please create policy content in dashboard, or use this curl command:${NC}"
    echo ""
    echo "curl -X POST https://api.idmize.com/api/privacy-policy \\"
    echo "  -H 'Content-Type: application/json' \\"
    echo "  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \\"
    echo "  -d '{"
    echo "    \"version\": \"$VERSION\","
    echo "    \"content\": \"Your privacy policy text here....\","
    echo "    \"publish\": true"
    echo "  }'"
fi

# Step 6: Verify tables created
echo -e "${BLUE}Step 6: Verifying database tables...${NC}"
if npx prisma db execute --stdin < /dev/null 2>/dev/null; then
    echo -e "${GREEN}✓ Database connection verified${NC}"
fi

# Step 7: Display summary
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "1. Update .env with your ADMIN_TOKEN"
echo "2. Restart your backend: pm2 restart idmize-api"
echo "3. Test endpoints:"
echo "   curl http://localhost:5001/api/cookies/consent"
echo ""
echo "API Documentation: See BACKEND_COOKIE_SETUP.md"
echo ""
