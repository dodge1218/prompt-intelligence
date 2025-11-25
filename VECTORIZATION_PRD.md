# Vectorization & Advanced Query Architecture
## Backend Infrastructure for Semantic Prompt Analysis

**Status**: 📋 PLANNING PHASE  
**Priority**: HIGH - Required for Stage 3+ features  
**Dependencies**: Supabase pgvector extension, OpenAI Embeddings API

---

## 🧠 Embedded AI Inside the Database

Supabase's PostgreSQL with pgvector extension enables **native SQL + vector embeddings** in the same database, allowing you to:

**Store vector embeddings using pgvector** and perform semantic search inside your SQL queries:

```sql
SELECT *
FROM prompts
ORDER BY embedding <#> '[user vector]' -- cosine distance
LIMIT 10;
```

This is how you'll find **"similar prompts to this one"** or **"most symbolic prompts like this vector"**.

### 🧰 Tools to Add AI to SQL Interface

| Tool | What it does |
|------|-------------|
| 🧠 **Supabase + pgvector** | Store + semantically query prompt embeddings |
| 🧠 **SQLMesh / dbt** | Build prompt dashboards and metrics |
| 🧠 **Text-to-SQL (OpenAI or OSS)** | User types "find prompts with highest ICE" → AI writes query |
| 🧠 **Retool / Vercel AI SDK** | Build custom PIE admin interface with prompt stats + visuals |

This architecture enables:
- **Semantic search** within SQL without external vector databases
- **Hybrid queries** combining traditional filters with vector similarity
- **Prompt discovery** through natural language queries converted to SQL
- **Administrative dashboards** powered by vector-enhanced analytics

---

## Overview

This document outlines the complete backend vectorization infrastructure for Money GPT, enabling semantic search, similarity detection, novelty scoring, and advanced prompt discovery through PostgreSQL vector embeddings.

### Core Value Proposition

Transform Money GPT from a **single-prompt analysis tool** into a **semantic intelligence platform** that:
- Finds similar prompts across your entire history
- Detects duplicate/near-duplicate submissions
- Powers novelty scoring with population-level context
- Enables "find prompts like this" discovery
- Supports cluster detection and prompt families
- Enables advanced RePrompt recommendations

---

## Database Schema Enhancement

### Enhanced `prompt_analyses` Table

