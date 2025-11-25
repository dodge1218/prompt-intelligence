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
- [x] Google Gemini API Integration - COMPLETE
- [x] Multi-model AI support (GPT-4o, GPT-4o Mini, Gemini 1.5 Pro/Flash/1.0)
- [x] Model selector UI with cost comparison
- [x] User preference persistence for model selection
- [x] Supabase Authentication Integration - COMPLETE
- [x] AuthModal component with sign in/sign up tabs
- [x] UserMenu component with profile and sign out
- [x] Session management and persistence
- [x] Real-time auth state updates
- [x] UI/UX Polish - Iteration 4 - COMPLETE
- [x] Copy-to-clipboard for prompts
- [x] Timestamp display on analyses
- [x] History search and filtering
- [x] History sorting (date, score, tier)
- [x] Prompt templates for new users
- [x] Improved .env.example documentation

---

## 🔴 HIGH PRIORITY - Complete This Week

### 1. Supabase Database Schema Creation
**Status**: ✅ COMPLETED
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
- [x] All 4 tables exist (users, prompt_analyses, transactions, model_metrics)
- [x] All indexes created successfully
- [x] RLS policies are active
- [x] Database functions work (test `decrement_user_credits`)

---

### 2. Vercel Deployment Setup
**Status**: ✅ COMPLETED
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
- [x] Project deploys successfully
- [x] Production URL is accessible
- [x] Environment variables are set correctly
- [x] App loads without errors
- [x] Payment modal shows up when analyzing

**Documentation**: https://vercel.com/docs/getting-started-with-vercel

---

### 3. Google Gemini API Integration
**Status**: ✅ COMPLETED  
**Estimated Time**: 2 hours  
**Actual Time**: 2 hours

**Why**: Gemini models cost 10-50x less than GPT-4o, critical for profitable operation.

**Completed Implementation**:

1. ✅ **Installed Gemini SDK**:
   ```bash
   npm install @google/generative-ai
   ```

2. ✅ **Created Gemini Service** (`src/lib/gemini.ts`):
   - Full Gemini API integration with JSON mode support
   - Support for all 3 Gemini models (1.5 Pro, 1.5 Flash, 1.0 Pro)
   - Error handling and API key validation
   - Model configuration and cost metadata

3. ✅ **Updated scoring.ts**:
   - Added `AIModel` type union for all supported models
   - Router logic to use Gemini or GPT based on model selection
   - Updated prompts for JSON mode compatibility with both providers
   - Cost estimation and tracking functions

4. ✅ **Created ModelSelector UI Component**:
   - Beautiful dropdown with all available models
   - Real-time cost estimation based on token count
   - Provider badges (OpenAI vs Google)
   - Model descriptions for user guidance
   - Integrated into analyze tab above prompt input

5. ✅ **Added Model Preference Persistence**:
   - useKV integration for cross-session model selection
   - Defaults to GPT-4o, upgrades to Gemini if API key available
   - Seamless model switching

**Verification**:
- ✅ Gemini API integration works (requires API key in env)
- ✅ Can successfully analyze prompts with all models
- ✅ JSON parsing works for all responses
- ✅ Model choice is saved and respected
- ✅ Error handling for API failures
- ✅ Cost comparison displayed accurately

**Cost Comparison Achieved**:
- GPT-4o: ~$15 per 1M input tokens
- Gemini 1.5 Pro: ~$7 per 1M tokens (53% savings)
- Gemini 1.5 Flash: ~$0.35 per 1M tokens (97.6% savings!)

**Business Impact**: 
- Enables sustainable pricing model
- Users can optimize for quality vs. cost
- Gemini Flash recommended for volume analysis
- Dramatically reduces API costs for production

---

### 4. Payment Provider Integration (Stripe)
**Status**: 🟡 CODE COMPLETE - WAITING FOR KEYS
**Estimated Time**: 4 hours  
**Assignee**: Developer

**Steps**:

1. **Create Stripe Account**:
   - Go to https://dashboard.stripe.com/register
   - Complete business information
   - Get test mode API keys

