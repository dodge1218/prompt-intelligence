# Semantic Search Reference Guide
## Embedded AI Inside the Database

**Status**: ✅ FULLY IMPLEMENTED - See `VECTORIZATION_COMPLETE.md` for details

This document provides a quick reference for implementing semantic search capabilities using Supabase's pgvector extension.

---

## ✅ Implementation Complete

As of Iteration 2, the full vectorization infrastructure is live:
- 3072-dimensional embeddings generated for all prompts
- pgvector HNSW indexes deployed for <50ms queries
- Complete UI: `SimilarPrompts`, `DiscoverPrompts`, `DuplicateWarning` components
- New "Discover" tab with semantic search and RePrompt features
- Real-time duplicate detection integrated into analyze workflow

---

## Core Concept

Supabase doesn't yet support native SQL + LLM inference in the same query, but you can:

**Store vector embeddings using pgvector** and perform semantic search inside your SQL like:

```sql
SELECT *
FROM prompts
ORDER BY embedding <#> '[user vector]' -- cosine distance
LIMIT 10;
```

This is how you'll find **"similar prompts to this one"** or **"most symbolic prompts like this vector"**.

---

## 🧰 Tools to Add AI to SQL Interface

| Tool | What it does |
|------|-------------|
| 🧠 **Supabase + pgvector** | Store + semantically query prompt embeddings |
| 🧠 **SQLMesh / dbt** | Build prompt dashboards and metrics |
| 🧠 **Text-to-SQL (OpenAI or OSS)** | User types "find prompts with highest ICE" → AI writes query |
| 🧠 **Retool / Vercel AI SDK** | Build custom PIE admin interface with prompt stats + visuals |

---

## Implementation for Money GPT

### Vector Dimensions: 3072

We're using **OpenAI's `text-embedding-3-large`** model with **3072 dimensions** for:
- **Maximum quality** semantic understanding
- **Superior accuracy** in similarity detection
- **Better novelty scoring** with population-level context

### Database Schema

```sql
CREATE TABLE prompt_analyses (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL,
  prompt TEXT NOT NULL,
  -- ... other fields ...
  vector_embedding VECTOR(3072)  -- High-quality embeddings
);

-- Create HNSW index for fast similarity search
CREATE INDEX idx_vector_hnsw ON prompt_analyses 
  USING hnsw (vector_embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
```

### Core Query Patterns

#### 1. Find Similar Prompts

```sql
-- Find top 10 similar prompts
SELECT *
FROM prompt_analyses
WHERE user_id = 'user-123'
  AND vector_embedding IS NOT NULL
ORDER BY vector_embedding <=> '[query_embedding]'::VECTOR(3072)
LIMIT 10;
```

**Operator Guide:**
- `<=>` = cosine distance (1 - cosine_similarity)
- `0.0` = identical vectors
- `1.0` = completely different
- `< 0.3` = very similar
- `< 0.5` = somewhat related

#### 2. Detect Duplicates

```sql
-- Check if prompt already exists
SELECT 
  id,
  prompt,
  1 - (vector_embedding <=> '[new_prompt_embedding]'::VECTOR(3072)) AS similarity
FROM prompt_analyses
WHERE 
  user_id = 'user-123'
  AND vector_embedding <=> '[new_prompt_embedding]'::VECTOR(3072) < 0.1
ORDER BY similarity DESC;
```

**Business Logic:**
- `similarity > 0.9` → Duplicate detected
- `similarity 0.7-0.9` → Very similar, confirm with user
- `similarity < 0.7` → Original prompt

#### 3. Semantic Discovery by Category

```sql
-- Find similar Tier 3 strategic prompts
SELECT 
  id,
  prompt,
  1 - (vector_embedding <=> '[query_embedding]'::VECTOR(3072)) AS similarity
FROM prompt_analyses
WHERE 
  user_id = 'user-123'
  AND pie_tier = 3
  AND pie_primary_category = 'strategic'
  AND vector_embedding <=> '[query_embedding]'::VECTOR(3072) < 0.5
ORDER BY similarity DESC
LIMIT 10;
```