```sql
CREATE TABLE prompt_analyses (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  
  -- ICE Scores (stored as JSONB for flexibility)
  ice_score JSONB NOT NULL, -- { "idea": 85, "cost": 20, "exploitability": 76, "overall": 60 }
  
  -- PIE Classification
  pie_tier INTEGER NOT NULL CHECK (pie_tier IN (1, 2, 3)),
  pie_primary_category TEXT NOT NULL,
  pie_secondary_categories TEXT[] DEFAULT '{}',
  pie_reasoning TEXT NOT NULL,
  
  -- Metadata
  token_count INTEGER NOT NULL,
  suggestions TEXT[] DEFAULT '{}',
  model_version TEXT DEFAULT 'gpt-4o-v1',
  response_time_ms INTEGER DEFAULT 0,
  
  -- Vector Embedding (OpenAI text-embedding-3-large: 3072 dimensions)
  vector_embedding VECTOR(3072),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Why This Schema?

**Clean ✅**: 
- Flat structure for fast queries
- JSONB for ICE scores enables flexible filtering: `WHERE (ice_score->>'idea')::float > 80`
- Vector stored directly on main table (no JOIN overhead)

**Precise ✅**: 
- Exact dimensions match OpenAI embedding model
- Proper constraints (tier 1-3, NOT NULL on critical fields)
- Indexed for common query patterns

**Scalable ✅**: 
- HNSW index for sub-linear vector search (<50ms on 1M+ rows)
- Partitionable by user_id if needed
- JSONB GIN indexes for nested filtering

---

## Vector Embedding Strategy

### Embedding Model: OpenAI `text-embedding-3-large`

**Why this model?**
- **Dimensions**: 3072 (maximum quality for semantic search)
- **Cost**: $0.13 per 1M tokens (still very affordable)
- **Quality**: Best-in-class semantic understanding and retrieval performance
- **Speed**: ~100-150ms per embedding
- **Compatibility**: Full pgvector support with extended dimensions
- **Benefit**: Superior accuracy for detecting semantic similarity and novelty scoring

**Alternative Models** (for future consideration):
- `text-embedding-3-small` (1536 dims) - Lower cost, slightly reduced quality
- Voyage AI embeddings - Specialized for search
- Open-source models (all-MiniLM-L6-v2) - Free but lower quality

### Embedding Generation Workflow

```typescript
// Generate embedding for a prompt
async function generateEmbedding(prompt: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: prompt,
      model: 'text-embedding-3-large',
      encoding_format: 'float',
    }),
  })
  
  const data = await response.json()
  return data.data[0].embedding // Returns float[] with 3072 dimensions
}
```

### When to Generate Embeddings

**On Prompt Submission** (primary path):
1. User submits prompt
2. Generate ICE/PIE analysis (LLM call)
3. **Generate embedding** (separate API call)
4. Store all data + embedding in single transaction

**Backfill Existing Data** (one-time migration):
```sql
-- Find all prompts without embeddings
SELECT id, prompt FROM prompt_analyses WHERE vector_embedding IS NULL;
```
Then batch-generate embeddings (100 at a time to respect rate limits)

**Cost Estimate**:
- 1000 prompts × avg 50 tokens = 50K tokens
- Cost: $0.001 (negligible)
- Time: ~10 minutes for 1000 prompts

---

## Core Query Patterns

### 1. Find Similar Prompts (Semantic Search)

**Use Case**: "Show me prompts similar to this one"

```sql
-- Get top 10 similar prompts for a user
SELECT *
FROM prompt_analyses
WHERE user_id = 'user-123'
  AND vector_embedding IS NOT NULL
ORDER BY vector_embedding <=> '[query_embedding]'::VECTOR(3072)
LIMIT 10;
```

**Operator**: `<=>` is cosine distance (1 - cosine_similarity)
- 0.0 = identical vectors
- 1.0 = completely different
- Threshold: 0.3 for "similar", 0.5 for "somewhat related"

**Performance**: 
- With HNSW index: ~10-50ms for 10K+ prompts
- Without index: ~500ms+ (full table scan)

---

### 2. Top Novel Prompts (Highest Idea Score)

**Use Case**: RePrompt feature - "Your most novel prompts"

```sql
-- Get top 10 novel (idea score) prompts for a user
SELECT 
  id,
  prompt,
  (ice_score->>'idea')::float AS idea_score,
  (ice_score->>'overall')::float AS overall_score,
  pie_tier,
  created_at
FROM prompt_analyses
WHERE user_id = 'user-123'
ORDER BY (ice_score->>'idea')::float DESC
LIMIT 10;
```

**Why This Works**:
- JSONB operators extract nested values
- Cast to float for numeric comparison
- Index on `ice_score` (GIN) makes this fast

---

### 3. Detect Near-Duplicates

**Use Case**: "You already submitted something similar"

```sql
-- Find prompts within cosine distance 0.1 (very similar)
SELECT 
  pa.id,
  pa.prompt,
  1 - (pa.vector_embedding <=> '[new_prompt_embedding]'::VECTOR(3072)) AS similarity
FROM prompt_analyses pa
WHERE 
  pa.user_id = 'user-123'
  AND pa.vector_embedding <=> '[new_prompt_embedding]'::VECTOR(3072) < 0.1
