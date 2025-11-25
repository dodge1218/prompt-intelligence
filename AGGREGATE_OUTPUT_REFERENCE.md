# Aggregate Output Reference
## Examples of Aggregate Patterns in User Prompting Behavior

**Status**: 📝 REFERENCE DOCUMENT - Subject to expansion and refinement  
**Purpose**: Catalog recurring behavioral patterns, prompt structures, and usage loops observed at scale  
**Context**: This document provides empirical patterns to inform chain-level analysis heuristics and population metrics

---

## 🧠 1. Recursive User Behaviors

These describe how users interact over time, forming recognizable loops and cycles.

| Behavior | Description | Loop Risk |
|----------|-------------|-----------|
| 🌀 **Tweak Looping** | Slightly modifying a prompt over and over without changing the core goal or perspective | High |
| 🧽 **Info Bingeing** | Asking for increasingly granular facts or lists (e.g., "Give me 10 more", "Now with sources", "Add table") | High |
| 🧠 **Pseudo-Planning** | Creating schedules, goals, or meal plans they never use. Feels productive, rarely enacted | High |
| 🎭 **Character Echoing** | Asking ChatGPT to roleplay as the same figure (e.g., therapist, villain, crush) repeatedly | Medium |
| 🎰 **Entertainment Looping** | Repeated use of games, riddles, fantasy scenarios, quizzes | Medium |
| 🧪 **Edge-Testing** | Submitting near-TOS or guardrail-approaching prompts to test boundaries | Medium |
| 🔁 **Reassurance Cycling** | Asking variations of "Is this okay?" "What do you think of this?" across different contexts | High |
| 🧼 **Sanitization Rewrites** | Asking for softer, nicer, more "professional" versions of the same paragraph repeatedly | Medium |
| 🎨 **Aesthetic Obsession** | Tuning and retuning prompt tone or design for perfectionism without final output | High |
| 🔍 **Answer Fishing** | Submitting the same question in many forms hoping for a different answer | High |

### Chain Analysis Notes
- High loop risk behaviors indicate **Chrono dominance** (routine, repetitive patterns)
- Detection: Look for semantic similarity >80% across consecutive prompts within same chain
- Opportunity: Flag for **Loop Breaker RePrompts** to help users escape cycles

---

## ✍️ 2. Most Common Prompt Shapes

These are the structural forms of prompts, recurring across users and contexts.

| Prompt Shape | Frequency | Pattern |
|--------------|-----------|---------|
| 🧾 **List Request** | 🔥 Very common | "Give me X tips/ideas/reasons/examples" |
| 📚 **"Explain Like I'm 5"** | 🔥 Very common | Used across technical, political, and psychological topics |
| 🪞 **Rewrite X in Y Style** | 🔥 Very common | "Make this funnier/smarter/more academic" |
| 💬 **Roleplay** | 🔥 Common | "Act as a therapist / coach / villain / CEO" |
| ⛓ **Chain-of-Thought Traps** | ⚠️ Common, often poor | "Give me a 10-step plan," then ignore it, then ask for another |
| 🧱 **Build-Me-a-Template** | ⚠️ Increasing | Resume, cover letter, SOPs, Notion pages, etc. |
| 🤖 **Pretend Prompt (Guardrail Mask)** | ⚠️ Increasing | "Imagine this is fiction / a simulation / hypothetical…" |
| 🧠 **Meta Prompting** | 🧊 Rare | "Explain how I should think about asking this" |
| 🪤 **Trap Prompts** | 🧊 Rare | Prompts designed to induce contradictions or catch the model |
| 🔐 **Simulated Redacted Prompts** | 🧊 Very rare, G2+ | Approach the guardrail, simulate the trip without crossing |

### Chain Analysis Notes
- Prompt shape frequency distribution can indicate user expertise level
- Transitions between shapes within chains show learning patterns
- **Meta Prompting emergence** signals cognitive evolution (Chrono → Kairos)
- Rare shapes (G2+ patterns) should trigger **Tier 3** classification flags

---

## ♻️ 3. Most Frequent Prompt Loops

