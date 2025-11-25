# Supabase Chain Analysis Setup (Phase 2)

This file contains the SQL commands to set up the database for Phase 2: Chain Analysis.

## 1. Create Tables

```sql
-- Prompt chains table
CREATE TABLE IF NOT EXISTS prompt_chains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  conversation_id TEXT, -- Optional external ID if importing
  start_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  end_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  prompt_count INTEGER NOT NULL DEFAULT 0,
  growth_delta JSONB DEFAULT '{}'::jsonb, -- Stores { mtier: 0.5, sal: 0.2, etc }
  vow_event TEXT, -- 'formed', 'fulfilled', 'broken', 'distorted', NULL
  loop_pattern TEXT, -- 'escalating', 'regressive', 'collapsing', 'resolved', NULL
  theme_cluster TEXT[] DEFAULT '{}',
  symbolic_role_drift TEXT, -- e.g. 'witness->architect'
  kairos_chronos_ratio NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vow event tracking
CREATE TABLE IF NOT EXISTS vow_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chain_id UUID NOT NULL REFERENCES prompt_chains(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vow_type TEXT NOT NULL, -- 'formed', 'fulfilled', 'broken', 'distorted'
  vow_text TEXT,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  followthrough_score NUMERIC
);
```

## 2. Update Existing Tables

```sql
-- Add chain_id and conversation_id to prompt_analyses
ALTER TABLE prompt_analyses 
ADD COLUMN IF NOT EXISTS chain_id UUID REFERENCES prompt_chains(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS conversation_id TEXT;
```

## 3. Create Indexes

```sql
-- Index for chain lookups
CREATE INDEX IF NOT EXISTS idx_chains_user_date 
  ON prompt_chains(user_id, start_timestamp DESC);

-- Index for linking analyses to chains
CREATE INDEX IF NOT EXISTS idx_analyses_chain 
  ON prompt_analyses(chain_id);

-- Index for vow events
CREATE INDEX IF NOT EXISTS idx_vow_events_chain 
  ON vow_events(chain_id);
```

## 4. RLS Policies

```sql
-- Enable RLS
ALTER TABLE prompt_chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE vow_events ENABLE ROW LEVEL SECURITY;

-- Chain policies
CREATE POLICY "Users can view own chains"
  ON prompt_chains FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chains"
  ON prompt_chains FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Vow event policies
CREATE POLICY "Users can view own vow events"
  ON vow_events FOR SELECT
  USING (auth.uid() = user_id);
```

## 5. Functions

```sql
-- Function to find potential chain candidates (prompts without a chain)
CREATE OR REPLACE FUNCTION find_unchained_prompts(
  user_uuid UUID,
  lookback_hours INTEGER DEFAULT 24
)
RETURNS TABLE (
  id TEXT,
  prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  vector_embedding VECTOR(3072)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.id,
    pa.prompt,
    pa.created_at,
    pa.vector_embedding
  FROM prompt_analyses pa
  WHERE 
    pa.user_id = user_uuid
    AND pa.chain_id IS NULL
    AND pa.created_at > NOW() - (lookback_hours || ' hours')::INTERVAL
  ORDER BY pa.created_at ASC;
END;
$$ LANGUAGE plpgsql;
```