ORDER BY similarity DESC;
```

**Business Logic**:
- If similarity > 0.9 → "This is a duplicate, show cached result?"
- If similarity 0.7-0.9 → "Similar prompt found, reanalyze anyway?"
- If similarity < 0.7 → Proceed normally

---

### 4. Aggregate Queries Across Tiers

**Use Case**: Analytics dashboard - "How many Tier 3 prompts?"

```sql
-- Count prompts by tier
SELECT 
  pie_tier,
  COUNT(*) as count,
  AVG((ice_score->>'overall')::float) as avg_score
FROM prompt_analyses
WHERE user_id = 'user-123'
GROUP BY pie_tier
ORDER BY pie_tier;
```

**Advanced**: Get tier distribution by category

```sql
-- Tier × Category distribution
SELECT 
  pie_tier,
  pie_primary_category,
  COUNT(*) as count
FROM prompt_analyses
WHERE user_id = 'user-123'
GROUP BY pie_tier, pie_primary_category
ORDER BY pie_tier, count DESC;
```

---

### 5. Exploitability Ranking

**Use Case**: "Your most actionable prompts"

```sql
-- Top exploitable prompts
SELECT 
  id,
  prompt,
  (ice_score->>'exploitability')::float AS exploitability,
  (ice_score->>'cost')::float AS cost,
  pie_tier
FROM prompt_analyses
WHERE user_id = 'user-123'
ORDER BY (ice_score->>'exploitability')::float DESC
LIMIT 10;
```

---

### 6. Population-Level Novelty Baseline

**Use Case**: Calibrate individual novelty against entire corpus

```sql
-- Get novelty percentile for a prompt
WITH user_prompt AS (
  SELECT (ice_score->>'idea')::float AS idea_score
  FROM prompt_analyses
  WHERE id = 'prompt-xyz'
),
population_scores AS (
  SELECT (ice_score->>'idea')::float AS idea_score
  FROM prompt_analyses
  WHERE vector_embedding IS NOT NULL
)
SELECT 
  PERCENT_RANK() OVER (ORDER BY idea_score) * 100 AS percentile
FROM population_scores, user_prompt
WHERE population_scores.idea_score <= user_prompt.idea_score;
```

**Result**: "Your prompt is more novel than 87% of all prompts"

---

## Advanced Features

### Feature 1: Prompt Clustering

**Goal**: Group similar prompts into families (e.g., "coding help", "creative writing")

**Approach**:
1. Export all embeddings for a user
2. Run K-means clustering client-side (or with Supabase Edge Function)
3. Assign cluster IDs to prompts
4. Store in new `prompt_cluster` field

**SQL for Within-Cluster Variance**:
```sql
-- Find tightly clustered prompts (low internal variance)
WITH clusters AS (
  SELECT 
    cluster_id,
    AVG(vector_embedding) AS centroid
  FROM prompt_analyses
  WHERE user_id = 'user-123'
  GROUP BY cluster_id
)
SELECT 
  pa.cluster_id,
  AVG(pa.vector_embedding <=> c.centroid) AS avg_distance
FROM prompt_analyses pa
JOIN clusters c ON pa.cluster_id = c.cluster_id
WHERE pa.user_id = 'user-123'
GROUP BY pa.cluster_id
ORDER BY avg_distance ASC;
```

---

### Feature 2: Temporal Novelty Decay

**Goal**: Track if user prompts become more/less novel over time

```sql
-- Novelty trend over time (monthly)
SELECT 
  DATE_TRUNC('month', created_at) AS month,
  AVG((ice_score->>'idea')::float) AS avg_novelty,
  COUNT(*) AS prompt_count
FROM prompt_analyses
WHERE user_id = 'user-123'
GROUP BY month
ORDER BY month ASC;
```

**Visualization**: Line chart showing novelty trajectory

---

### Feature 3: Category-Specific Discovery

**Goal**: "Find similar Tier 3 strategic prompts"

```sql
-- Similar prompts within same tier and category
SELECT 
  pa.id,
  pa.prompt,
  1 - (pa.vector_embedding <=> '[query_embedding]'::VECTOR(3072)) AS similarity,
  pa.ice_score
