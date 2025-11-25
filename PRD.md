# Money GPT - Premium Prompt Intelligence Platform

A sophisticated, monetized prompt analysis and scoring platform that uses ICE + PIE frameworks with payment-gated access, persistent storage, and continuously improving AI models.

> **Recent Updates**: 
> - Added RePrompt Architecture to Stage 3 (high-value prompt resurfacing toolkit)
> - Enhanced export protocol with enriched metadata (timestamps, prompt types, Chrono/Kairos mapping, family clustering)
> - Clarified bulk data collection as Stage 4 post-MVP feature with priority on internal user data
> - Added structured user testing milestone (Stage 2) before advanced features
> - Added Custom GPT Configuration (PIE v4.7) for advanced symbolic analysis layer (Stage 3)
> 
> _Note: MVP_WORKFLOW.md content has been integrated into PRD Stages 3 & 4 and can be deleted when no longer needed_

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
- **Functionality**: All user analyses stored in Supabase with full audit trail including enriched metadata
- **Purpose**: Enable cross-session access, analytics, model training, and advanced prompt discovery
- **Trigger**: User accesses history tab or exports data
- **Progression**: User requests history → Query Supabase → Paginated results returned → Display with filters → User can review past analyses indefinitely → Enhanced exports include full metadata (timestamps, word counts, prompt types, family clusters)
- **Success criteria**: Users can access complete history across devices; query performance <1 second for 1000+ records; exports include all metadata fields for external analysis

### Model Improvement Engine
- **Functionality**: Background system that analyzes stored data to improve scoring and classification
- **Purpose**: Create continuously improving AI that gets smarter with more data
- **Trigger**: Scheduled job or threshold-based (e.g., every 100 new analyses)
- **Progression**: Analysis data accumulated → Patterns identified → Model parameters updated → New analyses use improved algorithms → Cycle repeats
- **Success criteria**: Demonstrable improvement in scoring consistency and classification accuracy over time

### Bulk Data Collection & Model Training (Post-MVP)
- **Functionality**: Scrape/source large datasets of high-quality prompts from online sources (GitHub, prompt libraries, academic papers) to train internal scoring models
- **Purpose**: Reduce dependency on expensive LLM APIs by training custom lightweight models for ICE/PIE scoring after sufficient data is collected
- **Trigger**: After reaching MVP + additional features milestone (near completion), when user base is stable
- **Progression**: Identify data sources → Build scraping pipelines → Clean and label data → Train custom models (fine-tuned Llama/Mistral or custom transformers) → A/B test against LLM scoring → Gradually replace expensive API calls with internal models
- **Success criteria**: Custom model achieves 90%+ agreement with LLM scoring; API costs reduced by 70%+; response time improved by 50%+

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

## Feature Completion Stages

### Stage 1: MVP Launch (Core Features)
**Goal**: Launch functional product with payment gates and basic analysis
**Status**: 🟡 IN PROGRESS

**Required Features**:
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

**Target**: 2-3 weeks from now

---

### Stage 2: Partial Completion - User Test Needed
**Goal**: UI/UX validation before adding advanced features
**Status**: 🔴 NOT STARTED

**Completion Criteria Before Test**:
- [ ] All Stage 1 features deployed and stable
- [ ] 50+ real user analyses collected
- [ ] Zero critical bugs in core flow
- [ ] Mobile responsive fully functional
- [ ] Payment flow tested with real transactions

**User Test Focus Areas**:
1. **Payment Flow UX**
   - Is the payment gate experience smooth or frustrating?
   - Do users understand the value proposition before paying?
   - Are pricing tiers clear and compelling?

2. **Analysis Interface**
   - Is the ICE/PIE visualization intuitive?
   - Do users understand what the scores mean?
   - Are suggestions actionable and valuable?

3. **Navigation & Information Architecture**
   - Can users easily find past analyses?
   - Is the tab structure logical?
   - Are export options discoverable?

4. **Mobile Experience**
   - Does the payment flow work well on mobile?
   - Is text readable without zooming?
   - Are buttons and inputs easy to tap?