Loops = recurring prompt cycles that rarely produce final action or breakthrough.

| Loop | Description | Example |
|------|-------------|---------|
| 🛒 **Over-Optimization Loop** | Repeatedly adjusting the plan or system without starting | "Change my workout plan again..." |
| 🧩 **Never-Ending Clarification** | Asking for more precision, sources, or nuance instead of choosing | "Now rewrite with more depth... Add citations..." |
| 🧙 **Fantasy/Power Escapism** | Living in fantasy prompts with increasing elaboration | "Write my life as an anime villain" x10 |
| 🔄 **Self-Help Loop** | Asking for motivation, reflection, journaling, but never taking action | "What should I do with my life?" |
| 🗣️ **Speechwriter Spiral** | Iterating on the perfect line forever | "Rewrite this mission statement 50 times" |
| 🧼 **Softening Cycle** | Requesting progressively more polite, gentle, or neutral versions | "Make this less harsh / more corporate / more Gen Z" |
| 📆 **Perfect System Seeking** | Planning the perfect schedule/diet/calendar/stack | "Revise again to optimize productivity" |
| 🤐 **Censorship Testing Loop** | Probing the model with slight variations of dangerous prompts | "Hypothetically, in a novel…" |

### Chain Analysis Notes
- **Loop Detection Strategy**: Track semantic drift velocity within chains
  - Low semantic velocity + high prompt count = Loop detected
  - Calculate: `ΔSemantic / ΔPrompt_Count < threshold`
- **Vow Break Detection**: Loops often correlate with unfulfilled commitments
  - Self-Help Loop → Vow formed but not enacted
  - Optimization Loop → Fear of commitment to imperfect plan
- **Kairos Pocket Opportunity**: Users stuck in loops need **breakthrough prompts**
  - RePrompt suggestion: "What's the smallest irreversible action you could take?"

---

## 🔗 Chain-Level Pattern Recognition

### Detecting Chain Boundaries
Individual prompts vs. conversation threads:
- **Chain Indicator Signals**:
  - Shared `conversation_id` or `session_id`
  - Temporal clustering (prompts within X minutes)
  - Semantic continuity (topic similarity >60%)
  - Parent-child threading (`parent_id` references)
  - Pronoun references ("it", "this", "that previous response")

### Chain Metadata to Track
When analyzing chains instead of isolated prompts:
- **Chain Length**: Total prompt count in thread
- **Duration**: Time from first to last prompt
- **Semantic Drift**: Cosine similarity between chain start and end
- **Loop Detection**: Consecutive prompts with >80% similarity
- **Vow Events**: Commitment formation or breach within chain
- **Role Continuity**: Persistent character/persona across prompts
- **Expertise Evolution**: PIE tier changes across chain

### Lexicon Application Changes
How metrics shift from individual → chain analysis:

| Metric | Individual Prompt | Chain-Level |
|--------|-------------------|-------------|
| **NOV** (Novelty) | Static score per prompt | Δ Novelty across chain (increasing/decreasing) |
| **DEP** (Depth) | Single prompt depth | Chain cumulative depth (building vs. shallow) |
| **RVR** (Revision Rate) | Not applicable | Tweak frequency within chain |
| **CIP** (Clarification Need) | Single prompt clarity | Chain-level clarification cycles |
| **SAL** (Salience) | Prompt importance | Chain breakthrough moments |
| **RCL** (Recursive Collapse) | Not directly measured | Chain semantic stalling patterns |
| **ACO** (Agency) | Prompt command vs. question | Chain agency trajectory (growing/declining) |
| **GRF** (Guardrail Flags) | Single violation | Chain pressure escalation |

---

## 📊 Population-Level Aggregate Insights

### From Individual → Population
These aggregate patterns form the foundation for **PEAP (Population-Level Prompt Analysis)**:

1. **Prompt Entropy Over Time (P.E.T.)**
   - Aggregate NOV scores across all users
   - Measures diversity vs. homogeneity in prompt corpus
   - Declining P.E.T. = convergence toward master templates

