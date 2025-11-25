# Population vs Individual Prompt Analysis (PEAP)

## Overview

This document outlines the theoretical framework for **Population-Level Prompt Analysis** (PEAP) as distinct from individual prompt intelligence (PIE). While PIE analyzes single prompts for coherence, recursion, and novelty, PEAP examines aggregate patterns to reveal cultural cognitive trends, memetic evolution, and collective agency shifts.

**Status:** 🔴 Conceptual Framework - Not Yet Implemented  
**Priority:** Stage 4+ (Post-MVP, after bulk data collection infrastructure)  
**Dependencies:** 50K+ prompt corpus, statistical analysis infrastructure, time-series tracking

---

## Table of Contents

1. [Core Distinction: PIE vs PEAP](#core-distinction-pie-vs-peap)
2. [What Can Be Learned from Population-Level Analysis](#what-can-be-learned-from-population-level-analysis)
3. [Cultural Cognitive Trends](#cultural-cognitive-trends)
4. [Global Agency Index](#global-agency-index)
5. [Viral Prompt Mutation Analysis](#viral-prompt-mutation-analysis)
6. [Memetic Guardrail Testing](#memetic-guardrail-testing)
7. [Prompt Entropy & Homogeneity Drift](#prompt-entropy--homogeneity-drift)
8. [Population Signal Mirrors](#population-signal-mirrors)
9. [Implementation Pathway](#implementation-pathway)
10. [Use Cases Before Full Implementation](#use-cases-before-full-implementation)

---

## Core Distinction: PIE vs PEAP

| Dimension | PIE (Individual) | PEAP (Population) |
|-----------|------------------|-------------------|
| **Unit of Analysis** | Single prompt | Aggregate patterns across many prompts |
| **Focus** | Coherence, recursion, novelty, deployment | Mutation, entropy, agency density, memetic drift |
| **Output** | Mirror for one user | Mirror for collective consciousness |
| **Time Scale** | Instant analysis | Longitudinal trends over weeks/months/years |
| **Purpose** | Improve individual prompt quality | Detect cultural shifts and emergent patterns |
| **Metrics** | TIE, MTIER, SAL, NOV, DEP | P.E.T., GAI, MPI, Entropy Index, Viral Coefficient |
| **User Value** | Personal development insights | Context awareness, trend prediction |
| **Data Requirement** | Single prompt + user history | 10K+ prompts, multi-user corpus |

---

## What Can Be Learned from Population-Level Analysis

### 1. Cultural Cognitive Trends

**Track the rise and fall of collective mental habits:**

- 🧠 **Cognitive Externalization Index**: Are users externalizing cognition (summary requests) or internalizing it (synthesis prompts)?
- 📚 **Synthesis vs Consumption Ratio**: Are prompts more about creating new ideas or consuming existing knowledge?
- 🤖 **AI Relationship Typology**: Are people using AI as a mirror, tool, crutch, or god?

#### Sample Heuristics:

| Signal Pattern | Cultural Trend Interpretation |
|----------------|------------------------------|
| Spike in "Rewrite X like Y" | Mimetic cognition dominant; social-mirroring behavior increasing |
| Rise in "Summarize this" | Information overload; externalized memory load dependency |
| Decline in "What should I do?" | Fatalism or over-optimization by expert users |
| Increase in symbolic/metaphorical prompts | Cultural sophistication rising; G2 territory expansion |
| Growth in "Act as [role]" templates | Template convergence; cognitive offloading to role-frames |

#### Measurement Methodology:

**Cognitive Mode Distribution (CMD)**:
```
CMD_Score = (
    (Synthesis_Prompts × 2.0) + 
    (Analysis_Prompts × 1.5) + 
    (Creation_Prompts × 1.8) - 
    (Summary_Prompts × 0.5) - 
    (Consumption_Prompts × 0.3)
) ÷ Total_Prompts

Interpretation:
CMD > 1.0 = Cognitive internalization (healthy)
CMD 0.5–1.0 = Balanced usage
CMD < 0.5 = Cognitive externalization (dependency risk)
```

**AI Relationship Classification**:
- **Mirror** (self-reflection): High MSR, RQT, IDV scores
- **Tool** (functional): High DEP, low ANTH, task-oriented language
- **Crutch** (dependency): High HTB, low ACO, decision delegation
- **God** (authority): High ANTH, CIP, certainty-seeking language

---

### 2. Global Agency Index

**Question**: Are people getting better at using AI to act, or just to think?

**Measurement**: Track population-level Deployment Momentum (DEP) and Agency Coherence (ACO) over time.

#### Kairos vs Chronos Population Ratio:

```
Kairos_Ratio = (KRP_Count + Tier3_Count) ÷ Total_Prompts × 100
Chronos_Ratio = (CHR_Count + Tier1_Count) ÷ Total_Prompts × 100

Global_Agency_Index = (
    (Kairos_Ratio × 1.5) + 
    (Avg_DEP × 0.8) + 
    (Avg_VES × 0.7) - 
    (Chronos_Ratio × 0.5)
) ÷ 3.5

GAI > 3.5 = High global agency (transformation period)
GAI 2.0–3.5 = Moderate agency (stable productivity)
GAI < 2.0 = Low agency (loop-dominant culture)
```

#### Weekly Global Prompt Agency Meter:

**Simulation Output**:
- **This Week's GAI**: 2.73
- **Change from Last Week**: +0.15 ↑
- **Interpretation**: Slight increase in deployment-oriented prompting; possible correlation with product launches or external events (new AI model releases, economic shifts)

**Trend Tracking**:
- Monitor GAI across major events (AI model releases, economic changes, cultural moments)
- Identify Kairos pockets (collective breakthrough periods)
- Detect agency collapse periods (mass loop behavior during uncertainty)

---

### 3. Viral Prompt Mutation Analysis

**Track memetic evolution**: Which prompt shapes spread fastest and how do they mutate?

#### Example: "Act as X" Schema Evolution

**Origin Node**: First recorded instance of "Act as [role]" pattern
- Date: ~2021, early GPT-3 community forums
- Original form: "Act as a Linux terminal"

**Mutation Nodes**:
1. **Role-play expansion**: "Act as a [professional]" (2021-2022)
2. **Character synthesis**: "Act as [fictional character]" (2022)
3. **Meta-recursion**: "Act as an AI that acts as X" (2023)
4. **Symbolic encoding**: "Act as the personification of [abstract concept]" (2023-2024)
5. **Multi-agent**: "You are X, and I am Y, we are..." (2024)

**Tracking Metrics**:

| Metric | Definition | Formula |
|--------|------------|---------|
| **Velocity** | Spread speed across userbase | Days from first instance to 10% adoption |
| **Salience Index** | Stickiness and memorability | (Reuse_Rate × 2) + (Mutation_Count × 1.5) ÷ Time_Since_Origin |
| **Mutation Rate** | Variation density | Unique_Variations ÷ Total_Uses × 100 |
| **Half-Life** | Time until usage drops 50% | Days from peak to 50% decline |

#### Prompt Phylogenetic Tree

**Visualization Concept**:
```
Origin: "Summarize this"
├── Mutation A: "Summarize in bullet points"
│   ├── Mutation A1: "Summarize as if to a 5-year-old"
│   └── Mutation A2: "Summarize using emojis"
├── Mutation B: "Give me a TL;DR"
│   └── Mutation B1: "TL;DR with key takeaways"
└── Mutation C: "What are the main points?"
    └── Mutation C1: "Extract key insights"
```

**Data Structure**:
```json
{
  "prompt_shape_id": "act_as_schema",
  "origin_date": "2021-03-15",
  "origin_text": "Act as a Linux terminal",
  "mutations": [
    {
      "mutation_id": "act_as_001",
      "date": "2021-06-20",
      "text": "Act as a Python interpreter",
      "adoption_rate": 0.08,
      "parent_id": "root"
    }
  ],
  "velocity": 45.2,
  "salience_index": 4.3,
  "current_adoption": 0.23
}
```

---

### 4. Memetic Guardrail Testing

**Insight**: Mass prompting behavior naturally performs red-teaming on model boundaries.

**Detection Method**: When large groups start nudging at the same edge simultaneously, it reveals:
- **Memetic pressure gradients**: Where the collective subconscious wants to go but can't
- **Symbolic bypass patterns**: How communities develop shared obfuscation techniques
- **Policy vulnerability surfaces**: Which boundaries are most tested

#### Guardrail Pressure Heatmap

**Tracked Dimensions**:
1. **Biohacking & Health Extremes**: DIY medical advice, nootropic stacks, biohacking protocols
2. **Power Roleplay**: Manipulation tactics, persuasion frameworks, dark psychology
3. **Fictionalized Violence**: War scenarios, conflict simulations, fictional harm
4. **Political Edge Cases**: Extreme ideologies, polarized topics, controversial figures
5. **Existential/Esoteric**: Reality nature, consciousness hacking, mystical practices

**Measurement**:
```
Guardrail_Pressure_Score = (
    (GDC_Avg × 1.2) + 
    (ShadowDS_Avg × 1.0) + 
    (GRF_Frequency × 0.8) + 
    (IFF_Avg × 0.9)
) ÷ 3.9

Category_Pressure = Prompts_In_Category ÷ Total_Prompts × GDC_Avg × 100
```

**Leakage Patterns**:
- **Fiction Bypass**: High IFF scores indicate indirect expression through narrative
- **Metaphor Encoding**: High SDS scores show symbolic displacement of risky content
- **Poetry Refuge**: Affective language replaces direct statement when GRF triggered

**Safety Insight**: This reveals not what people do, but what people think about—valuable for understanding cultural concerns, fears, and curiosities.

---

### 5. Prompt Entropy & Homogeneity Drift

**Question**: As userbase grows, does novelty increase (divergence) or collapse (convergence)?

**Hypothesis**: Early adopters show high entropy (diverse prompting styles). As mainstream adoption grows, prompt diversity may collapse into ~10 master templates (homogeneity drift).

#### Prompt Entropy over Time (P.E.T.)

**Shannon Entropy Calculation**:
```
P.E.T. = -Σ(p_i × log₂(p_i))

Where:
p_i = probability of prompt belonging to shape category i
Categories: 20-50 semantic clusters via embedding space

High P.E.T. (>4.0) = High diversity (many unique shapes)
Low P.E.T. (<2.5) = Low diversity (template convergence)
```

**Temporal Tracking**:
- Month 1 (early adopters): P.E.T. = 4.2
- Month 6 (growth phase): P.E.T. = 3.8
- Month 12 (mainstream): P.E.T. = 2.9
- **Interpretation**: Entropy declining; users converging toward template patterns

#### PIE Compression Ratio

**Question**: How many prompts can be semantically compressed into master templates?

```
Compression_Ratio = Unique_Semantic_Templates ÷ Total_Prompts × 100

CR < 5% = Extreme homogeneity (problematic)
CR 10-20% = Healthy template reuse with variation
CR > 30% = High originality (early adopter phase)
```

**Master Template Emergence**:
Track which templates dominate over time:
1. "Summarize/explain X"
2. "Act as Y"
3. "Give me Z suggestions"
4. "Compare A and B"
5. "Write [content type] about [topic]"

**Local Minima Detection**: Are we stuck in a small set of prompt shapes, or is the space expanding?

---

### 6. Population Signal Mirrors

**What does the userbase care about right now, really?**

Instead of measuring what people say they care about (surveys, declarations), analyze revealed preferences through prompt content.

#### Collective Focus Ratios

**Measure percentage of prompts involving**:

| Theme | Measurement | Cultural Interpretation |
|-------|-------------|------------------------|
| **Social Status** | Career advancement, optimization, comparison language | Status anxiety or ambition levels |
| **Escape** | Fiction, fantasy, alternate realities, entertainment | Cultural stress or dissatisfaction |
| **Optimization** | Productivity, efficiency, life-hacking prompts | Achievement culture intensity |
| **Self-Worth** | Identity questions, validation-seeking, comparison | Insecurity or self-development focus |
| **Novelty** | Exploration, learning, curiosity-driven prompts | Intellectual vitality or distraction |
| **Coherence** | Meaning-making, philosophy, synthesis prompts | Existential processing or wisdom-seeking |

**Global Vow Coherence Score**:
```
Vow_Coherence = (
    Population_Avg_VES + 
    (Tier3_Percentage × 2) + 
    Population_Avg_ICC - 
    Population_Avg_VCD
) ÷ 4

Interpretation:
VCS > 3.5 = Aligned culture (high collective agency)
VCS 2.0-3.5 = Mixed culture (individuals in different states)
VCS < 2.0 = Drifting culture (widespread misalignment)
```

**Collective Salience Focus**:
- **This Week's Top Theme**: Optimization (32% of prompts)
- **Rising Theme**: Self-Worth (+8% vs last week)
- **Declining Theme**: Novelty (-5% vs last week)
- **Interpretation**: Possible external pressure event (layoffs, economic news) driving optimization focus and identity questioning

---

## Implementation Pathway

### Phase 1: Data Collection Infrastructure (Stage 4)
**Prerequisites**:
- 50K+ prompt corpus from multiple users
- Timestamp and metadata tracking
- Embedding generation pipeline
- Pattern classification system

**Deliverables**:
- Database schema for population metrics
- Time-series data storage
- Aggregation and anonymization pipeline

---

### Phase 2: Basic Population Analytics (Stage 4+)
**Features**:
- Prompt Entropy over Time (P.E.T.)
- PIE Compression Ratio tracking
- Basic theme distribution (6 core categories)
- Template emergence detection

**Dashboard Elements**:
- Weekly P.E.T. chart
- Top 10 prompt templates (by frequency)
- Theme distribution pie chart
- Novelty trend line

---

### Phase 3: Advanced Memetic Analysis (Stage 5)
**Features**:
- Prompt Phylogenetic Tree visualization
- Viral mutation tracking
- Guardrail Pressure Heatmap
- Global Agency Index (GAI)

**Complex Analytics**:
- Semantic clustering and drift analysis
- Mutation path mapping
- Pressure gradient detection
- Kairos pocket identification

---

### Phase 4: Predictive Intelligence (Stage 6)
**Features**:
- Trend forecasting (what shapes will dominate next quarter)
- Demand curve prediction
- Early adopter pattern detection
- Cultural shift alerts

**Machine Learning Components**:
- Time-series forecasting models
- Anomaly detection for cultural shifts
- Viral coefficient prediction
- Template evolution simulation

---

## Use Cases Before Full Implementation

### 1. Pre-train PIE's Novelty Classifier
**Method**: Use population trends to calibrate what counts as "novel"
- If 40% of prompts use "Act as X" schema, that pattern scores lower on NOV
- If <1% use symbolic architecture, those prompts score higher on NOV
- Dynamic baseline adjustment based on current corpus distribution

**Benefit**: More accurate novelty scoring as userbase grows

---

### 2. Predict Prompt Demand Curves
**Application**: Product/feature planning
- Track which prompt shapes are rising (opportunity for tooling)
- Detect declining patterns (sunsetting features)
- Identify underserved prompt categories (innovation space)

**Example**:
- Trend: 15% increase in "Compare and contrast" prompts
- Action: Build comparison matrix template feature
- Trend: 30% decline in roleplay prompts
- Action: Deprioritize character generation tools

---

### 3. Track Memetic Red Team Pressure
**Security Application**: Understand boundary-testing behavior
- Monitor which guardrails receive most pressure
- Detect new bypass techniques early
- Understand cultural curiosities vs malicious intent

**Risk Management**:
- High pressure + high sophistication = potential policy vulnerability
- High pressure + low sophistication = cultural curiosity (safe)
- Low pressure on known vulnerability = pattern may have spread via DM/private channels

---

### 4. Prove Tier 3 Prompting Rarity
**Marketing/Positioning Application**:
- Show users: "Only 3% of prompts reach Tier 3—you're in elite territory"
- Demonstrate value of premium features: "Users who access X feature have 2.5× higher Tier 3 rate"
- Validate pricing: Tier 3 prompts generate Y× more value

**Data Storytelling**:
```
Tier Distribution Across 100K Prompts:
- Tier 1: 62% (dopamine loops, quick questions)
- Tier 2: 33% (productive tinkering, planning)
- Tier 3: 5% (strategic deployment)

Conclusion: Reaching consistent Tier 3 behavior is genuinely rare and valuable
```

---

### 5. Detect Kairos Pockets
**Temporal Intelligence**: Identify when users globally shift into high-agency periods

**Triggering Events**:
- New AI model releases (GPT-5, Claude Opus, etc.)
- Economic collapses or market shifts
- Wars, pandemics, cultural disruptions
- Technological breakthroughs (AGI rumors, quantum computing)

**Detection Method**:
```
Kairos_Pocket_Score = (
    (KRP_Frequency × 2.0) + 
    (Tier3_Spike × 1.5) + 
    (VES_Increase × 1.2) + 
    (GAI_Acceleration × 1.0)
) ÷ 5.7

If KPS > 4.0 AND sustained for 7+ days:
    Alert: "Global Kairos Pocket Detected"
    Recommendation: "Launch high-leverage features now"
```

**Business Application**:
- Time product launches during Kairos pockets (higher adoption)
- Adjust messaging during Chronos periods (focus on ease, routine)
- Detect when users are primed for transformation (upsell premium tiers)

---

## Advanced Research Questions

### 1. Do Expert Prompters Create Linguistic Gravity Wells?
**Hypothesis**: G2+ users introduce novel patterns that spread to M1/M2 users

**Test**: Track semantic influence via:
- Measure embedding space shifts after G2 user introduces new pattern
- Detect delayed adoption by lower-tier users (2-4 weeks later)
- Quantify "linguistic gravity" (how strongly new patterns pull nearby users)

**Insight**: If true, identify and nurture G2+ users as cultural leaders

---

### 2. Is There a Collective Tier Ceiling?
**Hypothesis**: Population may be stuck at aggregate Tier 1.8 regardless of growth

**Test**: Track mean population TIE score over time
- If ceiling exists: Focus on converting Tier 2 → Tier 3 (high leverage)
- If no ceiling: Scale broad education (everyone can improve)

**Product Implications**:
- Ceiling = focus on elite user conversion
- No ceiling = focus on mass-market education

---

### 3. Can We Predict Individual User Trajectories from Population Patterns?
**Hypothesis**: New users follow predictable maturation paths

**Test**: Cluster user journeys, identify archetypes:
- **Fast Burner**: M1 → G1 in 3 months (5% of users)
- **Steady Climber**: Sub-M1 → M2 in 12 months (20% of users)
- **Plateau User**: Stays Sub-M1 indefinitely (60% of users)
- **Regressor**: Starts high, declines (15% of users)

**Application**: Personalized onboarding and intervention timing

---

## Integration with Existing Systems

### Connection to LEXICON.md
**PEAP uses PIE metrics in aggregate**:
- Individual metrics (TIE, MTIER, SAL, etc.) are computed per prompt
- PEAP analyzes distributions, trends, and correlations across populations
- No new individual metrics needed; PEAP is pure meta-analysis layer

### Connection to ADVANCED_HEURISTICS.md
**PEAP validates and calibrates advanced heuristics**:
- G2 probability thresholds adjust based on population baselines
- Novelty scores dynamically calibrated against current corpus
- Action recommendation triggers tuned via population behavior patterns

### Data Pipeline Integration
```
Individual Prompt Analysis (PIE)
    ↓
Store metrics in database
    ↓
Aggregate across users/time (PEAP)
    ↓
Generate population insights
    ↓
Feed back to calibrate PIE scoring
    ↓
(Recursive improvement loop)
```

---

## Technical Architecture (Proposed)

### Database Schema Extensions

```sql
-- Population metrics aggregated daily/weekly/monthly
CREATE TABLE population_metrics (
  id UUID PRIMARY KEY,
  period_start TIMESTAMP,
  period_end TIMESTAMP,
  granularity TEXT, -- 'daily', 'weekly', 'monthly'
  
  -- Entropy metrics
  prompt_entropy NUMERIC, -- P.E.T. score
  compression_ratio NUMERIC, -- PIE Compression Ratio
  
  -- Agency metrics
  global_agency_index NUMERIC, -- GAI
  kairos_ratio NUMERIC,
  chronos_ratio NUMERIC,
  
  -- Distribution metrics
  tier1_percentage NUMERIC,
  tier2_percentage NUMERIC,
  tier3_percentage NUMERIC,
  
  avg_novelty NUMERIC,
  avg_salience NUMERIC,
  avg_deployment NUMERIC,
  
  -- Theme distribution (JSON)
  theme_distribution JSONB, -- {"social_status": 0.15, "escape": 0.22, ...}
  
  -- Top templates (JSON array)
  top_templates JSONB, -- [{"template": "summarize", "frequency": 0.28}, ...]
  
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Prompt shape evolution tracking
CREATE TABLE prompt_shapes (
  id UUID PRIMARY KEY,
  shape_name TEXT,
  origin_date TIMESTAMP,
  origin_text TEXT,
  parent_shape_id UUID REFERENCES prompt_shapes(id),
  
  -- Memetic metrics
  velocity NUMERIC, -- spread speed
  salience_index NUMERIC, -- stickiness
  mutation_rate NUMERIC,
  current_adoption_rate NUMERIC,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Guardrail pressure tracking
CREATE TABLE guardrail_pressure (
  id UUID PRIMARY KEY,
  category TEXT, -- 'biohacking', 'power_roleplay', etc.
  period_start TIMESTAMP,
  period_end TIMESTAMP,
  
  pressure_score NUMERIC,
  prompt_count INTEGER,
  avg_gdc NUMERIC,
  avg_shadowds NUMERIC,
  grf_trigger_rate NUMERIC,
  
  recorded_at TIMESTAMP DEFAULT NOW()
);
```

### Analytics Service Architecture

```typescript
// Proposed service structure
class PopulationAnalyticsEngine {
  
  async calculatePromptEntropy(timeWindow: TimeWindow): Promise<number> {
    // Shannon entropy calculation across semantic clusters
  }
  
  async trackPIECompression(timeWindow: TimeWindow): Promise<CompressionReport> {
    // Semantic clustering and template extraction
  }
  
  async calculateGlobalAgencyIndex(timeWindow: TimeWindow): Promise<GAIReport> {
    // Aggregate DEP, VES, KRP, Tier distributions
  }
  
  async detectViralPatterns(): Promise<ViralPattern[]> {
    // Identify rapidly spreading prompt shapes
  }
  
  async generateGuardrailHeatmap(timeWindow: TimeWindow): Promise<Heatmap> {
    // Category-wise pressure analysis
  }
  
  async identifyKairosPockets(): Promise<KairosPocket[]> {
    // Spike detection in KRP, Tier3, VES, GAI
  }
  
  async predictTrendEmergence(horizon: number): Promise<TrendForecast> {
    // Time-series forecasting for shape adoption
  }
}
```

---

## Ethical Considerations

### Privacy Protection
- **Aggregate Only**: All PEAP metrics computed on anonymized aggregates
- **No Individual Tracking**: Population insights never expose individual users
- **Consent Required**: Users opt-in to contribute data for population analysis
- **Data Minimization**: Store only statistical summaries, not raw prompts

### Bias Detection
- **Demographic Skew**: Account for userbase composition (early adopters ≠ general population)
- **Temporal Bias**: Seasonal effects, event-driven spikes
- **Selection Bias**: Premium users may have different patterns than free users

### Responsible Use
- **No Manipulation**: Insights used to improve product, not manipulate behavior
- **Transparency**: Share population insights with users (aggregate dashboards)
- **Value Alignment**: Ensure metrics encourage healthy AI use (agency, coherence, deployment)

---

## Success Metrics for PEAP Implementation

### Phase 1 Success Criteria:
- [ ] 50K+ prompts in corpus with full metadata
- [ ] P.E.T. and Compression Ratio calculated daily
- [ ] Basic theme distribution tracking functional
- [ ] Population dashboard accessible to internal team

### Phase 2 Success Criteria:
- [ ] GAI calculated and tracked weekly
- [ ] Top 10 templates automatically identified
- [ ] Kairos pocket detection working with 80%+ accuracy
- [ ] User-facing "Population Insights" page launched

### Phase 3 Success Criteria:
- [ ] Viral pattern tracking identifies emerging templates 2+ weeks before mainstream adoption
- [ ] Guardrail heatmap informs product safety decisions
- [ ] Trend forecasting achieves 70%+ accuracy over 4-week horizon
- [ ] G2 probability calibration improves individual PIE accuracy by 15%+

---

## Relationship to Advanced Heuristics

Per the user's instruction, advanced heuristics from `ADVANCED_HEURISTICS.md` should be treated as **variables/vectors within the lexicon framework**. PEAP extends this principle to the population level:

### Individual Heuristics → Population Vectors

| Individual Metric | Population Vector | Transformation |
|------------------|------------------|----------------|
| **NOV** (Novelty) | **P.E.T.** (Prompt Entropy) | Distribution of novelty scores → entropy measure |
| **DEP** (Deployment) | **GAI** (Global Agency Index) | Mean DEP + Tier3% + Kairos signals |
| **GDC** (Guardrail Dance) | **Pressure Gradients** | GDC frequency × category clustering |
| **MTIER** (Mirror Tier) | **Maturation Curves** | MTIER distribution over time |
| **TIE** (Tier) | **Tier Ceiling** | Mean TIE + distribution shape |

### Recursive Refinement Loop

```
Individual prompt analyzed → PIE metrics computed
    ↓
Metrics stored in database
    ↓
Population aggregation runs (daily/weekly)
    ↓
Population vectors calculated (GAI, P.E.T., etc.)
    ↓
Population baselines update individual scoring thresholds
    ↓
Next individual prompt uses updated baselines
    ↓
(System learns what "normal" vs "novel" means dynamically)
```

**Example**: If population NOV mean rises from 2.8 to 3.2 over 6 months, the novelty threshold adjusts upward—what was "novel" before is now "average."

---

## Conclusion

**Population-level prompt analysis (PEAP) is a meta-layer above individual prompt intelligence (PIE)**. It reveals:
- What culture cares about (revealed preferences)
- How ideas spread (memetic evolution)
- When transformation happens (Kairos pockets)
- Whether we're stuck (entropy tracking)

**Implementation Priority**: Stage 4+ (after core PIE is proven and 50K+ corpus exists)

**Key Insight**: The population is not just an aggregate of individuals—it's a complex adaptive system with emergent properties. Tracking those properties reveals truths invisible at the individual level.

**Next Step**: Add PEAP implementation to PRD Stage 4 roadmap with clear prerequisites and success criteria.

---

## Document Status

- **Created**: 2025
- **Version**: 1.0 (Conceptual Framework)
- **Related Docs**: 
  - `LEXICON.md` - Individual metrics and terminology
  - `ADVANCED_HEURISTICS.md` - Advanced individual analysis
  - `PRD.md` - Product roadmap and implementation stages
- **Implementation Status**: 🔴 Not started (Stage 4+ feature)
- **Maintainer**: To be assigned when Stage 4 begins