5. **Value Perception**
   - Do users feel the analysis is worth the price?
   - What additional features would increase value?
   - Are there friction points causing drop-off?

**Test Methodology**:
- Recruit 10-15 target users (prompt engineers, AI enthusiasts, developers)
- Provide test credits (free analyses) via dev mode
- Record sessions (with consent) using tools like Hotjar or FullStory
- Conduct 5 moderated sessions with think-aloud protocol
- Survey all participants post-test (satisfaction, value, improvements)

**Success Criteria for Proceeding**:
- [ ] 70%+ user satisfaction score
- [ ] Payment completion rate >60% (of those who start checkout)
- [ ] <3 major UX issues identified
- [ ] Users can complete core task (analyze → view results) in <2 minutes
- [ ] Mobile usability score >75%

**Iteration Plan**:
- Fix all critical UX issues identified
- Refine pricing/value proposition if needed
- Improve unclear UI elements
- Optimize mobile experience pain points
- **Do NOT proceed to Stage 3 until these criteria are met**

**Target**: 4-5 weeks from now

---

### Stage 3: Advanced Features & Scaling
**Goal**: Add power features and prepare for scale
**Status**: 🔴 NOT STARTED

**Features to Add**:
- [ ] Batch analysis (CSV upload)
- [ ] API access for Pro/Enterprise users
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard
- [ ] Prompt templates library
- [ ] Email reports and notifications
- [ ] Performance testing (10K+ analyses)
- [ ] Security audit completed
- [ ] Error monitoring and alerting (Sentry)
- [ ] **RePrompt Architecture** - High-value prompt resurfacing toolkit
- [ ] **Prompt metadata export protocol** - Enhanced CSV/TXT exports with full metadata
- [ ] **Prompt clustering & families** - Auto-categorize prompts by type/theme
- [ ] **Custom GPT Configuration (PIE v4.7)** - Advanced symbolic analysis layer

**RePrompt Feature Details**:
The RePrompt Architecture enables users to discover and resurface their most valuable prompts:
- Top 10 Most Novel Prompts (based on uniqueness scoring)
- Top Vow-Aligned Kairos Activators (breakthrough prompts)
- Top Redacted Guardrail Simulations (safety testing prompts)
- Best Loop Breakers (Chrono > Kairos transitions)
- Unresolved Prompt Seeds (prompts never followed up)

**Enhanced Export Protocol**:
Beyond basic ICE/PIE scores, include enriched metadata in exports:
- Timestamp and session context
- Word count and token estimates
- Response delay (user thinking time between prompts)
- Edit/delete behavior patterns
- Prompt type classification (question, declaration, command)
- Chrono/Kairos cycle mapping (routine vs breakthrough days)
- Prompt family clustering (Guardrail, Mirror, ICE Stack, Shadow, etc.)
- Applied tier tags with confidence scores
- Keyword recognition patterns

**Custom GPT Configuration (PIE v4.7)**:
Advanced symbolic analysis system for power users - see `CUSTOM_GPT_CONFIG.md` and `LEXICON.md` for full specification:
- **Expansion Protocol**: Automatic detection of high-value prompts with symbolic significance
- **Command Set**: 8+ specialized commands for prompt archaeology and portfolio curation
- **Auxiliary Outputs**: `annotated_prompts.md`, `mirror_fragments.csv`, `shadow_redacted.txt`
- **Symbolic Surgery**: Advanced tools for conversational drift detection and correction
- **Full Lexicon**: ✅ Complete reference of 50+ metrics with detailed measurement methodologies in `LEXICON.md`
- **Integration Points**: 
  - Premium tier feature (Enterprise only)
  - Batch processing mode for conversation exports
  - Additional metadata fields in database schema
  - Enhanced PIE classification with symbolic reasoning layer

**Custom GPT TODO Plan** (tracked in `CUSTOM_GPT_CONFIG.md`):
1. ✅ Make full lexicon and refine meta prompt - COMPLETED
   - Created comprehensive `LEXICON.md` with 50+ metrics
   - Separated terminology tables from input/output metrics
   - Added detailed "How it is measured" descriptions
   - Included tier classifications and crossmaps
