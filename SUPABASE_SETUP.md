# Supabase Database Setup for Money GPT

This file contains all SQL commands needed to set up the Money GPT database schema in Supabase.

## Instructions

1. Go to https://app.supabase.com
2. Navigate to your project: `eqvjsqfnmxzjmyldcfgc`
3. Click on "SQL Editor" in the left sidebar
4. Create a new query
5. Copy and paste each section below
6. Run each section separately

---

## 0. Enable pgvector Extension

**IMPORTANT: Run this first before creating any tables!**

```sql
-- Enable the pgvector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;
```

---

## 1. Create Tables

```sql
-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  subscription_status TEXT NOT NULL DEFAULT 'trial',
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  credits_remaining INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompt analyses table with vector embeddings
CREATE TABLE IF NOT EXISTS prompt_analyses (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  token_count INTEGER NOT NULL,
  ice_idea INTEGER NOT NULL,
  ice_cost INTEGER NOT NULL,
  ice_exploitability INTEGER NOT NULL,
  ice_overall INTEGER NOT NULL,
  pie_tier INTEGER NOT NULL,
  pie_primary_category TEXT NOT NULL,
  pie_secondary_categories TEXT[] NOT NULL DEFAULT '{}',
  pie_reasoning TEXT NOT NULL,
  suggestions TEXT[] NOT NULL DEFAULT '{}',
  model_version TEXT NOT NULL DEFAULT 'gpt-4o-v1',
  response_time_ms INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  vector_embedding VECTOR(3072)
);

-- Model metrics table (for tracking improvement over time)
CREATE TABLE IF NOT EXISTS model_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  sample_size INTEGER NOT NULL,
  model_version TEXT NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table (for payment tracking)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending',
  provider TEXT NOT NULL,
  credits_purchased INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Context files table (for RAG/Knowledge Base)
CREATE TABLE IF NOT EXISTS context_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'json', 'csv', 'md', 'txt'
  content TEXT NOT NULL, -- Extracted text content
  token_count INTEGER,
  vector_embedding VECTOR(3072), -- For RAG
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 2. Create Indexes for Performance

```sql
-- Index for user lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Indexes for analyses queries
CREATE INDEX IF NOT EXISTS idx_analyses_user_created 
  ON prompt_analyses(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analyses_tier 
  ON prompt_analyses(pie_tier);

CREATE INDEX IF NOT EXISTS idx_analyses_category 
  ON prompt_analyses(pie_primary_category);

-- Vector similarity search index (HNSW for fast approximate nearest neighbor search)
CREATE INDEX IF NOT EXISTS idx_analyses_vector_embedding 
  ON prompt_analyses 
  USING hnsw (vector_embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Alternative: IVFFlat index (use if HNSW is not available)
-- CREATE INDEX IF NOT EXISTS idx_analyses_vector_embedding 
--   ON prompt_analyses 
--   USING ivfflat (vector_embedding vector_cosine_ops)
--   WITH (lists = 100);

-- Index for transactions
CREATE INDEX IF NOT EXISTS idx_transactions_user 
  ON transactions(user_id, created_at DESC);

-- Index for context files
CREATE INDEX IF NOT EXISTS idx_context_files_user 
  ON context_files(user_id, created_at DESC);

-- Vector index for context files
CREATE INDEX IF NOT EXISTS idx_context_files_embedding 
  ON context_files 
  USING hnsw (vector_embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Index for model metrics
CREATE INDEX IF NOT EXISTS idx_metrics_type_date 
  ON model_metrics(metric_type, recorded_at DESC);
```

---

## 3. Set Up Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE context_files ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Prompt analyses policies
CREATE POLICY "Users can view own analyses"
  ON prompt_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses"
  ON prompt_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service can insert transactions"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- Context files policies
CREATE POLICY "Users can view own context files"
  ON context_files FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own context files"
  ON context_files FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own context files"
  ON context_files FOR DELETE
  USING (auth.uid() = user_id);

-- Model metrics are read-only for users
CREATE POLICY "Anyone can view metrics"
  ON model_metrics FOR SELECT
  TO authenticated
  USING (true);
```

---

## 4. Create Database Functions

```sql
-- Function to decrement user credits
CREATE OR REPLACE FUNCTION decrement_user_credits(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE users
  SET credits_remaining = GREATEST(credits_remaining - 1, 0),
      updated_at = NOW()
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add credits to user
CREATE OR REPLACE FUNCTION add_user_credits(user_uuid UUID, credits_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE users
  SET credits_remaining = credits_remaining + credits_to_add,
      updated_at = NOW()
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update subscription status
CREATE OR REPLACE FUNCTION update_subscription(
  user_uuid UUID,
  new_status TEXT,
  new_tier TEXT,
  credits_to_add INTEGER DEFAULT 0
)
RETURNS VOID AS $$
BEGIN
  UPDATE users
  SET subscription_status = new_status,
      subscription_tier = new_tier,
      credits_remaining = credits_remaining + credits_to_add,
      updated_at = NOW()
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to find similar prompts by vector similarity
CREATE OR REPLACE FUNCTION find_similar_prompts(
  query_embedding VECTOR(3072),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INTEGER DEFAULT 10,
  filter_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id TEXT,
  prompt TEXT,
  ice_overall INTEGER,
  pie_tier INTEGER,
  similarity FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.id,
    pa.prompt,
    pa.ice_overall,
    pa.pie_tier,
    1 - (pa.vector_embedding <=> query_embedding) AS similarity
  FROM prompt_analyses pa
  WHERE 
    (filter_user_id IS NULL OR pa.user_id = filter_user_id)
    AND pa.vector_embedding IS NOT NULL
    AND 1 - (pa.vector_embedding <=> query_embedding) > match_threshold
  ORDER BY pa.vector_embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get top N novel prompts (highest idea score)
CREATE OR REPLACE FUNCTION get_top_novel_prompts(
  user_uuid UUID,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id TEXT,
  prompt TEXT,
  ice_idea INTEGER,
  ice_overall INTEGER,
  pie_tier INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.id,
    pa.prompt,
    pa.ice_idea,
    pa.ice_overall,
    pa.pie_tier,
    pa.created_at
  FROM prompt_analyses pa
  WHERE pa.user_id = user_uuid
  ORDER BY pa.ice_idea DESC, pa.ice_overall DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get top exploitable prompts (highest exploitability score)
CREATE OR REPLACE FUNCTION get_top_exploitable_prompts(
  user_uuid UUID,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id TEXT,
  prompt TEXT,
  ice_exploitability INTEGER,
  ice_overall INTEGER,
  pie_tier INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.id,
    pa.prompt,
    pa.ice_exploitability,
    pa.ice_overall,
    pa.pie_tier,
    pa.created_at
  FROM prompt_analyses pa
  WHERE pa.user_id = user_uuid
  ORDER BY pa.ice_exploitability DESC, pa.ice_overall DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get prompts by tier and category
CREATE OR REPLACE FUNCTION get_prompts_by_classification(
  user_uuid UUID,
  target_tier INTEGER DEFAULT NULL,
  target_category TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
  id TEXT,
  prompt TEXT,
  ice_overall INTEGER,
  pie_tier INTEGER,
  pie_primary_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.id,
    pa.prompt,
    pa.ice_overall,
    pa.pie_tier,
    pa.pie_primary_category,
    pa.created_at
  FROM prompt_analyses pa
  WHERE 
    pa.user_id = user_uuid
    AND (target_tier IS NULL OR pa.pie_tier = target_tier)
    AND (target_category IS NULL OR pa.pie_primary_category = target_category)
  ORDER BY pa.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
```

---

## 5. Create Triggers for Auto-Updates

```sql
-- Trigger to update updated_at on users table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 6. Seed Initial Data (Optional - for testing)

```sql
-- This section is optional and only for development/testing
-- DO NOT run in production if you have real users

-- Example: Create a test user profile
-- Replace 'your-auth-user-id' with an actual user ID from auth.users
/*
INSERT INTO users (id, email, subscription_status, subscription_tier, credits_remaining)
VALUES (
  'your-auth-user-id'::UUID,
  'test@example.com',
  'active',
  'pro',
  500
)
ON CONFLICT (id) DO NOTHING;
*/
```

---

## 7. Verify Setup

```sql
-- Check that all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'prompt_analyses', 'transactions', 'model_metrics');

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- View all policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

---

## Troubleshooting

### If you get permission errors:
- Make sure you're using the SQL Editor as the database owner
- Check that your Supabase project is properly initialized

### If functions fail to create:
- Run them individually instead of all at once
- Check the error message for specific SQL syntax issues

### To reset everything (⚠️ DANGER - deletes all data):
```sql
-- USE WITH EXTREME CAUTION
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS model_metrics CASCADE;
DROP TABLE IF EXISTS prompt_analyses CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

---

## Next Steps

After running these SQL commands:

1. Test the setup by creating a user through Supabase Auth
2. Verify the user appears in the `users` table
3. Test creating a prompt analysis through the app
4. Check that data is being stored correctly
5. Monitor the Supabase dashboard for any errors

## Database Connection Info

- URL: `https://eqvjsqfnmxzjmyldcfgc.supabase.co`
- Password: `4Daifpneoibgjbgjd`
- Connection String: `postgresql://postgres:4Daifpneoibgjbgjd@db.eqvjsqfnmxzjmyldcfgc.supabase.co:5432/postgres`
