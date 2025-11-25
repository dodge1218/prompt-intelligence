# Money GPT - Premium Prompt Intelligence Platform

A sophisticated, monetized prompt analysis and scoring platform that uses ICE + PIE frameworks with payment-gated access, persistent storage, and continuously improving AI models.

**Experience Qualities**:
1. **Premium** - Interface feels exclusive and valuable, with clear value proposition for paid access
2. **Intelligent** - Advanced AI that learns from every analysis, improving recommendations over time
3. **Trustworthy** - Secure payment flow, data persistence, and transparent pricing that builds confidence

**Complexity Level**: Complex Application (advanced functionality, payment gates, database operations, learning models)
  - Multi-tiered system with payment authentication, Supabase integration for persistent storage, model improvement tracking, and enterprise-grade analytics

## Essential Features

### Payment Authentication Gate
- **Functionality**: No prompt analysis output shown without valid payment/subscription
- **Purpose**: Monetize the AI intelligence and ensure only paying users access premium insights
- **Trigger**: User attempts to view analysis results
- **Progression**: User submits prompt → Payment check → If unpaid: payment modal → Process payment → Unlock results → Show full analysis
- **Success criteria**: Zero analysis outputs visible to non-paying users; seamless payment flow with <3 second verification

### Prompt Analysis with Database Storage
- **Functionality**: Accept prompts, analyze with LLM, store all data (prompts, scores, suggestions) to Supabase
- **Purpose**: Build a dataset for model improvement and provide persistent user history
- **Trigger**: Authenticated user submits prompt for analysis
- **Progression**: User enters prompt → Payment verified → Analysis runs → Results + metadata stored to Supabase → Display to user → Data used for model training
- **Success criteria**: 100% of analyses persisted to database with <2 second latency; zero data loss

### ICE Score Calculation with Learning
- **Functionality**: Calculate Idea/Cost/Exploitability metrics; store scores to improve future analyses
- **Purpose**: Build intelligence over time by learning from scoring patterns
- **Trigger**: Paid user submits prompt
- **Progression**: Prompt received → LLM analyzes → Scores computed → Historical patterns retrieved from DB → Scores refined → Results stored → Feedback loop closes
- **Success criteria**: Scoring accuracy improves measurably over 100+ analyses; consistency increases

### PIE Tier Classification (Enhanced)
- **Functionality**: Advanced 9-category classification with confidence scores stored to database
- **Purpose**: Track classification accuracy and improve categorization algorithms
- **Trigger**: Runs alongside ICE scoring for paid users
- **Progression**: Analysis complete → Classification assigned → Confidence metrics calculated → Historical category data retrieved → Classification refined → All metadata stored to Supabase
- **Success criteria**: Category assignments become more accurate with each 100 stored analyses

### Persistent User History (Database-Backed)
- **Functionality**: All user analyses stored in Supabase with full audit trail
- **Purpose**: Enable cross-session access, analytics, and model training
- **Trigger**: User accesses history tab
- **Progression**: User requests history → Query Supabase → Paginated results returned → Display with filters → User can review past analyses indefinitely
- **Success criteria**: Users can access complete history across devices; query performance <1 second for 1000+ records

### Model Improvement Engine
- **Functionality**: Background system that analyzes stored data to improve scoring and classification
- **Purpose**: Create continuously improving AI that gets smarter with more data
- **Trigger**: Scheduled job or threshold-based (e.g., every 100 new analyses)
- **Progression**: Analysis data accumulated → Patterns identified → Model parameters updated → New analyses use improved algorithms → Cycle repeats
- **Success criteria**: Demonstrable improvement in scoring consistency and classification accuracy over time

## Edge Case Handling
- **Payment failures** - Graceful retry with clear error messages; store partial analysis state to resume
- **Database connection loss** - Queue operations locally; sync when connection restored; show connectivity status
- **API rate limits** - Implement queuing system; show position in queue; estimate wait time
- **Duplicate submissions** - Detect near-identical prompts; offer cached results or re-analysis option
- **Invalid/malicious input** - Sanitize all inputs; rate limit aggressive users; log security events

## Technical Architecture