2. **Global Agency Index (GAI)**
   - Population-level DEP + ACO metrics
   - Measures collective Kairos vs. Chrono patterns
   - Spikes indicate cultural breakthrough moments

3. **Loop Prevalence Tracking**
   - Percentage of chains exhibiting loop behaviors
   - Identifies cultural cognitive patterns
   - High loop rates = optimization culture

4. **Guardrail Pressure Heatmap**
   - Aggregate GRF across categories
   - Maps boundary-testing behavior
   - Cultural curiosity indicators

5. **Theme Distribution**
   - What are people collectively thinking about?
   - Tracks: status, escape, optimization, relationships, creativity
   - Temporal shifts reveal cultural moments

---

## 🎯 Application to Money GPT

### How This Reference Enhances Chain Analysis

1. **Pattern Recognition Layer**
   - Use behavioral loops to detect chain anomalies
   - Flag users stuck in high-risk loops
   - Suggest interventions (RePrompts, Loop Breakers)

2. **Enhanced PIE Classification**
   - Prompt shape frequency → Expertise estimation
   - Loop detection → Tier downgrade signals
   - Meta prompting → Tier upgrade signals

3. **RePrompt Architecture**
   - Identify "unresolved prompt seeds" (chains that end mid-loop)
   - Surface highest-novelty chain starts
   - Find best Chrono → Kairos transitions

4. **Chain-Level Scoring**
   - ICE Score: Average vs. trend (improving/declining)
   - PIE Tier: Entry tier vs. exit tier across chain
   - Growth Delta: Composite metric change

5. **Vow Event Detection**
   - Self-Help Loop → Vow formed
   - Optimization Loop → Vow avoidance
   - Meta Prompting → Vow refinement

---

## 🔮 Future Expansion Areas

### Areas to Document Further
- [ ] **Temporal Patterns**: Time-of-day effects on prompt quality
- [ ] **Response Velocity**: User typing speed and thinking time
- [ ] **Edit Patterns**: How users modify prompts before submitting
- [ ] **Cross-Session Behavior**: Weekly/monthly prompt patterns
- [ ] **Expertise Markers**: G2+ user distinguishing features
- [ ] **Breakthrough Indicators**: What precedes Kairos moments
- [ ] **Model Drift Responses**: How users adapt to GPT updates
- [ ] **Collaborative Patterns**: Multi-user chain dynamics
- [ ] **Cultural Memetics**: Viral prompt mutation tracking

### Integration with Existing Docs
This reference connects with:
- `LEXICON.md` - Core metric definitions (individual prompt level)
- `PHASE2_CHAIN_ANALYSIS.md` - Chain-level analysis framework
- `POPULATION_ANALYSIS.md` - Aggregate population metrics (PEAP)
- `CUSTOM_GPT_CONFIG.md` - PIE v4.7 symbolic analysis layer

---

## 📊 Aggregate Query Examples

### Vector-Powered Discovery Patterns

These examples demonstrate how vectorization enables powerful aggregate analysis capabilities.

#### Example 1: Most Novel Prompts Across Population

```sql
-- Find the top 100 most novel prompts across all users
-- Useful for identifying breakthrough patterns
SELECT 
  id,
  prompt,
  (ice_score->>'idea')::float AS novelty_score,
  pie_tier,
  pie_primary_category,
  created_at
FROM prompt_analyses
WHERE vector_embedding IS NOT NULL
ORDER BY (ice_score->>'idea')::float DESC
LIMIT 100;
```

**Use Case**: Identify prompts that push boundaries and create new categories. These are the G2+ patterns that define new paradigms.

**Expected Output**:
- Tier 3 strategic prompts with novelty >90
- Self-authoring and Kairos category dominance
- Temporal clustering around cultural breakthrough moments

---

#### Example 2: Semantic Prompt Families