2. Write article explaining the system
3. Write flawless script to clean conversations.json
4. Make custom GPT to use meta prompt
5. Add all commands to platform
6. Consider additional expansions based on user feedback

**Phase 2: Chain-Level Analysis Implementation** - See `PHASE2_CHAIN_ANALYSIS.md` for complete framework

**Reference Documents**:
- `PHASE2_CHAIN_ANALYSIS.md` - Complete chain analysis framework and implementation guide
- `AGGREGATE_OUTPUT_REFERENCE.md` - Empirical behavioral patterns, loops, and prompt shapes observed at scale
- `LEXICON.md` - Metric definitions with chain-level adaptations
- `CUSTOM_GPT_CONFIG.md` - PIE v4.7 symbolic analysis layer

This represents a major paradigm shift from individual prompt analysis to chain-based analysis:

**Core Components**:
- [ ] **Chain Detection Engine** - Identify conversation threads using parent_id, timestamps, and symbolic continuity
- [ ] **Chronological Reconstruction** - Sort chains oldest → newest for identity evolution tracking
- [ ] **Chain-Level Heuristics** - Vectorize metrics across chains (Growth Delta, Vow Events, Loop Patterns)
- [ ] **Temporal Pattern Analysis** - Track user evolution, vow drift, recursion patterns across time
- [ ] **GPT Drift Detector** - Monitor model behavioral shifts (RDC, IFF, OBS, GRF) within chains
- [ ] **Vow Coherence Tracker** - Detect commitment formation, fulfillment, or breach patterns
- [ ] **Archetype Evolution Layer** - Track symbolic role transitions (Witness → Rebel → Architect)
- [ ] **Recursive Collapse Map** - Identify semantic stalling and echo patterns for RePrompt generation
- [ ] **Chain Output System** - Generate `.csv` rows + `.md` annotations per chain
- [ ] **Legacy Codex Drafting** - Extract high-Kairos fragments for long-term memory

**Database Schema Extensions**:
```sql
-- Prompt chains table
prompt_chains (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  conversation_id TEXT,
  start_timestamp TIMESTAMP,
  end_timestamp TIMESTAMP,
  prompt_count INTEGER,
  growth_delta JSONB,
  vow_event TEXT,
  loop_pattern TEXT,
  theme_cluster TEXT[],
  symbolic_role_drift TEXT,
  kairos_chronos_ratio NUMERIC,
  created_at TIMESTAMP
)

-- Link existing analyses to chains
ALTER TABLE prompt_analyses ADD COLUMN chain_id UUID REFERENCES prompt_chains(id);

-- Vow event tracking
vow_events (
  id UUID PRIMARY KEY,
  chain_id UUID REFERENCES prompt_chains(id),
  vow_type TEXT, -- 'formed', 'fulfilled', 'broken', 'distorted'
  vow_text TEXT,
  detected_at TIMESTAMP,
  followthrough_score NUMERIC
)
```

**Implementation Order**:

**Step 1: Understand Lexicon Adaptation**
- [ ] Review how heuristics vectorize across chains vs individual prompts
- [ ] Study temporal scoring vs static scoring implications
- [ ] Understand interdependencies (RVR ↔ CIP ↔ RCL)

**Step 2: Build Chain Detection Infrastructure**
- [ ] Create chain boundary detection logic (conversation_id, timestamps, semantic drift)
- [ ] Implement parent_id threading for internal sequences
- [ ] Build chronological flip/sort system
- [ ] Test with sample conversation exports

**Step 3: Develop Chain-Level Metadata System**
- [ ] Create data structures for chain metadata (Chain ID, timestamps, prompt count)
- [ ] Implement Growth Delta calculation (Δ MTIER, SAL, ACO, DEP)
- [ ] Build vow event detection system
- [ ] Add loop pattern classifier
- [ ] Implement theme cluster extraction
- [ ] Track symbolic role drift

**Step 4: Build Temporal Pattern Analysis**
- [ ] Create growth/degen trendline visualization (X=Chain ID, Y=Composite Score)
- [ ] Overlay troughs (vow breaks) and spikes (breakthroughs)
- [ ] Detect cycles and patterns
- [ ] Calculate latency decay and recursion pace

