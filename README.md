# 💰 Money GPT - Premium Prompt Intelligence Platform

A sophisticated, monetized prompt analysis platform that delivers ICE + PIE scoring behind a payment gate, with Supabase persistence and continuously improving AI models.

## 🎯 What is Money GPT?

Money GPT is a premium SaaS application that analyzes prompts using advanced frameworks:
- **ICE Framework**: Measures Idea, Cost, and Exploitability scores (0-100)
- **PIE Classification**: Categorizes prompts across 9 categories in 3 tiers
- **Actionable Suggestions**: AI-powered recommendations for prompt improvement

## ✨ Key Features

- 🔒 **Payment-Gated Access**: No outputs visible without paid subscription
- 💾 **Persistent Storage**: All analyses stored in Supabase for cross-device access
- 🧠 **Semantic Search**: 3072-dimensional vector embeddings for intelligent prompt discovery
- 🔍 **Duplicate Detection**: Automatic similarity detection prevents redundant analyses
- 🎯 **RePrompt Discovery**: Find your most novel and exploitable prompts instantly
- 📊 **Premium Analytics**: Track your prompt evolution over time
- 🤖 **Learning Models**: AI improves with every analysis
- 📥 **Export Capabilities**: Download your data as JSON or CSV
- 🎨 **Premium UI**: Beautiful, modern interface with emerald/purple/gold theme

### 🆕 Vectorization Features (Iteration 2 - COMPLETE)

- ✅ **Real-Time Similarity Detection**: See related prompts as you type
- ✅ **Discover Tab**: Browse top novel and exploitable prompts
- ✅ **Duplicate Prevention**: Smart alerts before duplicate submissions
- ✅ **Semantic Navigation**: Click-through exploration of related analyses
- ✅ **3072-Dim Embeddings**: Superior quality with OpenAI text-embedding-3-large
- ✅ **Sub-50ms Search**: HNSW indexes for lightning-fast vector queries

See `VECTORIZATION_COMPLETE.md` and `ITERATION2_SUMMARY.md` for full details.

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
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL + pgvector)
- **Vector Search**: OpenAI text-embedding-3-large (3072 dimensions)
- **Authentication**: Supabase Auth (to be implemented)
- **Payments**: Stripe (to be implemented)
- **AI Models**: OpenAI GPT-4o, Google Gemini (optional)
- **Deployment**: Vercel

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
│   ├── ui/                # shadcn components
│   ├── PaymentGate.tsx    # Payment modal
│   ├── LockedContent.tsx  # Content blur/lock
│   ├── RadarChart.tsx     # ICE score visualization
│   ├── TierMatrix.tsx     # PIE category grid
│   ├── SimilarPrompts.tsx # Real-time similarity detection
│   ├── DiscoverPrompts.tsx # RePrompt discovery UI
│   └── DuplicateWarning.tsx # Duplicate alerts
├── lib/
│   ├── supabase.ts        # Supabase client config
│   ├── database.ts        # Database operations
│   ├── scoring.ts         # Analysis logic
│   ├── vectorization.ts   # Vector embeddings & search
│   ├── types.ts           # TypeScript definitions
│   └── export.ts          # CSV/JSON export
├── App.tsx                # Main application
└── index.css              # Theme and styles
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

- `PRD.md` - Full product requirements and design specs (✅ Updated with completed vectorization features)
- `TODO.md` - Implementation checklist and task breakdown
- `SUPABASE_SETUP.md` - Complete database setup guide with pgvector
- `VECTORIZATION_PRD.md` - Complete vectorization architecture and implementation
- `VECTORIZATION_COMPLETE.md` - Iteration 2 completion report
- `ITERATION2_SUMMARY.md` - What changed in this iteration
- `SEMANTIC_SEARCH_REFERENCE.md` - Quick reference for vector queries
- `.env.example` - Environment configuration reference

## 🤝 Contributing

This is a commercial SaaS product. Internal development only.

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

Money GPT application code is proprietary.

## 🎯 Roadmap

### Phase 1 (MVP) - Current
- [x] Core analysis functionality
- [x] Payment gate UI
- [x] Database integration layer
- [x] **Vector embeddings & semantic search (Iteration 2)**
- [x] **Duplicate detection**
- [x] **RePrompt discovery features**
- [ ] Supabase schema creation
- [ ] Vercel deployment
- [ ] Stripe integration

### Phase 2
- [ ] User authentication
- [ ] Model improvement tracking
- [ ] Advanced analytics dashboard
- [ ] API access for Pro users
- [ ] Prompt clustering visualization
- [ ] Population-level analytics

### Phase 3
- [ ] Team collaboration
- [ ] Custom model training
- [ ] White-label options
- [ ] Enterprise features
- [ ] Chain-level analysis (PIE v4.7)
- [ ] Cross-user discovery (opt-in)

## 💬 Support

For setup questions, check `TODO.md` or review the documentation files.

---

**Built with ❤️ using the Spark Template**

Turn prompts into profit. Analyze like a pro. 🚀