2. **Install Stripe SDK**:
   - ✅ Installed `@stripe/stripe-js` and `stripe`

3. **Create Products in Stripe**:
   - Dashboard → Products → Add Product
   - Basic: $9/month (price_id: `price_xxx`)
   - Pro: $29/month (price_id: `price_yyy`)
   - Enterprise: $99/month (price_id: `price_zzz`)

4. **Implement Checkout Flow**:
   - ✅ Created `src/lib/stripe.ts` with checkout session creation
   - ✅ Created `api/create-checkout-session.js` serverless function
   - ✅ Updated `PaymentGate.tsx` to redirect to Stripe Checkout
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
- [x] Stripe checkout code implemented
- [ ] Test payment completes (needs keys)
- [ ] User subscription updated in database
- [ ] Credits added correctly
- [ ] Webhooks firing properly

**Resources**:
- Stripe Docs: https://stripe.com/docs
- Stripe Testing: https://stripe.com/docs/testing

---

## 🟡 MEDIUM PRIORITY - Complete This Month

### 5. Chain Analysis Implementation (Phase 2 Priority)
**Status**: 🟡 IN PROGRESS
**Estimated Time**: 12-16 hours (initial implementation)  
**Prerequisites**: Stage 1 MVP complete, basic user data collected

**Context**: Now that we analyze individual prompts, the next major enhancement is **chain-level analysis** - analyzing sequences of prompts as conversation threads rather than isolated inputs. This unlocks powerful temporal patterns, vow tracking, loop detection, and user evolution insights.

**Reference Documents**:
- ✅ `PHASE2_CHAIN_ANALYSIS.md` - Complete chain analysis framework
- ✅ `LEXICON.md` - Metric definitions with chain adaptations
- ✅ `AGGREGATE_OUTPUT_REFERENCE.md` - Behavioral patterns and loops
- ✅ `CUSTOM_GPT_CONFIG.md` - Symbolic analysis layer

**Key Question**: How does the application of the lexicon change now that we're analyzing chains instead of individual prompts?

**Answer Summary**:
- **Individual prompts**: Static scoring (NOV, CIP, SAL are single values)
- **Chain-level**: Dynamic interdependency (metrics become trajectories, trends, deltas)
- **Temporal dimension**: Track evolution, drift, growth/decay patterns
- **Vow coherence**: Detect commitment formation, fulfillment, or breach
- **Loop detection**: Identify semantic stalling and echo patterns
- **Role continuity**: Track symbolic archetype transitions

**Implementation Steps**:

**Step 1: Understand Lexicon Adaptation (2 hours)**
- [x] Review `PHASE2_CHAIN_ANALYSIS.md` - Chain detection framework
- [x] Study `AGGREGATE_OUTPUT_REFERENCE.md` - Behavioral loops and patterns
- [x] Map individual metrics → chain metrics (table in AGGREGATE_OUTPUT_REFERENCE)
- [x] Understand interdependencies: RVR ↔ CIP ↔ RCL
- [x] Document decision: How to detect chain boundaries in Money GPT context

**Step 2: Database Schema for Chains (1 hour)**
- [x] Add `prompt_chains` table (see PRD Stage 3 for schema)
- [x] Add `chain_id` foreign key to `prompt_analyses` table
- [x] Add `vow_events` table for commitment tracking
- [x] Create indexes for chain queries
- [x] Test schema with sample data (SQL script created in `SUPABASE_CHAIN_SETUP.md`)

**Step 3: Chain Detection Infrastructure (3 hours)**
- [x] Create `src/lib/chain-detection.ts`
- [x] Implement boundary detection logic:
  - Temporal clustering (prompts within X minutes)
  - Semantic continuity (cosine similarity >60%)
  - User session tracking
- [ ] Build chain reconstruction (sort chronologically)
- [ ] Test with exported conversation data

**Step 4: Chain-Level Metadata System (3 hours)**
- [ ] Create `src/lib/chain-metadata.ts`
- [ ] Implement Growth Delta calculation (Δ MTIER, SAL, ACO, DEP)
- [ ] Build loop pattern classifier (using AGGREGATE_OUTPUT_REFERENCE patterns)
- [ ] Create vow event detection heuristics
- [ ] Add theme cluster extraction
- [ ] Track symbolic role drift