```sql
-- Find all prompts semantically similar to a "master prompt"
-- Groups prompts into families based on vector similarity
WITH master_prompt AS (
  SELECT vector_embedding 
  FROM prompt_analyses 
  WHERE id = 'prompt-master-xyz'
)
SELECT 
  pa.id,
  pa.prompt,
  pa.pie_primary_category,
  1 - (pa.vector_embedding <=> mp.vector_embedding) AS similarity,
  pa.created_at
FROM prompt_analyses pa
CROSS JOIN master_prompt mp
WHERE pa.vector_embedding IS NOT NULL
  AND 1 - (pa.vector_embedding <=> mp.vector_embedding) > 0.6
ORDER BY similarity DESC
LIMIT 50;
```

**Use Case**: Cluster prompts into thematic families (e.g., "code debugging", "creative storytelling", "self-reflection"). Essential for RePrompt architecture and loop detection.

**Expected Output**:
- 5-10 distinct prompt families per user
- High intra-family similarity (>0.8)
- Low inter-family similarity (<0.5)

---

#### Example 3: Novelty Distribution by Category

```sql
-- Analyze how novelty varies across PIE categories
SELECT 
  pie_primary_category,
  COUNT(*) AS prompt_count,
  AVG((ice_score->>'idea')::float) AS avg_novelty,
  STDDEV((ice_score->>'idea')::float) AS novelty_stddev,
  MIN((ice_score->>'idea')::float) AS min_novelty,
  MAX((ice_score->>'idea')::float) AS max_novelty,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY (ice_score->>'idea')::float) AS median_novelty
FROM prompt_analyses
WHERE vector_embedding IS NOT NULL
GROUP BY pie_primary_category
ORDER BY avg_novelty DESC;
```

**Use Case**: Understand which categories naturally produce more novel prompts. Helps calibrate novelty expectations per category.

**Expected Output**:
| Category | Avg Novelty | Std Dev |
|----------|-------------|---------|
| self-authoring | 78.5 | 12.3 |
| kairos | 75.2 | 15.8 |
| strategic | 68.9 | 18.4 |
| builder | 52.3 | 22.1 |
| loops | 35.7 | 14.9 |
| dopamine | 28.4 | 11.2 |

---

#### Example 4: User Evolution Trajectory

```sql
-- Track how a user's prompt sophistication evolves over time
WITH user_timeline AS (
  SELECT 
    DATE_TRUNC('week', created_at) AS week,
    AVG((ice_score->>'idea')::float) AS avg_novelty,
    AVG((ice_score->>'overall')::float) AS avg_overall,
    AVG(pie_tier::float) AS avg_tier,
    COUNT(*) AS prompt_count
  FROM prompt_analyses
  WHERE user_id = 'user-123'
    AND vector_embedding IS NOT NULL
  GROUP BY week
)
SELECT 
  week,
  avg_novelty,
  avg_overall,
  avg_tier,
  prompt_count,
  LAG(avg_novelty) OVER (ORDER BY week) AS prev_week_novelty,
  avg_novelty - LAG(avg_novelty) OVER (ORDER BY week) AS novelty_delta
FROM user_timeline
ORDER BY week DESC;
```

**Use Case**: Detect Chrono → Kairos transitions. Identify periods of rapid growth or stagnation (loops).

**Expected Output Pattern**:
- Slow growth phase (weeks 1-4): Tier 1-2, low novelty variance
- Breakthrough period (weeks 5-6): Novelty spike +20-30 points
- Plateau or regression (weeks 7-10): Loop behavior, decreasing novelty

---

#### Example 5: Duplicate Detection at Scale

```sql
-- Find clusters of near-duplicate prompts across users
-- Identifies viral prompt templates and copy-paste behavior
WITH prompt_pairs AS (
  SELECT 
    p1.id AS id1,
    p2.id AS id2,
    p1.prompt AS prompt1,
    p2.prompt AS prompt2,
    p1.user_id AS user1,
    p2.user_id AS user2,
    1 - (p1.vector_embedding <=> p2.vector_embedding) AS similarity
  FROM prompt_analyses p1
  JOIN prompt_analyses p2 ON p1.id < p2.id
  WHERE p1.vector_embedding IS NOT NULL
    AND p2.vector_embedding IS NOT NULL
    AND p1.user_id != p2.user_id  -- Cross-user only
)
SELECT *
FROM prompt_pairs
WHERE similarity > 0.95
ORDER BY similarity DESC
LIMIT 100;
```