### Supabase Integration
**Database Schema**:
```sql
-- Users table (extends Supabase Auth)
users (
  id uuid primary key,
  email text,
  subscription_status text, -- 'trial', 'active', 'expired'
  subscription_tier text, -- 'basic', 'pro', 'enterprise'
  created_at timestamp,
  credits_remaining integer
)

-- Analyses table
prompt_analyses (
  id uuid primary key,
  user_id uuid references users(id),
  prompt text not null,
  token_count integer,
  ice_idea integer,
  ice_cost integer,
  ice_exploitability integer,
  ice_overall integer,
  pie_tier integer,
  pie_primary_category text,
  pie_secondary_categories text[],
  pie_reasoning text,
  suggestions text[],
  created_at timestamp,
  model_version text,
  response_time_ms integer
)

-- Model metrics (for improvement tracking)
model_metrics (
  id uuid primary key,
  metric_type text, -- 'accuracy', 'consistency', 'user_satisfaction'
  value numeric,
  sample_size integer,
  recorded_at timestamp,
  model_version text
)

-- Payment transactions
transactions (
  id uuid primary key,
  user_id uuid references users(id),
  amount numeric,
  currency text,
  status text, -- 'pending', 'completed', 'failed'
  provider text, -- 'stripe', 'paypal', etc.
  credits_purchased integer,
  created_at timestamp
)
```

**Connection Details**:
- URL: `https://eqvjsqfnmxzjmyldcfgc.supabase.co`
- Public Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxdmpzcWZubXh6am15bGRjZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNTExMTQsImV4cCI6MjA3OTYyNzExNH0.UMstexgtAgF1LuWXVttFS4xdEVGdLVq-Hji0OAVrkTA`
- Database Password: `4Daifpneoibgjbgjd`
- Connection String: `postgresql://postgres:4Daifpneoibgjbgjd@db.eqvjsqfnmxzjmyldcfgc.supabase.co:5432/postgres`

### Environment Configuration
**Development Mode**: 
- Use test API keys and sandbox payment processor
- Allow unlimited analyses for development
- Flag all data as 'dev_mode' in database

**Production Mode**:
- Enforce payment gates strictly
- Use production API keys
- Full payment processing

## Design Direction
The design should feel premium, exclusive, and worth paying for - like a professional tool used by serious prompt engineers. Clean, modern, with subtle premium touches (micro-animations, gradient accents, sophisticated typography). Think Stripe meets OpenAI's interface.

## Color Selection
**Complementary with Premium Accents** - Deep emerald (money/growth) paired with rich purple (intelligence) and gold accents (premium value)

- **Primary Color**: Emerald Green `oklch(0.55 0.18 160)` - Represents growth, money, value
- **Secondary Colors**: 
  - Royal Purple `oklch(0.45 0.20 290)` - Intelligence and premium quality
  - Slate Gray `oklch(0.30 0.02 250)` - Professional, sophisticated base
- **Accent Color**: Golden Amber `oklch(0.75 0.15 80)` - Premium features, CTAs, value highlights
- **Foreground/Background Pairings**:
  - Background (Deep Navy `oklch(0.12 0.03 250)`): Soft White `oklch(0.96 0.01 250)` - Ratio 15.2:1 ✓
  - Card (Slate `oklch(0.18 0.02 250)`): White `oklch(0.98 0 0)` - Ratio 13.8:1 ✓
  - Primary (Emerald `oklch(0.55 0.18 160)`): White `oklch(0.98 0 0)` - Ratio 5.8:1 ✓
  - Secondary (Purple `oklch(0.45 0.20 290)`): White `oklch(0.98 0 0)` - Ratio 7.2:1 ✓
  - Accent (Golden `oklch(0.75 0.15 80)`): Navy `oklch(0.12 0.03 250)` - Ratio 12.5:1 ✓
  - Muted (Gray `oklch(0.35 0.02 250)`): Light Gray `oklch(0.72 0.01 250)` - Ratio 4.9:1 ✓

## Font Selection
Premium, modern sans-serif that communicates professionalism and trust - like you're using a tool that costs money because it delivers value.

- **Primary**: Inter (700/600/500/400) - Professional, clean, trustworthy
- **Monospace**: JetBrains Mono (500) - For prompts and technical data
- **Display**: Inter Bold (700) - For pricing, numbers, key metrics