**Step 5: Chain Analysis UI Components (3 hours)**
- [ ] Create `ChainVisualization.tsx` component
- [ ] Build chain timeline view (prompts in sequence)
- [ ] Add growth/decay trendline chart
- [ ] Implement loop detection highlights
- [ ] Show vow events as timeline markers
- [ ] Display chain-level metrics (Growth Delta, Loop Risk, etc.)

**Step 6: Enhanced Export with Chain Data (2 hours)**
- [ ] Update export functions to include chain context
- [ ] Add chain ID, position in chain, semantic drift
- [ ] Include loop detection flags
- [ ] Add vow event markers
- [ ] Generate `.md` annotations per chain (100-150 words)

**Step 7: Testing & Validation (2 hours)**
- [ ] Test with real user conversation exports
- [ ] Validate chain boundary detection accuracy (target >90%)
- [ ] Verify temporal pattern detection
- [ ] Test vow event identification with human review
- [ ] Ensure export quality and usefulness

**Deliverables**:
- [ ] Chain detection working for user prompt history
- [ ] Chain-level metrics calculated and displayed
- [ ] Loop detection functioning with visual indicators
- [ ] Vow event tracking operational
- [ ] Enhanced exports include chain context
- [ ] Documentation for users on chain analysis features

**Success Criteria**:
- [ ] Chain detection accuracy >90% on test data
- [ ] Loop detection identifies known patterns from AGGREGATE_OUTPUT_REFERENCE
- [ ] Growth Delta calculation shows meaningful trends
- [ ] Vow events validated by human judgment
- [ ] Users find chain view more insightful than individual prompts

**Integration with Existing Features**:
- Works alongside current individual prompt analysis
- Enhances RePrompt Architecture (Stage 3) with better resurface logic
- Feeds into Population Analysis (Stage 5) for cultural patterns
- Improves PIE classification with temporal context

**Why This Matters**:
Chain analysis transforms Money GPT from a "prompt grader" to a "conversation intelligence platform." It reveals user evolution, identifies stuck patterns, and surfaces breakthrough moments - dramatically increasing value perception and retention.

**Note**: This is Stage 3 work (after MVP + User Testing). Add to roadmap but don't block MVP launch.

---

### 6. Supabase Authentication Integration
**Status**: ✅ COMPLETED  
**Estimated Time**: 3 hours  
**Actual Time**: 2.5 hours

**Current State**: Full authentication system with premium UI

**Completed Implementation**:

1. ✅ **Created AuthModal Component** (`src/components/AuthModal.tsx`):
   - Tabbed interface for sign in and sign up
   - Email and password validation
   - Display name support for new users
   - Beautiful form design with icons
   - Loading states and error handling
   - Success toast notifications
   - Email verification prompt

2. ✅ **Created UserMenu Component** (`src/components/UserMenu.tsx`):
   - Dropdown menu in header
   - User avatar with initials
   - Email display
   - Sign out functionality
   - Session state management
   - Real-time auth state updates via onAuthStateChange

3. ✅ **Integrated with App.tsx**:
   - Added auth modal state management
   - UserMenu in header with sign in button when logged out
   - Auth modal triggers from header
   - Session refresh on successful auth
   - Database history reload on auth

4. ✅ **Supabase Auth Configuration**:
   - Email/password authentication enabled
   - Session persistence configured
   - Real-time auth state subscriptions
   - User metadata support

**Verification**:
- ✅ Users can sign up with email/password
- ✅ Users can sign in
- ✅ Session persists on refresh
- ✅ Sign out works correctly
- ✅ User info displayed in header
- ✅ Auth state updates across app
- ✅ Beautiful UI with proper loading states

**Next Steps**:
- Email verification can be enabled in Supabase dashboard
- Password reset flow can be added later
- Social auth (Google, GitHub) can be added as enhancement

---

### 7. Model Improvement System (Phase 1)
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

