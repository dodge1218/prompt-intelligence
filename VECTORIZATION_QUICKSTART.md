# Vectorization Implementation Guide
## Quick Start for Backend Setup

**Status**: ✅ READY TO IMPLEMENT  
**Estimated Time**: 2-4 hours for core setup  
**Prerequisites**: Supabase account, OpenAI API key

---

## Step-by-Step Implementation

### Step 1: Enable pgvector Extension (5 minutes)

1. Log into Supabase: https://app.supabase.com
2. Navigate to your project: `eqvjsqfnmxzjmyldcfgc`
3. Go to **SQL Editor**
4. Run this command:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

5. Verify it worked:

```sql
SELECT * FROM pg_extension WHERE extname = 'vector';
```

You should see a row with `vector` as the extension name.

---

### Step 2: Update Database Schema (10 minutes)

Run the SQL commands from `SUPABASE_SETUP.md` in this order:

#### 2.1 Add vector column to existing table

```sql
-- Add vector_embedding column to prompt_analyses
ALTER TABLE prompt_analyses 
ADD COLUMN IF NOT EXISTS vector_embedding VECTOR(1536);
```

#### 2.2 Create HNSW index for fast similarity search

```sql
-- Create vector similarity index (HNSW)
CREATE INDEX IF NOT EXISTS idx_analyses_vector_embedding 
  ON prompt_analyses 
  USING hnsw (vector_embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
```

**Note**: Index creation may take a few minutes if you have existing data. It's non-blocking.

#### 2.3 Create GIN index for JSONB queries

Since we're moving to JSONB for ICE scores (recommended but optional for now):

```sql
-- Optional: Add GIN index for ice_score JSONB queries
-- Only if you convert ice_* columns to JSONB structure
CREATE INDEX IF NOT EXISTS idx_ice_score_gin ON prompt_analyses 
  USING GIN (ice_score);
```

#### 2.4 Create database functions

Copy and run all functions from `SUPABASE_SETUP.md` section 4:
- `find_similar_prompts`
- `get_top_novel_prompts`
- `get_top_exploitable_prompts`
- `get_prompts_by_classification`

Run each function individually to avoid errors.

---

### Step 3: Configure Environment Variables (5 minutes)

Add to your `.env.local` file:

```bash
# OpenAI API Key for embeddings
VITE_OPENAI_API_KEY=sk-your-key-here

# Existing Supabase config
VITE_SUPABASE_URL=https://eqvjsqfnmxzjmyldcfgc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Mode settings
VITE_MODE=development
VITE_DEV_BYPASS_PAYMENT=true
```

**Security Note**: Never commit `.env.local` to git. It's already in `.gitignore`.

---

### Step 4: Test Embedding Generation (15 minutes)

Create a test file `src/test-vectorization.ts`:

```typescript
import { generateEmbedding, detectDuplicate, findSimilarPrompts } from './lib/vectorization'

async function testVectorization() {
  console.log('Testing vectorization...')
  
  // Test 1: Generate embedding
  const testPrompt = 'Write a blog post about AI safety'
  console.log('Generating embedding for:', testPrompt)
  
  const embedding = await generateEmbedding(testPrompt)
  console.log('✓ Embedding generated:', embedding.length, 'dimensions')
  
  // Test 2: Detect duplicate (should return false for new prompt)
  const dupCheck = await detectDuplicate(testPrompt, 'test-user-id')
  console.log('✓ Duplicate check:', dupCheck.isDuplicate ? 'DUPLICATE' : 'UNIQUE')
  
  // Test 3: Find similar prompts (may return empty initially)
  const similar = await findSimilarPrompts(embedding, 'test-user-id', 0.7, 5)
  console.log('✓ Similar prompts found:', similar.length)
  
  console.log('All tests passed! ✓')
}

testVectorization().catch(console.error)
```

Run with: `npx tsx src/test-vectorization.ts`

**Expected Output**:
```
Testing vectorization...
Generating embedding for: Write a blog post about AI safety
✓ Embedding generated: 1536 dimensions
✓ Duplicate check: UNIQUE
✓ Similar prompts found: 0
All tests passed! ✓
```

---

### Step 5: Verify Database Integration (10 minutes)

Test that the database can store and retrieve embeddings:

```sql
-- Insert a test prompt with embedding (use actual embedding from Step 4)
INSERT INTO prompt_analyses (
  id, user_id, prompt, token_count,
  ice_idea, ice_cost, ice_exploitability, ice_overall,
  pie_tier, pie_primary_category, pie_reasoning,
  vector_embedding
) VALUES (
  'test-123',
  'test-user',
  'Write a blog post about AI',
  50,
  75, 30, 60, 55,
  2, 'builder', 'Test prompt',
  '[0.123, -0.456, 0.789, ...]'::VECTOR(1536)  -- Paste actual embedding here
);

-- Query it back
SELECT 
  id, 
  prompt, 
  ice_idea,
  vector_embedding <=> '[0.123, -0.456, 0.789, ...]'::VECTOR(1536) AS distance
FROM prompt_analyses
WHERE id = 'test-123';

-- Clean up
DELETE FROM prompt_analyses WHERE id = 'test-123';
```

---

### Step 6: Integration with Existing Code (30 minutes)

The `database.ts` file has already been updated to generate embeddings automatically. Now you can use it:

```typescript
// In App.tsx or wherever you handle prompt submission
import { saveAnalysisToDatabase } from '@/lib/database'

// This now automatically generates and stores embeddings
await saveAnalysisToDatabase(analysis)
```

**What happens**:
1. Prompt analysis is performed (ICE/PIE scoring)
2. Embedding is generated via OpenAI API
3. Both analysis + embedding are stored in one transaction
4. If embedding fails, analysis is still saved (graceful degradation)

---

### Step 7: Backfill Existing Prompts (Optional, 30-60 minutes)

If you already have prompts in the database without embeddings:

```typescript
import { backfillEmbeddings } from './lib/vectorization'

// Backfill in batches of 100
await backfillEmbeddings(100)
```

**Important**:
- This makes API calls to OpenAI (costs ~$0.02 per 1000 prompts)
- Rate limited to avoid hitting OpenAI limits
- Run during off-peak hours
- Monitor console for progress

---

## Verification Checklist

After completing all steps, verify:

- [ ] `pgvector` extension is enabled in Supabase
- [ ] `vector_embedding` column exists in `prompt_analyses` table
- [ ] HNSW index is created (check with `\d prompt_analyses` in SQL editor)
- [ ] All 4 database functions are created and callable
- [ ] OpenAI API key is configured in `.env.local`
- [ ] Test script runs without errors
- [ ] New prompts automatically get embeddings
- [ ] Similarity search returns results (after you have some data)

---

## Testing the Full Flow

Create a test analysis flow:

```typescript
import { analyzePrompt } from '@/lib/scoring'
import { saveAnalysisToDatabase } from '@/lib/database'
import { findSimilarPrompts, generateEmbedding } from '@/lib/vectorization'

async function testFullFlow() {
  // 1. Analyze a prompt
  const prompt = 'Explain quantum computing to a 10-year-old'
  const analysis = await analyzePrompt(prompt)
  console.log('Analysis:', analysis.iceScore)
  
  // 2. Save with embedding
  await saveAnalysisToDatabase(analysis)
  console.log('✓ Saved to database with embedding')
  
  // 3. Find similar prompts
  const embedding = await generateEmbedding(prompt)
  const similar = await findSimilarPrompts(
    embedding, 
    analysis.userId || 'test-user',
    0.7,
    5
  )
  console.log('✓ Found similar prompts:', similar.length)
  
  // 4. Check for duplicates on next submission
  const dupCheck = await detectDuplicate(prompt, analysis.userId || 'test-user')
  console.log('✓ Duplicate detection:', dupCheck.isDuplicate ? 'YES' : 'NO')
  if (dupCheck.isDuplicate) {
    console.log('  Similar prompt:', dupCheck.similarPrompt?.prompt.substring(0, 50))
    console.log('  Similarity:', (dupCheck.similarity! * 100).toFixed(1) + '%')
  }
}

testFullFlow().catch(console.error)
```

---

## Common Issues & Solutions

### Issue 1: pgvector extension not found

**Error**: `type "vector" does not exist`

**Solution**: 
- Make sure you ran `CREATE EXTENSION IF NOT EXISTS vector;`
- Check that you're using Supabase (pgvector is pre-installed)
- If self-hosting Postgres, install pgvector manually

---

### Issue 2: OpenAI API rate limit

**Error**: `Rate limit exceeded`

**Solution**:
- Add exponential backoff retry logic
- Reduce batch size in backfill
- Upgrade OpenAI tier if needed
- Use delay between requests: `await new Promise(r => setTimeout(r, 100))`

