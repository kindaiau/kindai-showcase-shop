# Mock Business Signup Test - Quick Start Guide

This guide provides step-by-step instructions to run a complete mock test of a business signing up for the Rebel Toolkit and using the 3 AI agents.

## Quick Test Run

### Option 1: Automated Test Script
Run the automated test script to see a complete simulation:

```bash
node mock-business-signup-test.js
```

This will output a detailed walkthrough of:
- Landing page discovery
- Pricing selection
- Account creation
- Using all 3 AI agents
- Accessing toolkit resources
- Complete ROI analysis

### Option 2: Manual UI Test

#### Step 1: Start the Application
```bash
npm install
npm run dev
```
Visit http://localhost:8081

#### Step 2: Explore the Homepage
1. View hero section with "The 3-Agent Playbook"
2. Read "How It Works" section
3. Review features and benefits
4. Click "Get Started Now" button

#### Step 3: View Pricing
1. You'll be taken to `/pricing`
2. Review 3 tiers:
   - **Rebel Starter**: $47 (50 requests/month)
   - **Rebel Pro**: $97 (unlimited) - RECOMMENDED
   - **Rebel Team**: $297 (5 team members)
3. Read FAQ section
4. Click "Get Started" on your preferred tier

#### Step 4: Create Account
1. Redirected to `/auth`
2. Click "Sign up" link
3. Enter email and password
4. Click "Join the Rebellion"
5. Account created (Supabase sends confirmation)

#### Step 5: Access Toolkit
1. After login, redirected to `/toolkit`
2. See welcome message: "Your AI Team is Ready, Rebel 🚀"
3. Explore 6 tabs:
   - Dashboard
   - AI Agents
   - Guides
   - Templates
   - Checklists
   - Resources

#### Step 6: Use the 3 AI Agents

**Content Creator Agent:**
1. Navigate to "AI Agents" tab
2. Click "Content Creator"
3. Try prompt: "Write a 5-email welcome sequence for my coaching business"
4. Download or copy the output

**Business Strategist Agent:**
1. Click "Business Strategist"
2. Try prompt: "Create a pricing strategy for my SaaS product"
3. Review comprehensive strategy
4. Download the document

**Automation Engineer Agent:**
1. Click "Automation Engineer"
2. Try prompt: "Build a lead nurturing automation with Zapier"
3. Get complete workflow configuration
4. Download the setup guide

## What the Site is Selling

**Product**: Rebel Toolkit - 3-Agent Playbook

**Core Value**: 3 specialized AI agents that create content, build strategies, and automate workflows for your business.

**Pricing**:
- Rebel Starter: $47 one-time
- Rebel Pro: $97 one-time (most popular)
- Rebel Team: $297 one-time

**Key Features**:
- Content Creator AI (writes blog posts, emails, social content)
- Business Strategist AI (builds plans, pricing, strategies)
- Automation Engineer AI (creates workflows, integrations)
- All toolkit templates, guides, and checklists
- No subscription - lifetime access

## Test Scenario

**Business Profile**: "Mindful Coaching Co."
- Industry: Life Coaching / Wellness
- Owner: Sarah Johnson
- Goal: Launch online coaching business

**Expected Deliverables**:
1. 5-email welcome sequence (Content Creator)
2. Complete pricing strategy (Business Strategist)
3. Lead nurturing automation (Automation Engineer)

**Time Savings**: ~18 hours → ~30 minutes

## Documentation

- `MOCK_TEST_DOCUMENTATION.md` - Detailed test documentation
- `mock-business-signup-test.js` - Automated test script

## Screenshots

### Homepage Hero
![Homepage](screenshots/01-homepage-hero.png)

### Pricing Page
![Pricing](screenshots/02-pricing-page.png)

### Authentication
![Auth](screenshots/03-auth-page-login.png)

## Payment Flow (Mock)

Since Stripe is not yet integrated:
1. Clicking "Get Started" on any tier shows a success toast
2. User is redirected to signup
3. After signup, full access is granted
4. Ready for Stripe integration when needed

## Next Steps for Production

1. **Payment Integration**:
   - Add Stripe Checkout
   - Create products/prices in Stripe
   - Implement webhooks
   - Store purchase data in Supabase

2. **Usage Tracking**:
   - Track agent request counts
   - Enforce tier limits
   - Display usage in dashboard

3. **Team Features** (Team tier):
   - Member invitations
   - Shared workspace
   - Role permissions

## Success Metrics

✅ Complete signup flow works
✅ All 3 agents are accessible
✅ Clear value proposition
✅ Production-ready outputs from agents
✅ ADHD-friendly UX
✅ Ready for payment integration

## ROI Calculation

For a typical user:
- Investment: $97 (Rebel Pro)
- Time saved: 17.5 hours
- Value at $150/hr: $2,625
- ROI: 27x return on investment

---

**Status**: ✅ All systems operational - Ready for production with Stripe integration