### 7. Bulk Prompt Data Collection & Model Training (Post-MVP)
**Status**: 🔴 NOT STARTED - FUTURE ENHANCEMENT  
**Estimated Time**: 6-8 weeks (full implementation)  
**Prerequisites**: MVP stable, 10K+ user analyses, proven PMF

**IMPORTANT**: This is a Stage 4 feature (see PRD Feature Completion Stages). Do NOT start this until:
- [ ] MVP is launched and stable (Stage 1 complete)
- [ ] User testing completed successfully (Stage 2 complete)
- [ ] Advanced features deployed including RePrompt Architecture (Stage 3 complete)
- [ ] API costs are significant enough to justify optimization
- [ ] Product-market fit is proven

**Context**: After MVP + more features are near completion and the user base is stable, we will transition from expensive LLM API calls to training internal models. This requires collecting bulk prompt datasets from online sources to train custom scoring models.

**Strategic Note**: The RePrompt Architecture and enhanced export protocol (Stage 3) will provide valuable internal training data before we need to scrape external sources. User analyses with metadata become our best training dataset.

**Goal**: Reduce API costs by 70%+ by training internal ML models using bulk prompt data (both user-generated and externally sourced)

**Phase 1: Data Collection Infrastructure (2 weeks)**
1. **Set up data collection pipelines**:
   ```bash
   # Create new project structure
   mkdir -p data-pipeline/{scrapers,cleaners,labelers}
   ```

2. **PRIORITY: Export internal user data first**:
   - Use RePrompt Architecture exports (Stage 3 feature)
   - Export all user analyses with full metadata
   - This provides highest-quality labeled training data
   - Estimated: 10K-50K prompts from active users
   - Already labeled with ICE/PIE scores from production

3. **Build web scrapers for external prompt sources** (only if internal data insufficient):
   - GitHub repos: awesome-chatgpt-prompts, prompt-engineering-guide
   - PromptBase API (if available)
   - Reddit: r/ChatGPT, r/PromptDesign
   - HuggingFace datasets: https://huggingface.co/datasets?search=prompt
   - Academic papers (arXiv) with prompt examples

3. **Create scraper modules** (`data-pipeline/scrapers/`):
   ```typescript
   // github-scraper.ts - scrape GitHub prompt repos
   // reddit-scraper.ts - use Reddit API
   // huggingface-scraper.ts - download HF datasets
   // web-scraper.ts - general purpose Playwright scraper
   ```

4. **Implement rate limiting and politeness**:
   - Respect robots.txt
   - Add delays between requests
   - Use rotating user agents
   - Cache responses to avoid re-scraping

5. **Set up dedicated Supabase table**:
   ```sql
   CREATE TABLE training_prompts (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     prompt_text text NOT NULL,
     source text, -- 'github', 'reddit', 'user_submitted', etc.
     source_url text,
     scraped_at timestamp DEFAULT now(),
     labeled boolean DEFAULT false,
     ice_idea integer,
     ice_cost integer,
     ice_exploitability integer,
     ice_overall integer,
     pie_tier integer,
     pie_category text,
     labeling_model text, -- 'gpt-4o', 'gemini-1.5-pro', etc.
     labeling_confidence numeric,
     quality_score numeric,
     is_training_set boolean DEFAULT false,
     is_validation_set boolean DEFAULT false
   );
   
   CREATE INDEX idx_training_labeled ON training_prompts(labeled, is_training_set);
   ```

**Phase 2: Data Cleaning & Labeling (2 weeks)**
1. **Clean scraped data**:
   - Remove duplicates (fuzzy matching)
   - Filter out low-quality prompts
   - Normalize formatting
   - Remove PII/sensitive content

2. **Label prompts using current LLM system**:
   - Run each prompt through existing analyzePrompt()
   - Store ICE/PIE scores as labels
   - Use multiple models for consensus (GPT-4o + Gemini)
   - Calculate confidence scores

3. **Create labeling job script** (`scripts/label-training-data.ts`):
   ```typescript
   // Process prompts in batches
   // Use cheaper models (Gemini Flash) for labeling
   // Store results back to training_prompts table
   // Track labeling costs
   ```