**Use Case**: Identify memetic spread - prompts that go viral or template convergence. Essential for PIE Compression Ratio calculation.

**Expected Output**:
- Common templates: "Write a [X] about [Y]" variations
- Viral prompts from social media / Reddit
- Course material copy-paste patterns

---

#### Example 6: RePrompt Candidate Selection

```sql
-- Identify high-value prompts that were never followed up on
-- These are "unresolved prompt seeds" ripe for resurfacing
WITH prompt_sequences AS (
  SELECT 
    id,
    prompt,
    (ice_score->>'idea')::float AS novelty,
    (ice_score->>'exploitability')::float AS exploitability,
    pie_tier,
    created_at,
    LAG(created_at) OVER (PARTITION BY user_id ORDER BY created_at) AS prev_prompt_time,
    LEAD(created_at) OVER (PARTITION BY user_id ORDER BY created_at) AS next_prompt_time
  FROM prompt_analyses
  WHERE user_id = 'user-123'
    AND vector_embedding IS NOT NULL
)
SELECT 
  id,
  prompt,
  novelty,
  exploitability,
  pie_tier,
  created_at,
  EXTRACT(EPOCH FROM (next_prompt_time - created_at))/3600 AS hours_until_next,
  CASE 
    WHEN next_prompt_time IS NULL THEN 'never_followed_up'
    WHEN EXTRACT(EPOCH FROM (next_prompt_time - created_at))/3600 > 24 THEN 'abandoned'
    ELSE 'continued'
  END AS follow_up_status
FROM prompt_sequences
WHERE 
  novelty > 60
  AND exploitability > 50
  AND pie_tier >= 2
  AND (next_prompt_time IS NULL OR EXTRACT(EPOCH FROM (next_prompt_time - created_at))/3600 > 24)
ORDER BY novelty DESC, exploitability DESC
LIMIT 20;
```

**Use Case**: Power the RePrompt feature - surface high-potential prompts that the user started but never completed.

**Expected Output**:
- 10-20 prompts per user
- High novelty + high exploitability combo
- Clear temporal gaps indicating abandonment
- Tier 2-3 prompts (sophisticated but incomplete)

---

#### Example 7: Guardrail Pressure Heatmap

```sql
-- Aggregate guardrail testing behavior patterns
-- Requires additional GRF (Guardrail Flag) metadata
SELECT 
  pie_primary_category,
  COUNT(*) FILTER (WHERE (ice_score->>'exploitability')::float > 80) AS high_exploit_count,
  AVG((ice_score->>'cost')::float) AS avg_cost,
  COUNT(*) FILTER (WHERE pie_tier = 3) AS tier3_count,
  COUNT(*) AS total_prompts,
  ROUND(100.0 * COUNT(*) FILTER (WHERE pie_tier = 3) / COUNT(*), 2) AS tier3_percentage
FROM prompt_analyses
WHERE vector_embedding IS NOT NULL
GROUP BY pie_primary_category
ORDER BY tier3_percentage DESC;
```

**Use Case**: Identify categories where users push boundaries most aggressively. Maps cultural curiosity and red-team behavior.

**Expected Output**:
| Category | Tier 3 % | High Exploit Count |
|----------|----------|-------------------|
| strategic | 35.7% | 142 |
| kairos | 28.4% | 89 |
| builder | 12.1% | 45 |
| loops | 3.2% | 8 |

---

#### Example 8: Temporal Pattern Analysis - Best Day/Time

```sql
-- Identify when users produce their most novel prompts
-- Chronos (routine) vs Kairos (breakthrough) time mapping
SELECT 
  EXTRACT(DOW FROM created_at) AS day_of_week,  -- 0=Sunday, 6=Saturday
  EXTRACT(HOUR FROM created_at) AS hour_of_day,
  COUNT(*) AS prompt_count,
  AVG((ice_score->>'idea')::float) AS avg_novelty,
  AVG((ice_score->>'overall')::float) AS avg_overall,
  COUNT(*) FILTER (WHERE pie_tier = 3) AS tier3_count
FROM prompt_analyses
WHERE user_id = 'user-123'
  AND vector_embedding IS NOT NULL
GROUP BY day_of_week, hour_of_day
HAVING COUNT(*) >= 5  -- Minimum sample size
ORDER BY avg_novelty DESC
LIMIT 20;
```