- **Typographic Hierarchy**:
  - H1 (Brand/Value Prop): Inter Bold/36px/tight (-0.03em)
  - H2 (Section Headers): Inter Semibold/28px/tight (-0.02em)
  - H3 (Card Titles): Inter Semibold/20px/normal
  - Body: Inter Regular/16px/relaxed (1.6)
  - Prompt Text: JetBrains Mono Medium/14px/relaxed (1.5)
  - Pricing/Numbers: Inter Bold/24px/tight
  - Labels: Inter Medium/14px/normal
  - Captions: Inter Regular/13px/normal (0.01em)

## Animations
Subtle, premium animations that communicate quality and polish - nothing aggressive, everything purposeful. Like a luxury car: smooth, refined, confidence-inspiring.

- **Purposeful Meaning**: Payment flows feel secure and smooth; score reveals feel earned; unlocking features feels rewarding; data loading suggests valuable computation
- **Hierarchy of Movement**: 
  - Primary: Payment modal entrance, unlock animations, score counting up
  - Secondary: Card transitions, tab switches, data loading states
  - Tertiary: Micro-interactions, hover states, button feedback

## Component Selection

- **Components**:
  - `Button` (premium variants with gradient accents)
  - `Card` (with subtle shadows and premium borders)
  - `Dialog` - Payment modal, upgrade prompts
  - `Badge` - Tier indicators, subscription status
  - `Tabs` - Feature navigation
  - `Progress` - Score visualizations
  - `Textarea` - Prompt input
  - `ScrollArea` - History view
  - Custom payment form components
  - Custom pricing tables

- **Customizations**:
  - **Payment Modal** - Smooth, trustworthy payment flow
  - **Premium Badge** - Subtle shine/glow for paid features
  - **Score Animations** - Counting up with easing
  - **Unlock Animations** - Blur-to-clear reveal for gated content

- **States**:
  - Locked vs Unlocked content states
  - Payment processing states
  - Database sync states
  - Premium vs Free tier visual differentiation

- **Icon Selection**:
  - CurrencyDollar (currency-dollar) - Payment/pricing
  - LockSimple (lock-simple) - Locked content
  - CheckCircle (check-circle) - Payment success
  - Brain (brain) - AI analysis
  - Database (database) - Data storage
  - TrendUp (trend-up) - Model improvement
  - Crown (crown) - Premium features

- **Spacing**:
  - Premium: Generous whitespace for breathing room
  - Page padding: `p-8` (32px) on desktop, `p-6` on mobile
  - Card padding: `p-6` with `gap-6` between sections
  - Tight groupings: `gap-2` for related items

- **Mobile**:
  - Mobile-first payment flows
  - Simplified pricing tables
  - Sticky payment CTAs
  - Gesture-friendly history browsing

## USER TODOS - Critical Setup Steps

### 1. Vercel Deployment Configuration
**Status**: 🔴 NOT STARTED - Required for production

**Steps**:
1. Create Vercel project linked to this repository
2. Configure build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables to Set in Vercel**:
   ```
   VITE_SUPABASE_URL=https://eqvjsqfnmxzjmyldcfgc.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxdmpzcWZubXh6am15bGRjZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNTExMTQsImV4cCI6MjA3OTYyNzExNH0.UMstexgtAgF1LuWXVttFS4xdEVGdLVq-Hji0OAVrkTA
   VITE_SUPABASE_SERVICE_KEY=[Get from Supabase Dashboard → Settings → API]
   
   VITE_STRIPE_PUBLIC_KEY=[Create Stripe account → Get publishable key]
   STRIPE_SECRET_KEY=[Stripe secret key - keep secure!]
   
   VITE_GEMINI_API_KEY=[Create after Google AI Studio setup]
   VITE_MODE=production
   ```

4. Set up deployment domains and SSL
5. Configure automatic deployments on git push
6. Set up preview deployments for PRs

**Documentation**: https://vercel.com/docs/concepts/projects/environment-variables

---

### 2. Google Gemini API Integration
**Status**: 🔴 NOT STARTED - Required for cost-effective AI

**Why**: Google's Gemini models (especially Gemini 1.5 Pro/Flash) offer competitive quality at lower cost compared to GPT-4, crucial for a monetized product.

**Steps**:
1. Go to https://ai.google.dev/
2. Sign in with Google account
3. Navigate to "Get API Key" → Create new API key
4. Save the API key securely
5. Implement in code:
   - Add Gemini as alternative model option in `src/lib/scoring.ts`
   - Create model selector in UI (GPT-4o, GPT-4o-mini, Gemini 1.5 Pro, Gemini 1.5 Flash)
   - Implement cost tracking per model
   - Allow users to choose model based on subscription tier