4. **Quality control**:
   - Manual review sample of 500 prompts
   - Validate label consistency
   - Remove outliers and errors
   - Aim for 50K+ high-quality labeled prompts

**Phase 3: Model Training Setup (2 weeks)**
1. **Choose model architecture**:
   - Option A: Fine-tune Llama 3 8B with LoRA
   - Option B: Fine-tune Mistral 7B with QLoRA
   - Option C: Train custom BERT-based classifier
   - Recommendation: Start with Option B (best cost/performance)

2. **Set up training environment**:
   - Use Runpod/Vast.ai/Lambda Labs (cheap GPU rental)
   - Or Google Colab Pro+ for prototyping
   - Install: transformers, peft, bitsandbytes, accelerate

3. **Create training notebooks**:
   - `notebooks/ice-scorer-training.ipynb` - Train ICE scoring model
   - `notebooks/pie-classifier-training.ipynb` - Train PIE classification model

4. **Split data**:
   - 80% training (40K prompts)
   - 10% validation (5K prompts)
   - 10% test set (5K prompts)

**Phase 4: Model Training & Validation (1 week)**
1. **Train ICE scorer**:
   - Regression model predicting ICE scores (0-100)
   - Loss function: MSE or Huber loss
   - Target: R² > 0.85 vs LLM scores

2. **Train PIE classifier**:
   - Multi-class classification (9 categories)
   - Loss function: CrossEntropy
   - Target: F1-score > 0.90 vs LLM classifications

3. **Hyperparameter tuning**:
   - Learning rate: [1e-5, 5e-5, 1e-4]
   - Batch size: [8, 16, 32]
   - LoRA rank: [8, 16, 32]
   - LoRA alpha: [16, 32, 64]

4. **Validate against test set**:
   - Compare custom model vs LLM outputs
   - Calculate agreement rate (target: 90%+)
   - Identify failure modes

**Phase 5: Model Deployment (1 week)**
1. **Optimize model for inference**:
   - Quantize to INT8 or INT4
   - Use ONNX Runtime for 2-3x speedup
   - Or deploy with Ollama for easy serving

2. **Create model inference service**:
   - Separate service/container for model inference
   - API endpoint: POST /analyze-local
   - Load model once at startup
   - Batch inference for efficiency

3. **A/B test implementation**:
   - 10% of traffic → custom model
   - 90% of traffic → LLM API (baseline)
   - Compare: accuracy, speed, user satisfaction
   - Gradually increase custom model percentage

4. **Fallback logic**:
   - If custom model confidence < threshold → use LLM API
   - Monitor error rates
   - Auto-rollback if quality degrades

**Phase 6: Monitoring & Iteration (Ongoing)**
1. **Track metrics**:
   - API cost savings
   - Response time improvements
   - Model accuracy vs LLM
   - User satisfaction (implicit feedback)

2. **Continuous improvement**:
   - Collect new user analyses as training data
   - Retrain model monthly with fresh data
   - Fine-tune on failure cases
   - Version control models

3. **Cost analysis**:
   - Calculate ROI: training cost vs API savings
   - Track GPU costs for inference
   - Monitor total cost per analysis

**Deliverables**:
- [ ] 50K+ labeled training prompts
- [ ] Trained ICE scoring model (90%+ agreement with LLM)
- [ ] Trained PIE classification model (90%+ agreement)
- [ ] Model inference service deployed
- [ ] A/B testing framework implemented
- [ ] Monitoring dashboard for model performance
- [ ] Documentation for model updates/retraining

**Expected Outcomes**:
- 70-80% reduction in API costs
- 50%+ faster response times (local inference)
- Maintain or improve analysis quality
- Enable offline/on-premise deployments (enterprise feature)

**Resources Needed**:
- GPU time: ~$200-500 for training
- Engineering time: ~6-8 weeks (1 ML engineer)
- Storage: 50GB+ for training data and models

**See PRD Section "Feature Completion Stages - Stage 4" for full strategic context**

---