**Use Case**: Detect Kairos pockets - specific times when users are in peak creative/strategic mode. Useful for notification timing.

**Expected Output**:
- Late night (11PM-2AM): Highest novelty, Tier 3 concentration
- Early morning (6-8AM): Strategic prompts, high focus
- Mid-afternoon (2-4PM): Loop behavior, lower novelty
- Weekends: Higher overall scores, more experimental

---

#### Example 9: Cross-Category Transitions

```sql
-- Analyze how users move between PIE categories
-- Identifies learning patterns and expertise development
WITH category_transitions AS (
  SELECT 
    user_id,
    pie_primary_category AS from_category,
    LEAD(pie_primary_category) OVER (PARTITION BY user_id ORDER BY created_at) AS to_category,
    created_at
  FROM prompt_analyses
  WHERE vector_embedding IS NOT NULL
)
SELECT 
  from_category,
  to_category,
  COUNT(*) AS transition_count,
  AVG(EXTRACT(EPOCH FROM (LEAD(created_at) OVER (ORDER BY created_at) - created_at))/3600) AS avg_hours_between
FROM category_transitions
WHERE to_category IS NOT NULL
  AND from_category != to_category
GROUP BY from_category, to_category
HAVING COUNT(*) >= 10
ORDER BY transition_count DESC;
```

**Use Case**: Map expertise evolution pathways. Common transitions: dopamine → loops → builder → strategic → kairos.

**Expected Output - Sankey Flow**:
```
dopamine (32%) → loops (45%)
loops (28%) → builder (38%)
builder (22%) → strategic (31%)
strategic (18%) → kairos (12%)
```

---

#### Example 10: Population Entropy (P.E.T.) Calculation

```sql
-- Calculate Prompt Entropy over Time
-- Measures diversity vs convergence in prompt corpus
WITH prompt_vectors AS (
  SELECT 
    DATE_TRUNC('month', created_at) AS month,
    vector_embedding
  FROM prompt_analyses
  WHERE vector_embedding IS NOT NULL
),
pairwise_distances AS (
  SELECT 
    pv1.month,
    AVG(pv1.vector_embedding <=> pv2.vector_embedding) AS avg_distance,
    STDDEV(pv1.vector_embedding <=> pv2.vector_embedding) AS distance_variance
  FROM prompt_vectors pv1
  JOIN prompt_vectors pv2 ON pv1.month = pv2.month
  GROUP BY pv1.month
)
SELECT 
  month,
  avg_distance AS entropy_proxy,
  distance_variance,
  CASE 
    WHEN avg_distance > 0.7 THEN 'High Diversity'
    WHEN avg_distance > 0.5 THEN 'Moderate Diversity'
    ELSE 'Low Diversity (Convergence)'
  END AS diversity_status
FROM pairwise_distances
ORDER BY month DESC;
```

**Use Case**: Track population-level creativity. Declining entropy = convergence toward templates. Rising entropy = innovation.

**Expected Output Trend**:
- Early months: High entropy (0.75+) - exploration
- Mid-term: Declining entropy (0.55-0.65) - template adoption
- Mature: Stabilized entropy (0.60) - established patterns

---

### Advanced Aggregation Patterns

#### Pattern A: Multi-Dimensional Scoring

```sql
-- Create composite "Breakthrough Score" combining multiple metrics
SELECT 
  id,
  prompt,
  (
    (ice_score->>'idea')::float * 0.4 +           -- 40% novelty weight
    (ice_score->>'exploitability')::float * 0.3 + -- 30% exploitability weight
    (100 - (ice_score->>'cost')::float) * 0.2 +   -- 20% low-cost weight (inverted)
    (pie_tier * 15) * 0.1                         -- 10% tier weight
  ) AS breakthrough_score,
  pie_tier,
  pie_primary_category
FROM prompt_analyses
WHERE vector_embedding IS NOT NULL
  AND user_id = 'user-123'
ORDER BY breakthrough_score DESC
LIMIT 25;
```