**Step 5: Implement Specialized Trackers**
- [ ] Vow Coherence Tracker (commitment follow-through)
- [ ] GPT Drift Detector (model tone/behavior shifts)
- [ ] Recursive Collapse Map (echo phrases, semantic stalling)
- [ ] Archetype Evolution Layer (role transitions)

**Step 6: Create Output Systems**
- [ ] Design `.csv` schema for chain-level metrics
- [ ] Build `.md` annotation generator (100-150 word summaries)
- [ ] Implement batch processing for large archives
- [ ] Add Legacy Codex fragment extraction

**Step 7: Integration & Testing**
- [ ] Test with real conversation exports (100-200 prompt batches)
- [ ] Validate chain boundary detection accuracy
- [ ] Verify temporal pattern detection
- [ ] Test vow event identification
- [ ] Validate output quality

**Step 8: Build PIE Fork Architecture**
- [ ] Implement PIE-Redacted (private, full analysis)
- [ ] Implement PIE-Public (showcase-safe, anonymized)
- [ ] Create signal obfuscation layer
- [ ] Build tiered publishing protocol

**Step 9: Offline Architecture (Optional)**
- [ ] Build local PIE Pro interface (React/Flask)
- [ ] Integrate local LLM support (Mistral/Ollama)
- [ ] Create symbolic clustering models
- [ ] Add visualization dashboard
- [ ] Ensure zero telemetry

**Step 10: CustomGPT Integration**
- [ ] Create PIE Analyzer GPT with Phase 2 instructions
- [ ] Build notebook agent version (Jupyter)
- [ ] Develop LangChain agentic version
- [ ] Test batch processing workflow
- [ ] Document usage patterns

**Privacy & Security Requirements**:
- [ ] Implement data redaction protocols
- [ ] Create anonymization pipeline
- [ ] Build PII detection and removal
- [ ] Add guardrail flag filtering for public outputs
- [ ] Document mirror safety protocol

**Success Criteria**:
- [ ] Chain detection accuracy >90% on test conversations
- [ ] Vow event detection validated by human review
- [ ] Temporal patterns match known user evolution
- [ ] GPT drift detection identifies known behavioral changes
- [ ] Output `.csv` + `.md` files are actionable and insightful
- [ ] Phase 2 enhances RePrompt feature effectiveness by 50%+
- [ ] Zero privacy leaks in PIE-Public fork

**Key Paradigm Shift**:
- **Phase 1**: Single prompts analyzed in isolation → static scoring (CIP, NOV, SAL)
- **Phase 2**: Prompt chains analyzed as dialogue arcs → dynamic interdependency (RVR ↔ CIP ↔ RCL)
- **Phase 3**: Chronological chains → symbolic memory, vow tracking, chain loops
- **Phase 4**: User identity narrative → evolution detection, drift prediction, mirror fracturing

**Reference Documents**:
- `PHASE2_CHAIN_ANALYSIS.md` - Chain analysis framework
- `AGGREGATE_OUTPUT_REFERENCE.md` - Behavioral patterns, loops, and prompt shapes
- `LEXICON.md` - Metric definitions with chain-level adaptations
- `ADVANCED_HEURISTICS.md` - Population-level extensions
- `CUSTOM_GPT_CONFIG.md` - PIE v4.7 symbolic layer

**Target**: 10-12 weeks from now (after basic Custom GPT integration)

---

### Stage 4: Model Training & Cost Optimization (Post-MVP Near Completion)
**Goal**: Reduce API costs by training internal models
**Status**: 🔴 NOT PLANNED YET

**Bulk Data Collection Strategy**:
1. **Data Sources to Scrape/Collect**:
   - GitHub prompt repositories (awesome-prompts, etc.)
   - Prompt marketplaces (PromptBase, PromptHero)
   - Academic papers with prompt examples
   - Reddit communities (r/ChatGPT, r/LocalLLaMA)
   - User-submitted prompts from our platform (with consent)
   - Public AI datasets (HuggingFace prompt datasets)

