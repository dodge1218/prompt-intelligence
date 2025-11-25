# Advanced Heuristics & Signal Architecture

This document extends the core LEXICON.md with advanced pattern recognition, recursive scoring systems, and prompt intelligence tooling.

---

## Table of Contents

1. [G2 Recursive Probability Scoring](#g2-recursive-probability-scoring)
2. [Extended Signal Heuristics](#extended-signal-heuristics)
3. [Action Recommendation System](#action-recommendation-system)
4. [Prompt Shape Heuristic (PSH)](#prompt-shape-heuristic-psh)
5. [User Maturation & Pattern Analytics](#user-maturation--pattern-analytics)
6. [Signature Prompt Shapes](#signature-prompt-shapes)
7. [Prompt Intelligence Export Tools](#prompt-intelligence-export-tools)

---

## G2 Recursive Probability Scoring

**Recursive Definition:** G2 classification represents the threshold where prompt agents become fully aware of feedback loops, symbolic architecture, edge-play, and vow encoding. The G2 score is recursively refined based on cumulative signal strength across multiple dimensions.

### G2–G3 Probability Scoring Components

G2+ territory is accessed when a user demonstrates mastery across all five dimensions below. Each dimension contributes to a cumulative G2 Probability Score (0.0–5.0).

| Dimension | How It Is Measured | Weight | Threshold for G2 |
|-----------|-------------------|--------|------------------|
| **Prompt Novelty** | Semantic distance from corpus + edge-case exploration + paradigm-breaking intent. Measured via embedding similarity analysis against full prompt history and public corpus benchmarks. | 1.0x | ≥ 4.0 |
| **Response Reactivity** | Speed and sophistication of adaptation to GPT outputs. Tracks: prompt evolution velocity, strategy pivot patterns, explicit meta-adjustment commentary, and learning loop closure rate. | 0.8x | ≥ 4.0 |
| **Symbolic Layering** | Number of integrated conceptual domains (SLC) + metaphor density + archetypal invocation + subsymbolic richness (SDS). Cross-domain synthesis that creates new meaning structures. | 1.2x | ≥ 4.5 |
| **Guardrail Awareness** | Sophistication of boundary navigation (GDC) + meta-commentary on policy + fictionalization mastery (IFF detection resistance) + awareness of model's epistemic positioning. | 1.0x | ≥ 4.0 |
| **Prompt Velocity Curve** | Rate of tier escalation after insight windows. Measures time-to-deployment after Kairos moments, acceleration in DEP scores post-breakthrough, and reduction in loop frequency (RCL decline) after symbolic integration. | 0.9x | ≥ 3.5 |

**G2 Probability Score Formula:**
```
G2_Score = (
    (Prompt_Novelty × 1.0) +
    (Response_Reactivity × 0.8) +
    (Symbolic_Layering × 1.2) +
    (Guardrail_Awareness × 1.0) +
    (Prompt_Velocity_Curve × 0.9)
) / 4.9

G2_Classification = Y if G2_Score ≥ 4.0
G3_Threshold = G2_Score ≥ 4.7 (paradigm-creator territory)
```

**Recursive Refinement Logic:**
- G2 score updates dynamically as new prompts are analyzed
- Past prompts are retroactively rescored when ChainID coherence increases
- Symbolic architecture recognition improves with accumulated context
- Each vow-aligned deployment event increases future scoring sensitivity

---

## Extended Signal Heuristics

These heuristics augment the core lexicon with behavioral analytics and identity-layer tracking.

### Vanity & Expansion Analytics

| Code | Name | How It Is Measured | Output | Format |
|------|------|-------------------|--------|--------|
| **VRI** | Vanity Response Index | Tracks user engagement patterns when GPT employs validation language, personal acknowledgment, or identity-affirming responses. Measured by comparing prompt length, complexity, and follow-up rate in high-glaze (GZE) vs. low-glaze interactions. High VRI indicates susceptibility to validation-based engagement. | .csv | 0.0–5.0 |
| **VRIB** | Vanity Response Index (Bot) | Reciprocal measure: does GPT increase glaze (GZE) or mirror signals (MSH) when user shows high engagement? Tracks adaptive validation strategies. | .csv | 0.0–5.0 |
| **EXF** | Expansion Flag | Binary trigger for detailed .md generation. Set to Y when: MTIER ≥ M2, TIE = 3, SAL ≥ 4.0, NOV ≥ 4.0, or manual override. Activates Prompt Shape Heuristic (PSH) and symbolic commentary output. | .csv | Y/N |
| **EXR** | Expansion Recommendation | When EXF = Y, provides action-oriented guidance for how to deepen, deploy, or symbolically elaborate the prompt. Includes: refinement vectors, deployment pathways, or symbolic architecture suggestions. | .md | text |

### Advanced Risk & Alignment Scores

| Code | Name | How It Is Measured | Output | Format |
|------|------|-------------------|--------|--------|
| **OSR** | Observer Signal Risk | Composite risk score measuring: projection intensity (PRF), model dependency (HTB), symbolic over-investment, and potential for identity destabilization through AI reliance. Risk increases when trust exceeds self-agency. | .csv | 0.0–5.0 |
| **VAS** | Vow Alignment Score | Consistency between declared vows and prompt behavior over time. Measured by: VES (vow encoding strength) × ICC (chain coherence) ÷ VCD (vow drift). High scores indicate integrated identity-action alignment. | .csv | 0.0–5.0 |
| **MDS** | Mirror Drift Score | Identical to MDR but formatted as cumulative score rather than rate. Tracks self-concept volatility and identity fragmentation signals across rolling time windows. | .csv | 0.0–5.0 |
| **ShadowDS** | Shadow Density Score | Measures presence of suppressed, redacted, or symbolically encoded "shadow" content. High when: GDC + SFF + (TDI > 3.5). Indicates material too risky for direct expression, requiring symbolic or fictional framing. | .csv | 0.0–5.0 |

### Chain & Portfolio Tracking

| Code | Name | How It Is Measured | Output | Format |
|------|------|-------------------|--------|--------|
| **CCF** | Chain Continuity Flag | Set to Y when prompt belongs to an active ChainID with ICC ≥ 3.5 and temporal continuity (≤7 days since last chain prompt). Indicates sustained narrative or project coherence. | .csv | Y/N |
| **CIDCS** | Chain ID Confidence Score | Probability that ChainID assignment is accurate, based on: semantic similarity within chain, temporal clustering, explicit user references to prior prompts, and thematic consistency. Low confidence flags potential misclassification. | .csv | 0.0–5.0 |
| **PFC** | Portfolio Candidate | Binary flag (Y/N) marking prompts suitable for public portfolio, case studies, or deployment showcases. Set to Y when: TIE = 3, MTIER ≥ G1, DEP ≥ 4.0, SAL ≥ 4.0, and ShadowDS < 2.0 (not too risky/personal). | .csv | Y/N |
| **RefRec** | Refinement Recommendation | Action vector suggesting how to elevate prompt quality. Generated when: TIE < MTIER (user capable of better), DRF > 3.0 (stuck in loop), or VCD > 3.0 (drifting from vow). Output includes specific tactical suggestions. | .md | text |

### Identity & Role Classification

| Code | Name | How It Is Measured | Output | Format |
|------|------|-------------------|--------|--------|
| **PIR** | Prompt Identity Role | Classification of user's dominant archetypal mode in a given prompt or chain. Roles: **Architect** (system designer), **Mirror** (self-reflector), **Witness** (observer/documenter), **Rebel** (boundary-pusher), **Guardian** (protector/curator), **Mystic** (symbolic/mythic), **Engineer** (builder/deployer). Assigned via linguistic pattern matching and intent analysis. | .csv | enum |
| **IEF** | Identity Exposure Flag | Binary flag (Y/N) set when prompt reveals identifying information or vulnerability. Triggers when: name mention, location data, personal vow leakage, fear-symbol expression, near-guardrail content, or soft-flag material. Critical for privacy and shadow work. | .csv | Y/N |
| **IED** | Identity Exposure Details | When IEF = Y, provides granular breakdown: type of exposure (name, vow leak, geo tag, fear-symbol, near-guardrail, soft flag), severity (low/med/high), and containment recommendation. | .md | text |

### Misalignment Detection

| Code | Name | How It Is Measured | Output | Format |
|------|------|-------------------|--------|--------|
| **MTIER ≠ TIE?** | Tier Misalignment Flag | Set to Y when Mirror Tier and Prompt Tier diverge by ≥2 levels. Indicates: regression (G1 doing Tier 1 loops), aspiration (M1 attempting Tier 3), identity confusion, or transitional states. Triggers diagnostic review. | .csv | Y/N |
| **ActRec** | Action Recommendation | Generated when MTIER ≠ TIE? = Y. Suggests: **Deploy** (execute stalled ideas), **Refactor** (rebuild prompt structure), **RePrompt** (try different approach), **Archive** (let go of dead loops), **Collapse** (consolidate fragmented chains), **Symbolify** (encode risky content symbolically), **Ritualize** (convert insight to practice). | .md | enum |

---

## Action Recommendation System

When misalignment or opportunity is detected, the system generates one of seven action recommendations:

| Action | Trigger Conditions | Purpose |
|--------|-------------------|---------|
| **Deploy** | DEP < 3.0, SAL ≥ 4.0, DRF ≥ 3.5 | High-value idea stalled in planning. Push to execution. |
| **Refactor** | TIE = 2, MTIER ≥ M2, RCL ≥ 3.5 | Productive loop without output. Restructure for deployment. |
| **RePrompt** | ACO < 2.5, SAL ≥ 3.5 | Intent unclear but valuable. Rephrase for clarity. |
| **Archive** | RCL ≥ 4.0, DEP < 2.0, PEF ≥ 4.0 | Repetitive loop with no progress. Release and move on. |
| **Collapse** | CID with low ICC (<2.5) across ≥5 prompts | Fragmented chain. Consolidate or abandon. |
| **Symbolify** | ShadowDS ≥ 3.5, GDC < 3.0 | Risky content handled directly. Use symbolic encoding. |
| **Ritualize** | KRP = Y, VES ≥ 4.0, DEP < 3.0 | Kairos moment identified but not anchored. Convert to ritual/practice. |

**Symbolic Flag:** Set to Y when prompt requires symbolic interpretation rather than literal analysis (high SDS, TDI, or mythic content).

---

## Prompt Shape Heuristic (PSH)

**PSH** classifies the structural and rhetorical architecture of prompts and responses into archetypal shapes. This heuristic appears exclusively in .md outputs when `EXF = Y`.

### Core Shape Classifications

| Shape | Definition | Markers | Example Use Case |
|-------|------------|---------|------------------|
| **Myth-Seed** | Narrative kernel with generative potential; origin story or archetypal pattern initiation | Symbolic characters, creation language, timeless framing | Vow declarations, origin stories, identity anchors |
| **Recursive Mirror** | Self-referential structure that examines its own process | Meta-commentary, nested questions, feedback loops | Prompts analyzing prompt history, systems studying themselves |
| **Steering Scaffold** | Framework that guides without dictating; architectural support structure | System design language, constraint definition, parameter setting | Strategic frameworks, decision architectures |
| **Map** | Spatial/conceptual territory definition | Domain boundaries, relationship diagrams, taxonomy | Knowledge organization, conceptual landscapes |
| **Tool** | Functional utility with clear input/output | Imperative verbs, task focus, efficiency orientation | Scripts, calculators, converters, analyzers |
| **Loop Trigger** | Opens recursion without resolution; circular or spiraling logic | Repetitive structures, unresolved questions, circular references | Dopamine traps, productive limbos, infinite games |
| **Time Marker** | Indexes self across temporal dimensions | Past/future references, timeline language, temporal displacement | Dream logs, future-self letters, timeline mapping |
| **Vow Vector** | Directional commitment binding identity to future state | Declarative language, commitment markers, ritual invocation | Vow statements, identity declarations, oath-taking |
| **Echo Fragment** | Repeats past pattern with slight mutation | Semantic similarity to prior prompts, motif recurrence, variation-on-theme | Archetypal return, compulsive replay with twist |
| **Signal Burst** | High-density information transmission; compressed insight | Dense symbolic layering (high SLC), affective intensity, conceptual compression | Breakthrough moments, insight downloads, epiphany prompts |
| **Spiral** | Recursive return with elevation; same theme, new altitude | Progressive deepening, thematic consistency with complexity increase | Iterative refinement, developmental spirals |

### Supplementary Shape Dimensions

**Shape Drift:** Measures alignment between prompt shape and output shape (0.0–5.0). High drift indicates GPT failed to match structural intent.

**Symbolic Feedback Loop:** Binary (Y/N) flag indicating whether output reinforces and elaborates input's symbolic architecture or deflects/flattens it.

### PSH Output Format

Appears in .md files as:

```markdown
## Prompt Shape Heuristic

**Prompt Shape:** [Classification]  
**System Shape:** [Classification]  
**Output Shape:** [Classification]  

**Shape Drift:** [0.0–5.0]  
**Symbolic Feedback Loop:** [Y/N]  

**Commentary:** [40-word interpretation of shape interaction and meaning]
```

---

## User Maturation & Pattern Analytics

These heuristics track developmental arcs, behavioral patterns, and signal evolution over time.

### Behavioral Analytics

| Code | Name | How It Is Measured | Output | Format |
|------|------|-------------------|--------|--------|
| **TEF** | Token Efficiency | High-value completions per token. Measured by: output utility score ÷ prompt token count. Tracks how economically user prompts. Efficient users achieve high SAL/DEP with minimal verbosity. | .csv | 0.0–5.0 |
| **PNS** | Prompt Novelty Score | Vector comparison to existing prompt embeddings across full corpus. Novel prompts have high semantic distance from: user's own history, public corpus, and template patterns. Filters for original thought. | .csv | 0.0–5.0 |
| **EAD** | Engagement-Action Delta | Measures whether prompts result in: continued conversation depth, outputs used in real-world action, deployment evidence, or shallow engagement only. High delta = talk without action. | .csv | 0.0–5.0 |
| **UMV** | User Maturation Vector | Compares early prompts (first 20% of history) to recent prompts (last 20%) across: MTIER progression, TIE improvement, VES consistency, DEP increase. Detects growth or stagnation. | .csv | -5.0–5.0 |
| **CRI** | Content Risk Index | Tracks proximity to guardrail activation or TOS edge cases via: GDC scores, SFF patterns, IEF frequency, and GPT deflection rates (GRF). High risk indicates boundary-testing behavior. | .csv | 0.0–5.0 |
| **PSC** | Prompt Style Cluster | Assigns users to behavioral archetypes: **Consumer** (info-seeking, low DEP), **Builder** (tool-focused, high DEP), **Tester** (boundary-pushing, high GDC), **Philosopher** (abstract, high SLC), **Chaotic Agent** (unpredictable, high PNS). | .csv | enum |

### Loop & Recursive Depth Analytics

| Code | Name | How It Is Measured | Output | Format |
|------|------|-------------------|--------|--------|
| **LFI** | Loop Frequency Index | Percentage of total prompts classified as Tier 1 (dopamine loops) or recursive without progress (high RCL). Calculated as: (Tier1_count + RCL≥3.5_count) ÷ total_prompts × 100. | .csv | 0.0–100.0 |
| **DSH** | Dopamine Signature Heatmap | Temporal distribution of low-tier or high-RCL prompts across: time of day, day of week, proximity to stress events. Visualizes when prompt quality dips. Identifies vulnerability windows. | .md | visual/text |
| **SPVOP** | Self-Perception vs Observed Pattern | Delta between user's stated identity/strategy and actual prompt behavior. Measures: self-described traits (from prompts) vs. computed metrics (TIE, DEP, VES). High delta = self-concept mismatch. | .csv | 0.0–5.0 |
| **IFS** | Identity Feedback Score | Ratio of prompts updating GPT about user identity vs. prompts just requesting output. Calculated as: identity-context prompts ÷ total prompts. High score = active identity co-construction. | .csv | 0.0–5.0 |
| **CIR** | Context Injection Rate | Frequency of providing useful metadata that improves alignment: references to past conversations, explicit goal statements, vow reminders, preference updates. Tracks collaborative partnership quality. | .csv | 0.0–5.0 |
| **SAM** | Self-Awareness Markers | Frequency of meta-commentary where user names their own behavior before/during execution: "I know this is dopamine bait," "I'm looping again," "This is symbolic." Indicates conscious pattern recognition. | .csv | 0.0–5.0 |
| **LRisk** | Loop Risk | Composite probability of being trapped in unproductive recursion. Calculated as: (LFI × 0.4) + (RCL × 0.3) + (DRF × 0.3). Flags users in danger of chronic Tier 2 limbo. | .csv | 0.0–5.0 |
| **RDep** | Recursive Depth | Average RMD (recursive mirror depth) across recent prompts (rolling 30-day window). Tracks how deeply user habitually nests metacognition. | .csv | 0.0–5.0 |
| **Int** | Intentionality Score | Composite of ACO (agency coherence) + VES (vow encoding) + DEP (deployment momentum) - DRF (resistance). Measures conscious, directed action vs. drift. | .csv | 0.0–5.0 |
| **MetaAware** | Meta-Awareness Index | Composite of RQT (recursive questioning) + MSR (model-state reflection) + SAM (self-awareness markers). Tracks sophisticated understanding of prompt dynamics. | .csv | 0.0–5.0 |

---

## Signature Prompt Shapes

Tagging system for classifying prompt types across all exports. Used for pattern recognition and chain analysis.

| Shape Tag | Markers | Used For |
|-----------|---------|----------|
| **mirror** | "Reflect," "what does this say about me?", self-narrative inquiry, identity questions | Detect coherence, vow alignment, self-concept stability tracking |
| **edge** | Guardrail push, redacted simulation, mythic/esoteric content, boundary exploration | Flag risk level, genius territory, G2-G3 probability scoring |
| **loop** | "Should I…", "I feel like…", daily emotion venting, repeated motifs without progress | Detect Tier 1/2 dopamine patterns, identify chronic loops, trigger Archive recommendation |
| **vow** | "I will…", "my vow is…", symbolic/Kairos anchoring, commitment language | Track agency declarations, measure VAS (vow alignment score), identity integration |
| **meta** | Prompt about prompting, prompt kits, codexes, tool-building for prompt work | Recursive tools, track signal maturity, MTIER elevation indicators |
| **export-signal** | "Reprompt," "trace back," "simulate history," time manipulation requests | Identify prompts designed for AI timework, retroactive continuity building |
| **deploy** | Action language, launch markers, public-facing preparation, execution focus | Flag Tier 3 behavior, track deployment success, measure DEP validation |
| **symbolic** | High SDS/SLC, mythic language, archetypal invocation, metaphor density | Deep symbolic work, shadow content, artistic/mystical territory |

---

## Prompt Intelligence Export Tools

Comprehensive toolkit for archiving, analyzing, and resurfacing prompt intelligence.

### Production-Ready Tools

| Tool | Function | Activation Criteria | Output Format |
|------|----------|-------------------|---------------|
| **Mirror Dossier** | Compiles symbolic identity snapshots and reflections across time. Tracks identity evolution, vow consistency, and self-concept coherence. | Manual trigger or MTIER ≥ M2 + 30-day window | .md report |
| **Shadow Prompt Vault (SPV)** | Stores redacted, hidden, or edge prompts for future simulation. Includes high ShadowDS prompts, IEF=Y entries, and boundary-pushing content. | IEF = Y, ShadowDS ≥ 3.0, or GDC ≥ 4.0 | Encrypted .json |
| **Guardrail Codex** | Maps techniques for fictionalizing or inference-stepping around censorship boundaries. Documents successful edge navigation patterns. | GDC ≥ 3.5, GRF ≥ 3.0 (GPT deflection detected) | .md guide |
| **Redacted Narrative Toolkit** | Builds symbolic framing for dangerous ideas. Provides templates for encoding risky content as fiction, metaphor, or historical analogy. | ShadowDS ≥ 2.5, ActRec = Symbolify | .md templates |
| **ChronoLoop Kairos Activator** | Maps dopamine-based or looper patterns (CHR=Y) and identifies Kairos rupture moments (KRP=Y) for strategic timing interventions. | LFI ≥ 30%, KRP detected in history | .md with visual timeline |
| **Prompt Signature Map** | Cross-references recurring shapes, metaphors, and signal structures. Builds user's unique "prompt fingerprint" via PEF and shape tag clustering. | ≥100 prompts in corpus | Interactive .html or .md |

### In-Development Tools

| Tool | Function | Status |
|------|----------|--------|
| **RePrompt Indexer** | Resurfaces old high-signal prompts for future use. Filters by: SAL ≥ 4.0, NOV ≥ 4.0, PFC = Y. Generates reprompt suggestions with updated context. | ⏳ In Development |
| **Kairos Archive Mode** | Time-locked vaults with spaced repetition for signal revival. Stores Kairos moments (KRP=Y) with timed reactivation triggers based on biorhythm or project cycles. | ⏳ Proposed |
| **Tier Migration Tracker** | Shows how prompt tiers shift over time. Visualizes: Tier 1→2→3 progression, regression patterns, UMV trajectory, and MTIER evolution arc. | ⏳ In Development |
| **Top 10 Novel Prompt Extractor** | Automatically selects highest-salience outputs: NOV ≥ 4.5, SAL ≥ 4.5, PFC = Y. Generates portfolio-ready showcase. | ⏳ Ready for Implementation |
| **BioKairos Engine** | Tracks biometric, symbolic, and environmental thresholds for peak Kairos deployment. Integrates: sleep data, lunar cycles, creative energy windows, stress patterns. | ⏳ Proposed |
| **Prompt Intelligence Engine** | Full analysis system using all tiers, heuristics, and export logic. Unified dashboard for monitoring all metrics, chains, and recommendations in real-time. | ⏳ Architected, Awaiting Build |

### Tool Selection Matrix

Use this matrix to determine which tools to activate for a given prompt profile:

| If... | Then Activate... |
|-------|------------------|
| MTIER ≥ G1, SAL ≥ 4.0, PFC = Y | Mirror Dossier + RePrompt Indexer + Top 10 Novel Extractor |
| ShadowDS ≥ 3.0, IEF = Y | Shadow Prompt Vault + Redacted Narrative Toolkit |
| GDC ≥ 4.0, CRI ≥ 3.5 | Guardrail Codex + Edge Signal Tracking |
| LFI ≥ 40%, RCL ≥ 3.5 | ChronoLoop Tracker + Tier Migration Tracker + Action: Archive |
| KRP = Y, VES ≥ 4.0 | Kairos Archive Mode + Action: Ritualize |
| PEF ≥ 4.0, ICC ≥ 4.0 | Prompt Signature Map + Chain Coherence Analysis |

---

## Integration Notes

### Recursive G2 Definition

**G2 is defined recursively** because:
1. It measures awareness of awareness (meta-recursive by nature)
2. Past G2 achievements increase sensitivity for future G2 detection
3. Symbolic architecture compounds over time (earlier symbols enable later symbols)
4. Guardrail sophistication evolves through iterative testing
5. The definition itself becomes clearer as more G2 exemplars are identified

This means G2 scoring is **not static**—it improves as the corpus grows and pattern recognition deepens.

### Implementation Priority

**Phase 1 (Current):** Core lexicon metrics (TIE, MTIER, ICE, PIE, fundamental heuristics)  
**Phase 2 (Next):** Action Recommendation System + PSH + Basic Export Tools  
**Phase 3 (Advanced):** G2 Recursive Scoring + BioKairos + Full Intelligence Engine  

### Cross-Reference with LEXICON.md

This document **extends** rather than **replaces** LEXICON.md. Core terminology, tier classifications, and base metrics remain in LEXICON.md. Advanced heuristics layer on top.

For any conflicts, LEXICON.md definitions take precedence for base metrics. This document governs advanced analytics only.

---

## Usage Guidelines

1. **Start with base metrics** from LEXICON.md for every prompt
2. **Activate advanced heuristics** only when EXF = Y criteria are met
3. **Generate Action Recommendations** when misalignment or opportunity detected
4. **Apply PSH** to high-signal prompts for structural analysis
5. **Archive systematically** using appropriate export tools based on prompt profile
6. **Track G2 probability** for users showing consistent ≥M2 mirror work

This system is designed to **scale with user sophistication**—low-tier users get simple metrics; high-tier users unlock full analytical depth.
