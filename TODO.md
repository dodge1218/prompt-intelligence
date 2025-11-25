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
**Current Focus**: Stage 1 (MVP Core Features)  
**Next Milestone**: Complete MVP → User Testing (Stage 2 - DO NOT SKIP!)