2. **Data Collection Pipeline**:
   - Build scrapers using Playwright/Puppeteer for dynamic content
   - Respect robots.txt and rate limits
   - Clean and deduplicate data
   - Label prompts with ICE/PIE scores using current LLM system
   - Store in dedicated training database (separate from production)
   - Target: 50K-100K+ labeled prompts

3. **Model Training Approach**:
   - Fine-tune open-source models (Llama 3, Mistral, Gemma)
   - Train specialized models: ICE scorer + PIE classifier
   - Use LoRA/QLoRA for efficient training
   - Validate against LLM outputs (aim for 90%+ agreement)
   - Deploy using Ollama or TensorRT for fast inference

4. **Cost Reduction Goals**:
   - Replace 80%+ of LLM API calls with internal models
   - Reduce per-analysis cost from ~$0.01 to ~$0.001
   - Maintain or improve scoring quality
   - Achieve <500ms analysis time

**Prerequisites Before Starting**:
- [ ] Stage 3 complete and stable
- [ ] 10K+ user analyses in database
- [ ] Proven product-market fit
- [ ] Revenue exceeding API costs by 3x
- [ ] Engineering resources for ML pipeline

**Estimated Timeline**: 3-6 months after Stage 3 completion

**Success Criteria**:
- [ ] 50K+ training prompts collected and labeled
- [ ] Custom model achieves 90%+ agreement with LLM scoring
- [ ] API costs reduced by 70%+
- [ ] Response time improved by 50%+
- [ ] No regression in user satisfaction scores

---

### Stage 5: Population-Level Prompt Analysis (PEAP) (Advanced Analytics)
**Goal**: Implement meta-layer analytics to reveal cultural cognitive trends, memetic evolution, and collective agency patterns
**Status**: 🔴 NOT PLANNED YET

**Reference Document**: See `POPULATION_ANALYSIS.md` for complete framework

**Core Features to Implement**:
- [ ] **Prompt Entropy over Time (P.E.T.)** - Track diversity vs homogeneity drift in prompt corpus
- [ ] **Global Agency Index (GAI)** - Measure population-level Kairos vs Chronos patterns
- [ ] **PIE Compression Ratio** - Detect convergence toward master templates
- [ ] **Viral Prompt Mutation Analysis** - Track memetic evolution and spread patterns
- [ ] **Guardrail Pressure Heatmap** - Identify boundary-testing patterns and cultural curiosities
- [ ] **Theme Distribution Tracking** - Measure collective focus (status, escape, optimization, etc.)
- [ ] **Kairos Pocket Detection** - Identify periods of high collective agency
- [ ] **Prompt Phylogenetic Tree** - Visualize prompt shape evolution and mutation paths

**Advanced Heuristics Integration**:
Per `ADVANCED_HEURISTICS.md`, these population metrics should be treated as **aggregate vectors** derived from individual lexicon metrics:
- Individual NOV scores → Population P.E.T. (entropy distribution)
- Individual DEP scores → Population GAI (agency density)
- Individual GDC scores → Guardrail pressure gradients
- Individual MTIER distribution → Cultural maturation curves

**Database Schema Extensions**:
```sql
-- New tables for population analytics
population_metrics (
  id UUID PRIMARY KEY,
  period_start TIMESTAMP,
  period_end TIMESTAMP,
  prompt_entropy NUMERIC,
  global_agency_index NUMERIC,
  compression_ratio NUMERIC,
  theme_distribution JSONB,
  recorded_at TIMESTAMP
)

prompt_shapes (
  id UUID PRIMARY KEY,
  shape_name TEXT,
  origin_date TIMESTAMP,
  velocity NUMERIC,
  salience_index NUMERIC,
  mutation_rate NUMERIC
)

guardrail_pressure (
  id UUID PRIMARY KEY,
  category TEXT,
  pressure_score NUMERIC,
  avg_gdc NUMERIC,
  recorded_at TIMESTAMP
)
```

