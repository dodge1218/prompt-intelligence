# Money GPT - Implementation TODO List

## 🔴 CRITICAL - Must Complete Before Launch

### ✅ COMPLETED
- [x] Rebrand from PIE to Money GPT
- [x] Update color scheme to premium emerald/purple/gold theme
- [x] Install Supabase client library
- [x] Create Supabase configuration and client
- [x] Create database service layer for Supabase operations
- [x] Build payment gate modal component
- [x] Build locked content component with blur effect
- [x] Update App.tsx with payment flow integration
- [x] Add development mode bypass for testing
- [x] Create comprehensive PRD with technical architecture
- [x] Document Supabase setup instructions
- [x] Create .env.example file

---

## 🔴 HIGH PRIORITY - Complete This Week

### 1. Supabase Database Schema Creation
**Status**: 🔴 NOT STARTED  
**Estimated Time**: 30 minutes  
**Assignee**: Developer

**Steps**:
1. Open https://app.supabase.com
2. Navigate to project `eqvjsqfnmxzjmyldcfgc`
3. Go to SQL Editor
4. Run all SQL commands from `SUPABASE_SETUP.md` file
5. Verify tables are created with: `SELECT * FROM users;`
6. Test RLS policies are working
7. Create at least one test user manually

**Verification**:
- [ ] All 4 tables exist (users, prompt_analyses, transactions, model_metrics)
- [ ] All indexes created successfully
- [ ] RLS policies are active
- [ ] Database functions work (test `decrement_user_credits`)

---

### 2. Vercel Deployment Setup
**Status**: 🔴 NOT STARTED  
**Estimated Time**: 45 minutes  
**Assignee**: Developer

**Steps**:

1. **Create Vercel Project**:
   - Go to https://vercel.com/new
   - Import this Git repository
   - Select the main branch

2. **Configure Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node.js Version: `18.x` or higher

3. **Set Environment Variables** (Project Settings → Environment Variables):
   ```
   VITE_SUPABASE_URL=https://eqvjsqfnmxzjmyldcfgc.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxdmpzcWZubXh6am15bGRjZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNTExMTQsImV4cCI6MjA3OTYyNzExNH0.UMstexgtAgF1LuWXVttFS4xdEVGdLVq-Hji0OAVrkTA
   VITE_MODE=production
   ```

4. **Enable Preview Deployments**:
   - Settings → Git → Enable automatic deployments
   - Enable preview deployments for pull requests

5. **Configure Custom Domain** (optional):
   - Settings → Domains → Add domain
   - Configure DNS settings
   - Wait for SSL certificate

**Verification**:
- [ ] Project deploys successfully
- [ ] Production URL is accessible
- [ ] Environment variables are set correctly
- [ ] App loads without errors
- [ ] Payment modal shows up when analyzing

**Documentation**: https://vercel.com/docs/getting-started-with-vercel

---

### 3. Google Gemini API Integration
**Status**: 🔴 NOT STARTED  
**Estimated Time**: 2 hours  
**Assignee**: Developer

**Why**: Gemini models cost 10-50x less than GPT-4o, critical for profitable operation.

**Steps**:

1. **Get API Key**:
   - Go to https://ai.google.dev/
   - Click "Get API key in Google AI Studio"
   - Create new project or select existing
   - Generate API key → Save it securely

2. **Install Gemini SDK**:
   ```bash
   npm install @google/generative-ai
   ```

3. **Create Gemini Service** (`src/lib/gemini.ts`):
   ```typescript
   import { GoogleGenerativeAI } from '@google/generative-ai'
   
   const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''
   const genAI = new GoogleGenerativeAI(apiKey)
   
   export async function callGemini(
     prompt: string, 
     modelName: 'gemini-1.5-pro' | 'gemini-1.5-flash' = 'gemini-1.5-flash'
   ) {
     const model = genAI.getGenerativeModel({ 
       model: modelName,
       generationConfig: {
         temperature: 0.7,
         topK: 40,
         topP: 0.95,
       }
     })
     
     const result = await model.generateContent(prompt)
     return result.response.text()
   }
   ```

4. **Update scoring.ts**:
   - Add model parameter to `analyzePrompt` function
   - Add logic to route to Gemini or GPT based on model choice
   - Update prompts for JSON mode compatibility

5. **Add Model Selector UI**:
   - Create dropdown in analyze card
   - Options: GPT-4o, GPT-4o-mini, Gemini 1.5 Pro, Gemini 1.5 Flash
   - Show cost estimate per model
   - Store preference in useKV

**Verification**:
- [ ] Gemini API key works
- [ ] Can successfully analyze prompts with Gemini
- [ ] JSON parsing works for Gemini responses
- [ ] Model choice is saved and respected
- [ ] Error handling for API failures

**Cost Comparison**:
- GPT-4o: ~$15 per 1M input tokens
- Gemini 1.5 Pro: ~$7 per 1M tokens
- Gemini 1.5 Flash: ~$0.35 per 1M tokens (40x cheaper!)

---

### 4. Payment Provider Integration (Stripe)
**Status**: 🔴 NOT STARTED  
**Estimated Time**: 4 hours  
**Assignee**: Developer

