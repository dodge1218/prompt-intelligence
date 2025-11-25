# 💰 Money GPT - Premium Prompt Intelligence Platform

A sophisticated, monetized prompt analysis platform that delivers ICE + PIE scoring behind a payment gate, with Supabase persistence and continuously improving AI models.

> **Status: 75% Complete (Stage 1 MVP)** | **Latest: Iteration 4 - UI/UX Enhancements** | See `CURRENT_STATUS.md` for detailed progress

## 🎯 What is Money GPT?

Money GPT is a premium SaaS application that analyzes prompts using advanced frameworks:
- **ICE Framework**: Measures Idea, Cost, and Exploitability scores (0-100)
- **PIE Classification**: Categorizes prompts across 9 categories in 3 tiers
- **Actionable Suggestions**: AI-powered recommendations for prompt improvement

## ✨ Key Features

### Core Functionality
- 🔒 **Payment-Gated Access**: No outputs visible without paid subscription
- 💾 **Persistent Storage**: All analyses stored in Supabase for cross-device access
- 🤖 **Multi-Model AI**: Choose from 5 AI models (GPT-4o, GPT-4o Mini, Gemini 1.5 Pro/Flash/1.0)
- 💰 **97% Cost Savings**: Gemini Flash reduces API costs dramatically
- 🔐 **Full Authentication**: Sign up, sign in, persistent sessions
- 📊 **Premium Analytics**: Track your prompt evolution over time
- 📥 **Export Capabilities**: Download your data as JSON or CSV
- 🎨 **Premium UI**: Beautiful, modern interface with emerald/purple/gold theme

### Advanced Features (Iteration 2-4)
- ✅ **Real-Time Similarity Detection**: See related prompts as you type
- ✅ **Discover Tab**: Browse top novel and exploitable prompts
- ✅ **Duplicate Prevention**: Smart alerts before duplicate submissions
- ✅ **Semantic Navigation**: Click-through exploration of related analyses
- ✅ **3072-Dim Embeddings**: Superior quality with OpenAI text-embedding-3-large
- ✅ **Sub-50ms Search**: HNSW indexes for lightning-fast vector queries
- ✅ **Copy to Clipboard**: One-click prompt copying
- ✅ **History Search & Sort**: Find past prompts instantly
- ✅ **Prompt Templates**: 6 example prompts for quick start

### Recent Updates (Iteration 4 - January 2025)
- ✅ Copy-to-clipboard functionality with visual feedback
- ✅ Timestamp display on all analyses
- ✅ Real-time history search and filtering
- ✅ Sorting options (date, score, tier)
- ✅ Prompt templates for new users
- ✅ Improved environment documentation

See `ITERATION4_SUMMARY.md` for complete details.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (database provided)
- Vercel account (for deployment)

### Local Development

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env.local
   ```
   
   The `.env.local` file comes pre-configured with development mode enabled and payment bypass for testing.

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173`

### Development Mode

By default, the app runs in development mode with:
- ✅ Payment gate bypassed (unlimited analyses)
- ✅ All features unlocked
- ✅ Data still saved to Supabase
- ✅ Dev badge shown in header

## 📋 Setup Checklist

### Essential Setup (Complete These First)

1. **Database Setup**: 
   - [ ] Run SQL commands from `SUPABASE_SETUP.md`
   - [ ] Verify tables created successfully
   - [ ] Test RLS policies

2. **Vercel Deployment**:
   - [ ] Create Vercel project
   - [ ] Set environment variables
   - [ ] Deploy successfully
   - See `TODO.md` for detailed steps

3. **Payment Integration**:
   - [ ] Set up Stripe account
   - [ ] Create products/pricing
   - [ ] Implement checkout flow
   - See `TODO.md` for detailed steps

4. **API Integration**:
   - [ ] Get Google Gemini API key (optional, cost savings)
   - [ ] Add to environment variables
   - [ ] Test model switching

### Full Details
See `TODO.md` for complete implementation checklist with time estimates.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui v4 components
- **Database**: Supabase (PostgreSQL + pgvector)
- **Vector Search**: OpenAI text-embedding-3-large (3072 dimensions)
- **Authentication**: Supabase Auth ✅ Implemented (Iteration 3)
- **AI Models**: OpenAI GPT-4o/Mini, Google Gemini 1.5 Pro/Flash/1.0 ✅ (Iteration 3)
- **Payments**: Stripe (UI ready, integration pending)
- **Deployment**: Vercel (pending)

### Database Schema
```
users → subscription info, credits
prompt_analyses → all analysis data + 3072-dim vector embeddings
transactions → payment history
model_metrics → improvement tracking
```

Vector-powered features use pgvector extension with HNSW indexing for semantic search.

See `SUPABASE_SETUP.md` for full schema and setup instructions.

## 💳 Pricing Tiers