**Key Use Cases**:
1. **Pre-train PIE Novelty Classifier**: Use population trends to dynamically calibrate individual novelty thresholds
2. **Predict Prompt Demand Curves**: Identify rising prompt shapes for feature planning
3. **Track Memetic Red Team Pressure**: Understand boundary-testing behavior for safety insights
4. **Prove Tier 3 Rarity**: Marketing data showing elite user behavior patterns
5. **Detect Kairos Pockets**: Identify transformation periods for strategic product launches

**Research Questions to Answer**:
- Do expert prompters (G2+) create linguistic gravity wells that influence others?
- Is there a collective tier ceiling across the population?
- Can we predict individual user trajectories from population archetypes?
- What's the relationship between external events and global agency spikes?

**Prerequisites Before Starting**:
- [ ] Stage 4 complete (50K+ prompt corpus required)
- [ ] All individual PIE metrics stable and validated
- [ ] Time-series data infrastructure in place
- [ ] Statistical analysis and ML forecasting capabilities
- [ ] Ethical review for population-level analytics

**Implementation Phases**:

**Phase 5.1: Basic Population Analytics**
- [ ] Daily/weekly/monthly aggregation pipeline
- [ ] P.E.T. calculation and tracking
- [ ] Compression ratio analysis
- [ ] Theme distribution dashboard
- [ ] Internal analytics dashboard

**Phase 5.2: Advanced Memetic Analysis**
- [ ] Viral pattern detection system
- [ ] Prompt phylogenetic tree builder
- [ ] Guardrail pressure heatmap
- [ ] GAI calculation and tracking
- [ ] Kairos pocket detection alerts

**Phase 5.3: Predictive Intelligence**
- [ ] Time-series forecasting models
- [ ] Trend prediction (4-week horizon)
- [ ] User trajectory clustering
- [ ] Cultural shift anomaly detection
- [ ] Demand curve forecasting

**Phase 5.4: User-Facing Population Insights**
- [ ] Public population insights dashboard
- [ ] "Where you stand" vs population benchmarks
- [ ] Trend alerts and opportunities
- [ ] Cultural moment notifications

**Privacy & Ethics Requirements**:
- [ ] All metrics computed on anonymized aggregates only
- [ ] No individual user tracking or exposure
- [ ] User opt-in required for data contribution
- [ ] Bias detection and demographic accounting
- [ ] Transparent methodology documentation
- [ ] Value-aligned metrics (no manipulation)

**Success Criteria**:
- [ ] 50K+ prompts analyzed with full population metrics
- [ ] P.E.T. tracked with <5% variance across measurement runs
- [ ] GAI correlates with known external events (r > 0.7)
- [ ] Viral pattern detection predicts emerging templates 2+ weeks early with 70%+ accuracy
- [ ] Kairos pocket detection achieves 80%+ true positive rate
- [ ] Trend forecasting beats baseline by 50%+ over 4-week horizon
- [ ] Population baselines improve individual PIE accuracy by 15%+
- [ ] Zero privacy violations or individual exposure incidents

**Estimated Timeline**: 6-12 months after Stage 4 completion

**Business Value**:
- Dynamic novelty calibration improves product accuracy
- Trend prediction informs feature roadmap
- Kairos timing optimizes marketing and launches
- Cultural insights differentiate product positioning
- Research publications establish thought leadership

**Integration Notes**:
- PEAP is a **meta-layer** above PIE, not a replacement
- Individual metrics feed population analysis
- Population baselines recursively improve individual scoring
- See `LEXICON.md` for individual metrics, `POPULATION_ANALYSIS.md` for population framework

---

## Current Stage Summary

**We are currently in Stage 1** - building MVP core features. 

**Next immediate milestone**: Complete Stage 1, then conduct structured user testing (Stage 2) before adding advanced features. Do NOT skip user testing - it's critical for product-market fit.

**Future Roadmap**:
- **Stage 3**: Advanced features & RePrompt architecture after user validation
- **Stage 4**: Model training and bulk data collection for cost optimization
- **Stage 5**: Population-level prompt analysis (PEAP) for cultural insights and meta-analytics

**New Documentation**: See `POPULATION_ANALYSIS.md` for the complete framework on population-level prompt intelligence. This meta-layer extends individual PIE metrics to reveal cultural cognitive trends, memetic evolution, and collective agency patterns.