**Steps**:

1. **Create Stripe Account**:
   - Go to https://dashboard.stripe.com/register
   - Complete business information
   - Get test mode API keys

2. **Install Stripe SDK**:
   ```bash
   npm install @stripe/stripe-js
   ```

3. **Create Products in Stripe**:
   - Dashboard → Products → Add Product
   - Basic: $9/month (price_id: `price_xxx`)
   - Pro: $29/month (price_id: `price_yyy`)
   - Enterprise: $99/month (price_id: `price_zzz`)

4. **Implement Checkout Flow**:
   - Create `src/lib/stripe.ts` with checkout session creation
   - Update `PaymentGate.tsx` to redirect to Stripe Checkout
   - Handle success/cancel redirects

5. **Set Up Webhooks**:
   - Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/stripe-webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`
   - Create serverless function to handle webhooks

6. **Update User Credits on Payment**:
   - Parse webhook events
   - Call Supabase to update user subscription
   - Add credits based on tier

**Verification**:
- [ ] Stripe checkout loads successfully
- [ ] Test payment completes
- [ ] User subscription updated in database
- [ ] Credits added correctly
- [ ] Webhooks firing properly

**Resources**:
- Stripe Docs: https://stripe.com/docs
- Stripe Testing: https://stripe.com/docs/testing

---

## 🟡 MEDIUM PRIORITY - Complete This Month

### 5. Supabase Authentication Integration
**Status**: 🟡 PARTIALLY COMPLETE  
**Estimated Time**: 3 hours

**Current State**: Database layer ready, but no auth UI

**Steps**:
1. Enable Email/Password auth in Supabase Dashboard
2. Create `src/components/Auth.tsx` component
3. Add sign up / sign in forms
4. Integrate with Supabase Auth
5. Add user session management
6. Show user email in header when logged in
7. Add sign out button
8. Redirect to login when not authenticated

**Verification**:
- [ ] Users can sign up with email/password
- [ ] Users can sign in
- [ ] Session persists on refresh
- [ ] Protected routes work
- [ ] Sign out works

---

### 6. Model Improvement System (Phase 1)
**Status**: 🟡 FOUNDATION READY  
**Estimated Time**: 8 hours

**Current State**: Database schema exists, no analytics yet

**Steps**:
1. Create analytics dashboard showing:
   - Average ICE scores over time
   - Most common PIE categories
   - Score distribution histograms
2. Add user feedback mechanism (thumbs up/down on analyses)
3. Store feedback in database
4. Create weekly aggregation job
5. Display "Model improved by X% this week" message

**This is a V2 feature - can be delayed**

---

### 7. Advanced Features
**Status**: 🔴 NOT STARTED  
**Estimated Time**: Various

**Potential Features**:
- [ ] Batch prompt analysis (upload CSV)
- [ ] API access for Pro/Enterprise users
- [ ] Team collaboration features
- [ ] Custom model training
- [ ] Prompt templates library
- [ ] Prompt version comparison
- [ ] Share analyses publicly
- [ ] Analytics dashboard
- [ ] Email reports

---

## 🟢 LOW PRIORITY - Nice to Have

### 8. Testing & Quality
- [ ] Write unit tests for database functions
- [ ] Write integration tests for payment flow
- [ ] Add E2E tests with Playwright
- [ ] Set up error monitoring (Sentry)
- [ ] Add performance monitoring

### 9. Documentation
- [ ] Create user guide
- [ ] Add API documentation
- [ ] Write developer onboarding guide
- [ ] Create video tutorials

### 10. Marketing & Legal
- [ ] Write Terms of Service
- [ ] Write Privacy Policy
- [ ] Add cookie consent banner
- [ ] Create landing page
- [ ] Set up analytics (Google Analytics / Plausible)

---

## Development Environment Quick Start

1. **Clone and Install**:
   ```bash
   git clone <repo>
   cd spark-template
   npm install
   ```

2. **Create `.env.local`**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your keys
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Test with Dev Mode**:
   - Dev mode is enabled by default in `.env.local`
   - Payment gate is bypassed
   - All analyses work without payment
   - Data is still saved to Supabase

---

## Production Checklist

Before launching to real users:

- [ ] All database tables created and tested
- [ ] Supabase RLS policies active
- [ ] Vercel deployment working
- [ ] Environment variables set correctly
- [ ] Payment provider integrated and tested
- [ ] SSL certificate active
- [ ] Error monitoring enabled
- [ ] Backup system configured
- [ ] Terms & Privacy Policy published
- [ ] Pricing page accurate
- [ ] Test user journey end-to-end
- [ ] Load testing completed
- [ ] Security audit done

---

## Support & Questions

If you encounter issues:

1. Check Supabase logs: Dashboard → Logs
2. Check Vercel logs: Project → Deployments → [deployment] → Logs
3. Check browser console for errors
4. Review this TODO for relevant documentation links

## Estimated Total Time to Launch

- Critical items: ~7 hours
- Medium priority: ~11 hours
- **Total for MVP**: ~18 hours of development time

---

**Last Updated**: January 2025