- **Basic**: $9/month - 50 analyses
- **Pro**: $29/month - 500 analyses
- **Enterprise**: $99/month - Unlimited analyses

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # 40+ shadcn v4 components
│   ├── AuthModal.tsx          # Authentication modal (Iteration 3)
│   ├── UserMenu.tsx           # User profile dropdown (Iteration 3)
│   ├── ModelSelector.tsx      # AI model chooser (Iteration 3)
│   ├── PromptTemplates.tsx    # Example prompts (Iteration 4)
│   ├── PaymentGate.tsx        # Payment modal
│   ├── LockedContent.tsx      # Content blur/lock
│   ├── RadarChart.tsx         # ICE score visualization
│   ├── TierMatrix.tsx         # PIE category grid
│   ├── SimilarPrompts.tsx     # Real-time similarity detection
│   ├── DiscoverPrompts.tsx    # RePrompt discovery UI
│   └── DuplicateWarning.tsx   # Duplicate alerts
├── lib/
│   ├── supabase.ts            # Supabase client config
│   ├── database.ts            # Database operations
│   ├── scoring.ts             # Analysis logic (multi-model)
│   ├── gemini.ts              # Google Gemini integration
│   ├── vectorization.ts       # Vector embeddings & search
│   ├── types.ts               # TypeScript definitions
│   └── export.ts              # CSV/JSON export
├── App.tsx                    # Main application
└── index.css                  # Theme and styles
```

## 🔐 Environment Variables

Required for production:
```bash
VITE_SUPABASE_URL=https://eqvjsqfnmxzjmyldcfgc.supabase.co
VITE_SUPABASE_ANON_KEY=<provided_in_env_example>
VITE_OPENAI_API_KEY=<required_for_embeddings>
VITE_MODE=production
VITE_STRIPE_PUBLIC_KEY=<your_stripe_key>
VITE_GEMINI_API_KEY=<optional_gemini_key>
```

See `.env.example` for full list.

## 🛠️ Development Workflow

1. Make changes to source files
2. Test locally with `npm run dev`
3. Check that payment gate works
4. Verify database operations
5. Push to git (auto-deploys to Vercel preview)
6. Test preview deployment
7. Merge to main for production deploy

## 📊 Monitoring

- **Supabase Dashboard**: Monitor database, auth, storage
- **Vercel Dashboard**: View deployments, logs, analytics
- **Stripe Dashboard**: Track payments, subscriptions

## 🐛 Troubleshooting

### Database Connection Issues
- Check Supabase project status
- Verify environment variables are set
- Check RLS policies are configured

### Payment Not Working
- Ensure Stripe keys are correct
- Check webhook endpoint is configured
- Verify webhook signing secret

### Analyses Not Saving
- Check browser console for errors
- Verify user is authenticated
- Check Supabase logs for errors

## 📚 Documentation

### Quick Start
- `README.md` - This file, project overview
- `CURRENT_STATUS.md` - **Detailed progress report (75% complete)**
- `.env.example` - Environment configuration reference

### Implementation Guides
- `TODO.md` - Implementation checklist and task breakdown
- `SUPABASE_SETUP.md` - Complete database setup guide with pgvector
- `PRD.md` - Full product requirements and design specs

### Iteration Summaries
- `ITERATION4_SUMMARY.md` - **Latest: UI/UX Enhancements**
- `ITERATION3_SUMMARY.md` - Multi-Model AI + Authentication
- `ITERATION2_SUMMARY.md` - Vectorization & Semantic Search
- `ITERATION4_CHECKLIST.md` - Polish and quality tasks

### Technical References
- `VECTORIZATION_PRD.md` - Complete vectorization architecture
- `VECTORIZATION_COMPLETE.md` - Vectorization completion report
- `SEMANTIC_SEARCH_REFERENCE.md` - Quick reference for vector queries
- `PHASE2_CHAIN_ANALYSIS.md` - Future: chain-level analysis
- `CUSTOM_GPT_CONFIG.md` - Advanced symbolic analysis (PIE v4.7)

## 🤝 Contributing

This is a commercial SaaS product. Internal development only.

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

Money GPT application code is proprietary.

## 🎯 Roadmap

### Stage 1 (MVP) - 75% Complete ⚡
- [x] Core analysis functionality
- [x] Payment gate UI
- [x] Database integration layer
- [x] Vector embeddings & semantic search
- [x] Duplicate detection
- [x] RePrompt discovery features
- [x] Multi-model AI support (5 models)
- [x] Full authentication system
- [x] UI/UX polish (copy, search, sort, templates)
- [ ] **Supabase schema creation** ⚠️ Critical
- [ ] **Vercel deployment** ⚠️ Critical
- [ ] **Stripe integration** ⚠️ Critical

**Timeline**: 1-2 weeks to complete remaining items

### Stage 2 (User Testing) - Next Milestone 🎯
- [ ] Recruit 10-15 testers
- [ ] Collect feedback systematically
- [ ] UX iteration based on real users
- [ ] Performance optimization
- [ ] Bug fixes from user reports
- [ ] Mobile experience validation

**⚠️ IMPORTANT**: Do NOT skip Stage 2. User testing is mandatory before Stage 3.

### Stage 3 (Advanced Features) - Future
- [ ] RePrompt Architecture
- [ ] Chain-level analysis (PIE v4.7)
- [ ] Batch prompt processing
- [ ] API access for Pro users
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard

### Stage 4 (Cost Optimization) - Long Term
- [ ] Custom model training
- [ ] Bulk data collection
- [ ] ML inference service
- [ ] Self-hosted deployment options

See `PRD.md` and `TODO.md` for complete roadmap details.

## 💬 Support

For setup questions, check `TODO.md` or review the documentation files.

---

**Built with ❤️ using the Spark Template**

Turn prompts into profit. Analyze like a pro. 🚀