FROM prompt_analyses pa
WHERE 
  pa.user_id = 'user-123'
  AND pa.pie_tier = 3
  AND pa.pie_primary_category = 'strategic'
  AND pa.vector_embedding <=> '[query_embedding]'::VECTOR(3072) < 0.5
ORDER BY similarity DESC
LIMIT 10;
```

---

## Performance Optimization

### Index Strategy

```sql
-- 1. HNSW index for vector similarity (REQUIRED)
CREATE INDEX idx_vector_hnsw ON prompt_analyses 
  USING hnsw (vector_embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- 2. GIN index for JSONB ice_score queries
CREATE INDEX idx_ice_score_gin ON prompt_analyses 
  USING GIN (ice_score);

-- 3. Composite index for user + tier + category filtering
CREATE INDEX idx_user_tier_category ON prompt_analyses 
  (user_id, pie_tier, pie_primary_category);

-- 4. Timestamp index for temporal queries
CREATE INDEX idx_created_at ON prompt_analyses (created_at DESC);
```

### Query Performance Targets

| Query Type | Target Latency | Index Required |
|------------|----------------|----------------|
| Similarity search (10 results) | <50ms | HNSW |
| Top N by score | <20ms | GIN on ice_score |
| Tier/category filter | <30ms | Composite index |
| Aggregate stats | <100ms | All indexes |
| Clustering (1000 prompts) | <5s | HNSW + compute |

### Scaling Considerations

**Current Scale** (MVP):
- 100 users × 100 prompts = 10K rows
- Database size: ~50MB
- All queries <100ms

**Mid-Scale** (1 year):
- 10K users × 500 prompts = 5M rows
- Database size: ~25GB
- HNSW index size: ~5GB
- Target: <200ms for complex queries

**Large-Scale** (2+ years):
- 100K users × 1000 prompts = 100M rows
- Database size: ~500GB
- Consider partitioning by user_id or date
- May need separate vector database (Pinecone, Qdrant)

---

## Implementation Roadmap

### Phase 1: Core Infrastructure (Week 1-2)

**Tasks**:
- [ ] Enable pgvector extension in Supabase
- [ ] Update `prompt_analyses` schema with `vector_embedding` column
- [ ] Create HNSW index on vector column
- [ ] Implement embedding generation function in codebase
- [ ] Test embedding generation with sample prompts
- [ ] Deploy schema changes to production

**Deliverable**: Database ready for vector operations

---

### Phase 2: Basic Vector Operations (Week 3-4)

**Tasks**:
- [ ] Integrate OpenAI Embeddings API
- [ ] Add embedding generation to prompt submission flow
- [ ] Implement similarity search function in `database.ts`
- [ ] Create SQL functions for top novel/exploitable queries
- [ ] Backfill embeddings for existing prompts (if any)
- [ ] Add monitoring for embedding generation failures

**Deliverable**: Every new prompt gets an embedding automatically

---

### Phase 3: User-Facing Features (Week 5-6)

**Tasks**:
- [ ] Build "Find Similar" UI component
- [ ] Add duplicate detection with user prompt before submission
- [ ] Implement RePrompt "Top Novel Prompts" view
- [ ] Create "Most Exploitable" prompt discovery view
- [ ] Add filtering by similarity threshold
- [ ] Build prompt clustering visualization (optional)

**Deliverable**: Users can discover and explore their prompt history semantically

---

### Phase 4: Analytics & Optimization (Week 7-8)

**Tasks**:
- [ ] Build analytics dashboard with vector-powered insights
- [ ] Implement population-level novelty percentiles
- [ ] Add temporal trend analysis (novelty over time)
- [ ] Optimize slow queries with additional indexes
- [ ] Implement caching layer for common similarity searches
- [ ] Monitor and tune HNSW index parameters

**Deliverable**: Fast, insightful analytics powered by vectors

---

## API Integration Details

### OpenAI Embeddings API

**Endpoint**: `https://api.openai.com/v1/embeddings`

**Request**:
```json
{
  "input": "Your prompt text here...",
  "model": "text-embedding-3-large",
  "encoding_format": "float"
}
```

**Response**:
```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.123, -0.456, 0.789, ...]
    }
  ],
  "model": "text-embedding-3-large",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

**Rate Limits**:
- Tier 1: 3,000 RPM
- Tier 2: 3,500 RPM
- Tier 3+: 5,000 RPM

**Error Handling**:
- Retry on 429 (rate limit) with exponential backoff
- Fall back to storing without embedding if API fails
- Queue for retry with background job

---

## Database Functions (TypeScript)

### Core Vector Operations Library

```typescript
// src/lib/vectorization.ts

import { supabase } from './supabase'

/**
 * Generate embedding for a prompt using OpenAI
 */
export async function generateEmbedding(prompt: string): Promise<number[]> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: prompt,
      model: 'text-embedding-3-large',
      encoding_format: 'float',
    }),
  })

  if (!response.ok) {
    throw new Error(`Embedding API failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data.data[0].embedding
}

/**
 * Find prompts similar to a given embedding
 */
export async function findSimilarPrompts(
  embedding: number[],
  userId: string,
  threshold: number = 0.7,
  limit: number = 10
) {
  const { data, error } = await supabase.rpc('find_similar_prompts', {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count: limit,
    filter_user_id: userId,
  })

  if (error) throw error
  return data
}

/**
 * Check if prompt is a near-duplicate
 */
export async function detectDuplicate(
  prompt: string,
  userId: string,
  threshold: number = 0.9
): Promise<{ isDuplicate: boolean; similarPrompt?: any }> {
  const embedding = await generateEmbedding(prompt)
  const similar = await findSimilarPrompts(embedding, userId, threshold, 1)
  
  return {
    isDuplicate: similar.length > 0 && similar[0].similarity > threshold,
    similarPrompt: similar[0],
  }
}

/**
 * Get top novel prompts for a user
 */
export async function getTopNovelPrompts(userId: string, limit: number = 10) {
  const { data, error } = await supabase.rpc('get_top_novel_prompts', {
    user_uuid: userId,
    limit_count: limit,
  })

  if (error) throw error
  return data
}

/**
 * Get top exploitable prompts for a user
 */
export async function getTopExploitablePrompts(userId: string, limit: number = 10) {
  const { data, error } = await supabase.rpc('get_top_exploitable_prompts', {
    user_uuid: userId,
    limit_count: limit,
  })

  if (error) throw error
  return data
}

/**
 * Get prompts by classification (tier and/or category)
 */
export async function getPromptsByClassification(
  userId: string,
  tier?: number,
  category?: string,
  limit: number = 50
) {
  const { data, error } = await supabase.rpc('get_prompts_by_classification', {
    user_uuid: userId,
    target_tier: tier,
    target_category: category,
    limit_count: limit,
  })

  if (error) throw error
  return data
}
```

---

## Testing Strategy

### Unit Tests

```typescript
describe('Vectorization', () => {
  it('generates embeddings with correct dimensions', async () => {
    const embedding = await generateEmbedding('Test prompt')
    expect(embedding.length).toBe(3072)
  })

  it('detects near-duplicates correctly', async () => {
    const result = await detectDuplicate(
      'Write a blog post about AI',
      'user-123'
    )
    expect(result.isDuplicate).toBe(false)
  })

  it('finds similar prompts', async () => {
    const embedding = await generateEmbedding('Explain quantum physics')
    const similar = await findSimilarPrompts(embedding, 'user-123')
    expect(similar.length).toBeGreaterThan(0)
  })
})
```

### Integration Tests

```typescript
describe('Vector Search Integration', () => {
  it('end-to-end similarity search', async () => {
    // 1. Submit prompt
    const analysis = await analyzePrompt('Test prompt')
    
    // 2. Generate embedding
    const embedding = await generateEmbedding('Test prompt')
    
    // 3. Store with embedding
    await saveAnalysisWithEmbedding(analysis, embedding)
    
    // 4. Search for similar
    const similar = await findSimilarPrompts(embedding, userId)
    
    expect(similar[0].id).toBe(analysis.id)
  })
})
```

---

## Cost Analysis

### Embedding Generation Costs

| Users | Prompts/User | Total Prompts | Tokens (avg 50) | Cost @ $0.13/1M |
|-------|--------------|---------------|-----------------|-----------------|
| 100 | 100 | 10K | 500K | $0.065 |
| 1K | 500 | 500K | 25M | $3.25 |
| 10K | 1000 | 10M | 500M | $65.00 |
| 100K | 1000 | 100M | 5B | $650.00 |

**Conclusion**: Embedding costs are still low compared to LLM analysis costs (~$0.01 per analysis), providing superior quality for minimal incremental cost

### Storage Costs

| Prompts | Vector Size (3072 × 4 bytes) | Total Storage | Supabase Cost |
|---------|------------------------------|---------------|---------------|
| 10K | 12KB | 120MB | Free |
| 100K | 12KB | 1.2GB | Free |
| 1M | 12KB | 12GB | ~$0.50/month |
| 10M | 12KB | 120GB | ~$5.00/month |

**Conclusion**: Storage costs remain minimal on Supabase, with double the embedding quality for marginal storage increase

---

## Security & Privacy

### Considerations

1. **Embeddings are semantic representations**
   - They don't store the raw text, but preserve meaning
   - Similarity searches could reveal related prompts
   - Users should only search their own prompts

2. **Row Level Security (RLS)**
   ```sql
   -- Ensure users only access their own vectors
   CREATE POLICY "Users can only search own prompts"
     ON prompt_analyses FOR SELECT
     USING (auth.uid() = user_id);
   ```

3. **API Key Security**
   - Store OpenAI key server-side only
   - Never expose in client code
   - Use environment variables
   - Rotate keys periodically

4. **Rate Limiting**
   - Limit embedding generation to prevent abuse
   - Max 100 prompts per user per hour
   - Monitor for anomalous behavior

---

## Future Enhancements

### Phase 5: Advanced Features

- **Multi-modal embeddings**: Images, code snippets in prompts
- **Hybrid search**: Combine vector similarity + keyword search
- **Prompt evolution tracking**: How prompts change over time
- **Cross-user discovery**: "Public prompts similar to yours" (opt-in)
- **Automated clustering**: ML-powered prompt categorization
- **Embedding compression**: Reduce dimensions to 768 or 384 for cost savings
- **Local embeddings**: Use open-source models (Sentence Transformers) to eliminate API dependency

---

## Success Metrics

### KPIs for Vector Features

- **Adoption**: % of users who use similarity search or RePrompt features
- **Engagement**: Avg searches per user per week
- **Discovery**: % of prompts discovered via similarity search
- **Duplicate Prevention**: % of duplicate submissions prevented
- **Performance**: p95 query latency <100ms
- **Cost**: Embedding cost as % of total infrastructure cost (<5%)

---

## Conclusion

This vectorization architecture transforms Money GPT's backend into a **semantic intelligence platform** with:

✅ **Clean Schema**: Flat, performant table design with native vector support  
✅ **Precise Queries**: SQL-native similarity search with <50ms latency  
✅ **Scalable Design**: HNSW indexing supports millions of prompts  
✅ **Rich Features**: Duplicate detection, novelty ranking, semantic discovery  
✅ **Low Cost**: Negligible embedding and storage costs at scale  

**Next Steps**:
1. Enable pgvector in Supabase
2. Update schema and create indexes
3. Integrate OpenAI Embeddings API
4. Build user-facing discovery features
5. Launch and monitor performance

**Reference**: See `AGGREGATE_OUTPUT_REFERENCE.md` for behavioral patterns to detect and surface through vector search