### 8. Advanced Features (Stage 3)
**Status**: 🔴 NOT STARTED  
**Estimated Time**: Various

**Potential Features** (Stage 3 - After User Testing):
- [ ] Batch prompt analysis (upload CSV)
- [ ] API access for Pro/Enterprise users
- [ ] Team collaboration features
- [ ] Custom model training
- [ ] Prompt templates library
- [ ] Prompt version comparison
- [ ] Share analyses publicly
- [ ] Analytics dashboard
- [ ] Email reports
- [ ] **RePrompt Architecture** - Resurface high-value prompts
- [ ] **Enhanced Metadata Exports** - Full CSV/TXT dumps with enriched data
- [ ] **Prompt Family Clustering** - Auto-categorize by type/theme
- [ ] **Chrono/Kairos Mapping** - Track routine vs breakthrough patterns

**RePrompt Implementation Tasks**:
- [ ] Build novelty scoring algorithm
- [ ] Create "Top Prompts" views (Most Novel, Best Loop Breakers, etc.)
- [ ] Implement unresolved prompt detection
- [ ] Add prompt family classification
- [ ] Build Chrono/Kairos cycle analyzer
- [ ] Create export protocol with all metadata fields

**Note**: Do NOT implement these until Stage 2 (User Testing) is complete and validated!

---

## 🟢 LOW PRIORITY - Nice to Have

### 9. Testing & Quality
- [ ] Write unit tests for database functions
- [ ] Write integration tests for payment flow
- [ ] Add E2E tests with Playwright
- [ ] Set up error monitoring (Sentry)
- [ ] Add performance monitoring

### 10. Documentation
- [ ] Create user guide
- [ ] Add API documentation
- [ ] Write developer onboarding guide
- [ ] Create video tutorials

### 11. Marketing & Legal
- [ ] Write Terms of Service
- [ ] Write Privacy Policy
- [ ] Add cookie consent banner
- [ ] Create landing page
- [ ] Set up analytics (Google Analytics / Plausible)

---

## Feature Stage Roadmap Summary

Based on PRD Feature Completion Stages:

### Stage 1: MVP Launch (CURRENT)
- Target: 2-3 weeks
- Focus: Core features, payment, database
- Status: 🟡 IN PROGRESS

### Stage 2: User Testing (NEXT)
- Target: 4-5 weeks from now
- Focus: UI/UX validation with 10-15 real users
- Status: 🔴 NOT STARTED
- **BLOCKER**: Must complete and validate before Stage 3

### Stage 3: Advanced Features
- Target: 8-10 weeks from now
- Focus: Scaling, API access, team features
- Status: 🔴 NOT STARTED

### Stage 4: Model Training & Cost Optimization
- Target: 3-6 months after Stage 3
- Focus: Custom ML models, bulk data collection
- Status: 🔴 NOT PLANNED YET
- Prerequisites: PMF proven, 10K+ analyses, significant API costs

**KEY PRINCIPLE**: Do NOT skip stages. User testing (Stage 2) is mandatory before advanced features. Model training (Stage 4) only makes sense after proven success.

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

### Stage 1 (MVP):
- Critical items: ~7 hours
- Medium priority: ~11 hours
- **Total for MVP**: ~18 hours of development time

### Stage 2 (User Testing):
- Test preparation: ~4 hours
- User testing execution: ~2 weeks (recruiting, sessions, analysis)
- Iteration based on feedback: ~1-2 weeks
- **Total**: ~3-4 weeks elapsed time

### Stage 3 (Advanced Features):
- Varies based on features selected
- **Estimate**: ~40-60 hours development

### Stage 4 (Model Training - Future):
- Data collection & training infrastructure: ~6-8 weeks
- Requires ML engineering expertise
- Only pursue if ROI justifies cost

---

**Last Updated**: January 2025  
**Current Focus**: Stage 1 (MVP Core Features) - 75% Complete  
**Latest Milestone**: ✅ Iteration 4 Phase 1 - UI/UX Polish Complete
**Next Milestone**: Complete MVP → User Testing (Stage 2 - DO NOT SKIP!)