---

## Embedding Generation

### Using OpenAI API

```typescript
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
  return data.data[0].embedding // 3072 dimensions
}
```

### Cost Analysis

| Volume | Tokens | Cost @ $0.13/1M |
|--------|--------|-----------------|
| 1K prompts | 50K | $0.0065 |
| 10K prompts | 500K | $0.065 |
| 100K prompts | 5M | $0.65 |
| 1M prompts | 50M | $6.50 |

**Conclusion**: Negligible cost compared to LLM analysis (~$0.01 per prompt)

---

## Feature Use Cases

### 1. Smart RePrompt Discovery
- "Your 10 most novel prompts"
- "Your most exploitable ideas"
- "Prompts similar to your best work"

### 2. Duplicate Prevention
- Check before submission
- Offer cached results
- Save API costs

### 3. Prompt Families
- Auto-cluster by semantic similarity
- Group by theme/category
- Track evolution over time

### 4. Population-Level Novelty
- Compare your prompt to entire corpus
- "More novel than 87% of all prompts"
- Dynamic novelty threshold calibration

### 5. Text-to-SQL Interface (Future)
User natural language → AI generates SQL:
- "Show me my most creative prompts from last month"
- "Find prompts similar to 'write a blog post about AI'"
- "What are my top exploitable Tier 3 ideas?"

---

## Performance Targets

| Operation | Target Latency | Notes |
|-----------|----------------|-------|
| Similarity search | <50ms | With HNSW index |
| Duplicate check | <30ms | Single vector comparison |
| Clustering (1K prompts) | <5s | Batch operation |
| Embedding generation | ~150ms | OpenAI API call |

---

## Next Steps

1. ✅ **Plan finalized** - 3072 dimensions, text-embedding-3-large
2. ⏳ **Enable pgvector** in Supabase
3. ⏳ **Update schema** with vector column
4. ⏳ **Create HNSW index** for fast search
5. ⏳ **Integrate OpenAI** embeddings API
6. ⏳ **Build UI features** for semantic discovery
7. ⏳ **Test & optimize** query performance

---

## Related Documentation

- **`VECTORIZATION_PRD.md`** - Complete technical specification
- **`SUPABASE_SETUP.md`** - Database setup with pgvector
- **`PRD.md`** - Overall product roadmap with Stage 3 vectorization features
- **`AGGREGATE_OUTPUT_REFERENCE.md`** - Behavioral patterns to detect via vectors

---

## Key Advantages

✅ **No external vector DB** needed - Everything in PostgreSQL  
✅ **SQL-native queries** - Combine vectors with traditional filters  
✅ **Sub-50ms search** - HNSW index performance  
✅ **Hybrid queries** - Mix semantic + structured search  
✅ **Cost-effective** - Embedding costs <1% of total  
✅ **Scalable** - Supports millions of prompts  

---

## Example: End-to-End Workflow

```typescript
// 1. User submits prompt
const prompt = "Write a blog post about quantum computing"

// 2. Generate analysis (ICE/PIE scores)
const analysis = await analyzePrompt(prompt)

// 3. Generate embedding
const embedding = await generateEmbedding(prompt)

// 4. Check for duplicates
const duplicate = await checkDuplicate(embedding, userId)
if (duplicate.similarity > 0.9) {
  return { message: "Similar prompt found", cached: duplicate.analysis }
}

// 5. Store analysis + embedding
await supabase.from('prompt_analyses').insert({
  ...analysis,
  vector_embedding: embedding
})

// 6. Find similar prompts for recommendations
const similar = await findSimilarPrompts(embedding, userId, 0.7, 5)

// 7. Return results with recommendations
return {
  analysis,
  recommendations: similar
}
```

---

**Last Updated**: 2025-01-25  
**Vector Dimensions**: 3072 (text-embedding-3-large)  
**Status**: Ready for implementation