**Testing API Key**: Use your generated key for development/testing

**Models to Integrate**:
- `gemini-1.5-pro` - Highest quality, medium cost
- `gemini-1.5-flash` - Fast, low cost, good quality
- `gemini-1.0-pro` - Backup option

**Resources**:
- API Docs: https://ai.google.dev/docs
- Pricing: https://ai.google.dev/pricing
- Node.js SDK: `@google/generative-ai`

---

### 3. Supabase Database Setup
**Status**: 🟡 CREDENTIALS PROVIDED - Schema needs creation

**Steps**:
1. Log into Supabase dashboard: https://app.supabase.com
2. Navigate to project: `eqvjsqfnmxzjmyldcfgc`
3. Go to SQL Editor
4. Run the schema creation SQL (see "Database Schema" section above)
5. Set up Row Level Security (RLS) policies:
   ```sql
   -- Users can only read their own data
   ALTER TABLE prompt_analyses ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can view own analyses"
     ON prompt_analyses FOR SELECT
     USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert own analyses"
     ON prompt_analyses FOR INSERT
     WITH CHECK (auth.uid() = user_id);
   ```
6. Create database indexes for performance:
   ```sql
   CREATE INDEX idx_analyses_user_created ON prompt_analyses(user_id, created_at DESC);
   CREATE INDEX idx_analyses_tier ON prompt_analyses(pie_tier);
   CREATE INDEX idx_transactions_user ON transactions(user_id, created_at DESC);
   ```
7. Set up database backups (Supabase dashboard → Database → Backups)
8. Configure database webhooks for real-time model updates (optional)

---

### 4. Payment Provider Setup
**Status**: 🔴 NOT STARTED - Critical for monetization

**Recommended**: Stripe (easiest integration, best for SaaS)

**Steps**:
1. Create Stripe account: https://dashboard.stripe.com/register
2. Get API keys (test mode for dev, live mode for production)
3. Set up Products in Stripe Dashboard:
   - **Basic**: $9/month - 50 analyses
   - **Pro**: $29/month - 500 analyses
   - **Enterprise**: $99/month - Unlimited analyses
4. Configure webhooks for subscription events
5. Implement Stripe Checkout or Payment Element
6. Test with Stripe test cards: https://stripe.com/docs/testing

**Alternative**: PayPal, Paddle, or custom crypto payment

---

### 5. Development Environment Setup
**Status**: 🟡 PARTIAL - Need dev mode toggle

**To Implement**:
1. Create `.env.local` file (gitignored) with:
   ```
   VITE_MODE=development
   VITE_DEV_BYPASS_PAYMENT=true
   VITE_SUPABASE_URL=https://eqvjsqfnmxzjmyldcfgc.supabase.co
   VITE_SUPABASE_ANON_KEY=[key provided above]
   VITE_GEMINI_API_KEY=[your test key]
   ```
2. Add dev mode indicator in UI (top-right badge)
3. Allow unlimited analyses in dev mode
4. Tag all dev data in database with `dev_mode: true`
5. Create cleanup script to purge dev data

---

### 6. Model Improvement System
**Status**: 🔴 NOT STARTED - Future enhancement

**Concept**: Learn from stored analyses to improve scoring consistency

**Implementation Ideas**:
1. Collect user feedback on analysis quality (thumbs up/down)
2. Track which suggestions users apply
3. Analyze patterns in high-scoring prompts
4. Fine-tune scoring algorithms based on historical data
5. A/B test different scoring approaches
6. Display improvement metrics in admin dashboard

**This can be v2.0 - focus on core features first!**

---

## Launch Checklist

- [ ] Supabase schema created and RLS policies set
- [ ] Vercel project created with all environment variables
- [ ] Payment provider integrated and tested
- [ ] Google Gemini API integrated as model option
- [ ] Payment gate implemented (no outputs without payment)
- [ ] All analyses stored to Supabase successfully
- [ ] User authentication working (Supabase Auth)
- [ ] History loads from database across sessions
- [ ] Development mode properly configured
- [ ] Pricing page implemented
- [ ] Terms of service and privacy policy added
- [ ] Error handling and edge cases covered
- [ ] Mobile responsive design tested
- [ ] Performance testing (1000+ analyses)
- [ ] Security audit completed
- [ ] Marketing copy and value proposition finalized
