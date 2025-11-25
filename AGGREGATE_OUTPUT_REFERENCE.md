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