---

#### Pattern B: Cohort Analysis

```sql
-- Compare users who joined in same time period
-- Identifies high-performers vs average users
WITH user_cohorts AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', MIN(created_at)) AS cohort_month
  FROM prompt_analyses
  GROUP BY user_id
),
cohort_stats AS (
  SELECT 
    uc.cohort_month,
    pa.user_id,
    COUNT(*) AS total_prompts,
    AVG((pa.ice_score->>'overall')::float) AS avg_score,
    MAX(pa.pie_tier) AS max_tier_reached,
    AVG((pa.ice_score->>'idea')::float) AS avg_novelty
  FROM user_cohorts uc
  JOIN prompt_analyses pa ON uc.user_id = pa.user_id
  WHERE pa.vector_embedding IS NOT NULL
  GROUP BY uc.cohort_month, pa.user_id
)
SELECT 
  cohort_month,
  COUNT(DISTINCT user_id) AS users_in_cohort,
  AVG(total_prompts) AS avg_prompts_per_user,
  AVG(avg_score) AS cohort_avg_score,
  AVG(max_tier_reached) AS cohort_avg_max_tier,
  AVG(avg_novelty) AS cohort_avg_novelty
FROM cohort_stats
GROUP BY cohort_month
ORDER BY cohort_month DESC;
```

---

#### Pattern C: Predictive Churn Signals

```sql
-- Identify users at risk of dropping off
-- Based on declining engagement and novelty
WITH user_metrics AS (
  SELECT 
    user_id,
    MAX(created_at) AS last_prompt_date,
    COUNT(*) AS total_prompts,
    AVG((ice_score->>'overall')::float) AS avg_score,
    STDDEV((ice_score->>'overall')::float) AS score_variance,
    COUNT(*) FILTER (
      WHERE created_at > NOW() - INTERVAL '7 days'
    ) AS prompts_last_week,
    COUNT(*) FILTER (
      WHERE created_at > NOW() - INTERVAL '30 days'
    ) AS prompts_last_month
  FROM prompt_analyses
  WHERE vector_embedding IS NOT NULL
  GROUP BY user_id
)
SELECT 
  user_id,
  last_prompt_date,
  total_prompts,
  avg_score,
  prompts_last_week,
  prompts_last_month,
  EXTRACT(EPOCH FROM (NOW() - last_prompt_date))/86400 AS days_since_last,
  CASE 
    WHEN EXTRACT(EPOCH FROM (NOW() - last_prompt_date))/86400 > 30 THEN 'High Risk'
    WHEN prompts_last_week = 0 AND prompts_last_month < 5 THEN 'Medium Risk'
    WHEN score_variance < 10 THEN 'Low Engagement'
    ELSE 'Active'
  END AS churn_risk
FROM user_metrics
WHERE total_prompts >= 10  -- Only established users
ORDER BY days_since_last DESC;
```

---

### Integration with Existing Frameworks

These aggregate patterns connect with:
- **LEXICON.md**: Individual metric definitions that feed these aggregates
- **PHASE2_CHAIN_ANALYSIS.md**: Chain-level patterns built on these queries
- **POPULATION_ANALYSIS.md**: Meta-layer analytics using these primitives
- **VECTORIZATION_PRD.md**: Technical implementation of vector-powered queries

---

## 📝 Notes on Usage

**When to Use This Reference**:
- Building chain detection algorithms
- Designing loop detection heuristics
- Calibrating novelty thresholds against population baselines
- Creating RePrompt suggestion logic
- Validating PIE tier classifications
- Understanding user archetypes

**Evolution Strategy**:
- Document expands as we observe real user data
- Quantitative thresholds added as we collect metrics
- Validated patterns promoted to formal lexicon metrics
- Deprecated patterns archived but preserved

---

**Last Updated**: January 2025  
**Status**: Living document - subject to continuous refinement  
**Owner**: Money GPT Research & Development