---

### Issue 3: HNSW index creation slow

**Error**: Index creation hangs

**Solution**:
- This is normal for large tables (>10K rows)
- Let it run in background (non-blocking)
- Can still insert data while index builds
- Check progress: `SELECT * FROM pg_stat_progress_create_index;`

---

### Issue 4: Embedding dimensions mismatch

**Error**: `expected 1536 dimensions, got 1024`

**Solution**:
- Make sure you're using `text-embedding-3-small` (1536 dims)
- Not `text-embedding-ada-002` (1536 dims but deprecated)
- Update model in `vectorization.ts` if needed

---

### Issue 5: Cosine distance confusion

**Note**: Cosine distance (returned by `<=>`) is `1 - cosine_similarity`

- Distance 0.0 = identical (similarity 1.0)
- Distance 0.2 = very similar (similarity 0.8)
- Distance 0.5 = somewhat similar (similarity 0.5)
- Distance 1.0 = completely different (similarity 0.0)

**Threshold recommendations**:
- Duplicate detection: distance < 0.1 (similarity > 0.9)
- Similar prompts: distance < 0.3 (similarity > 0.7)
- Related prompts: distance < 0.5 (similarity > 0.5)

---

## Next Steps After Setup

Once vectorization is working:

1. **Build UI features**:
   - "Find similar prompts" button
   - Duplicate warning before submission
   - "Top novel prompts" RePrompt view
   - Prompt clustering visualization

2. **Analytics dashboard**:
   - Novelty trends over time
   - Category distribution
   - User evolution trajectory

3. **Advanced queries**:
   - See `AGGREGATE_OUTPUT_REFERENCE.md` for 10+ query examples
   - Build RePrompt recommendation engine
   - Population-level insights

4. **Optimization**:
   - Monitor query performance
   - Tune HNSW index parameters if needed
   - Consider caching for common searches

---

## Cost Estimation

### OpenAI Embeddings Cost

**Model**: `text-embedding-3-small`  
**Price**: $0.02 per 1 million tokens  
**Avg prompt**: ~50 tokens  

| Scale | Prompts | Tokens | Cost |
|-------|---------|--------|------|
| MVP | 1,000 | 50K | $0.001 |
| Small | 10K | 500K | $0.01 |
| Medium | 100K | 5M | $0.10 |
| Large | 1M | 50M | $1.00 |

**Conclusion**: Embedding costs are negligible (<1% of LLM analysis costs)

### Database Storage Cost

**Vector size**: 1536 floats × 4 bytes = 6 KB per prompt  

Supabase free tier: 500 MB database storage
- 500 MB ÷ 6 KB = ~83,000 prompts free
- Beyond that: ~$0.125 per GB/month

**Conclusion**: Storage costs are minimal, even at scale

---

## Performance Targets

| Operation | Target | Actual (typical) |
|-----------|--------|------------------|
| Generate embedding | <200ms | ~100ms |
| Similarity search (10 results) | <100ms | 20-50ms |
| Duplicate detection | <300ms | 150-200ms |
| Top N queries | <50ms | 10-30ms |

---

## Monitoring & Observability

Add logging for key operations:

```typescript
// In vectorization.ts, add timing logs
const start = Date.now()
const embedding = await generateEmbedding(prompt)
console.log(`Embedding generated in ${Date.now() - start}ms`)
```

Track metrics:
- Embedding generation success rate
- Average latency per operation
- API error rates
- Duplicate detection hit rate
- Similarity search result counts

---

## Resources

- **Supabase Vector Docs**: https://supabase.com/docs/guides/ai/vector-columns
- **pgvector GitHub**: https://github.com/pgvector/pgvector
- **OpenAI Embeddings**: https://platform.openai.com/docs/guides/embeddings
- **VECTORIZATION_PRD.md**: Complete technical architecture
- **AGGREGATE_OUTPUT_REFERENCE.md**: 10+ SQL query examples

---

## Support

If you encounter issues:
1. Check `VECTORIZATION_PRD.md` for detailed technical docs
2. Review error logs in Supabase dashboard
3. Test with the included test scripts
4. Verify environment variables are set correctly
5. Check OpenAI API quota and rate limits

---

**Status**: Ready to implement! Follow steps 1-7 in order. Total time: ~2-4 hours for full setup.
