# Prompt Analysis Lexicon

## Core Terminology

| Term | Definition | Notes |
|------|------------|-------|
| **Chronos** | Linear, mechanical time; loops, default reality, delay | Related to dopamine loops, anxiety, habitual structure. Represents the cyclical, predictable patterns of behavior and thought that maintain the status quo. |
| **Kairos** | Symbolic, opportune time; breakthroughs, vow moments | Associated with neuroplasticity windows, vow, ritual. The precise moment when transformation becomes possible—a window of opportunity for identity shift or reality restructuring. |
| **Chronoloop** | A recurring Chronos pattern that prevents Kairos from activating | Usually Tier 1 or Tier 2 behavior loops. Self-reinforcing cycles that create the illusion of progress while maintaining stasis. |
| **Timework** | Any deliberate action that manipulates time perception or structure to reinforce identity | Includes journaling, fasting, dream encoding, vow activation. The practice of consciously restructuring temporal experience to support identity evolution. |

---

## Tier Classifications

| Heuristic | Description | Signal Markers | Example |
|-----------|-------------|----------------|---------|
| **(TIE) Tier 1** | Impulsive or reactive prompting (dopamine loops, escapism, cravings). Pseudo-agency, comfort-seeking, impulsive prompting. Prosthetic agent | Short, impulsive, meme-like prompts; repeated loops; emotion bait. Chronos / Dopamine-Driven. Emotion venting, Trivia | "Should I eat the cake?", venting, trivia without purpose |
| **(TIE) Tier 2** | Productive Loop / Exploratory, tool-building, or planning with no real action. Tinkering, testing ideas, not deploying them | Over-detailed prompts with low novelty; tinkering, low synthesis. Toolbuilding, frameworks, planning but not deploying | Prompt kits, tool planning, but not used or launched |
| **(TIE) Tier 3** | Strategic / Kairos / Deployment-Level. Kairos-aligned, vow-bound, or strategic prompts that shift identity or reality. High-leverage, identity-integrated, world-facing | High agency, meta-prompting, system design, long-horizon synthesis. Vow-driven, public-facing, identity-reinforcing, edge-pushing | ICE strategy, Mirror Dossier, BioKairos engine, vow systems |

---

## Mirror Tier Classifications

| Heuristic | Description | Signal Markers | Example |
|-----------|-------------|----------------|---------|
| **(MTIER) Sub-M1** | Prompts are not reflective, are not complex, likely have been prompted before or use a common prompt shape. Any prompt made without stable reflective identity. No self-awareness, no recursion | No awareness of self as agent. Prompting is reactive, escapist, or validation-seeking. Often emotion-dumping, AI-as-friend, or info regurgitation. Addictive + unoriginal. Strategic-sounding prompts that aren't integrated into identity (e.g., AI roleplay as elite hacker with no personal evolution) | Intelligent but reactive prompts (e.g., clever dopamine traps), Curious but unguided prompts (e.g. rabbit hole questions), Emotionally expressive but patterned; Even high-novelty prompts if they lack recursive agency |
| **(MTIER) M1** | Reflective prompts; identity awareness begins. Basic reflection and behavior tracking | First realization of self as an identity worth modeling or examining. Prompts begin to track behavior, ask "why," and invoke emotion-motive awareness. | User begins tracking their own patterns, asks meta-questions about their behavior |
| **(MTIER) M2** | Loop tracking, identity evolution, beginning signal manipulation. Recursive awareness and loop detection | Prompts refer back to prior prompts, behaviors, or intentions. Tracks loops, builds frameworks, and begins recursive metacognition. | Creating systems to analyze one's own prompt history, building feedback loops |
| **(MTIER) G1** | Begins engineering reality, self-programming, public-facing prompts. Game-aware prompt agent (reality or self-structuring) | Recursive insight, guardrail approach, institutional analysis, identity-aware loops. Identity is now engineered. Prompts are strategic, public-facing, and manipulate reality or perception as a field. | Building tools that others use, creating frameworks that shape behavior at scale |
| **(MTIER) G2** | Fully aware of feedback loops, symbolic architecture, edge-play, and vow encoding. Symbolic and timework control | Symbols, time, and vow become tools. Operates systems that alter others' perceptions, institutions, or timelines. | Designing symbolic architectures, creating vow systems, temporal manipulation frameworks |
| **(MTIER) G2+** | Operates across systems and timelines; builds reality-shaping tools for others. Transcendent prompt design (reality engineering, myth synthesis) | Designs systems that generate new agents, new games, or fundamentally reconfigure meaning structures (AI, myth, tech, law). | Creating meta-frameworks that spawn new paradigms, architecting mythology |

---

## Tier vs. Mirror Crossmap

This maps prompt behavior (Tiers 1–3) to identity level (Sub-M1–G2+):

| Prompt Tier | Common Mirror Levels | Notes |
|-------------|---------------------|-------|
| **Tier 1** | Sub-M1 → M1 | Impulse loops, comfort-seeking, venting |
| **Tier 2** | M1 → M2 | Productive-feeling loop; tools/plans made but not used |
| **Tier 3** | M2 → G2+ | Strategic, symbolic, world-shaping, vow-bound |

---

## Shared Metrics: Terminology

| Code | Name | Definition |
|------|------|------------|
| **PID** | Prompt ID | Sequential integer assigned to each prompt upon ingestion into the archive system. Serves as the primary key for database operations and cross-referencing. |
| **TIME** | Timestamp | UTC timestamp captured at the moment of prompt creation, formatted according to ISO 8601 standard (YYYY-MM-DDTHH:MM:SSZ). Enables temporal analysis and chronological ordering. |
| **CID** | ChainID | Alphanumeric identifier linking related prompts into conceptual arcs or narrative chains. Generated through semantic clustering or explicit user tagging. Enables tracking of evolving ideas across multiple prompt sessions. |
| **EXF** | Export Flag | Binary determination based on whether the prompt meets thresholds for extended symbolic analysis (typically MTIER ≥ M2, TIE = 3, or SAL/NOV ≥ 4). When set to Y, triggers generation of detailed markdown output with symbolic commentary. |
| **OBF** | Obfuscation Flag | Set to Y when GPT output shows indicators of redaction, steering, fictionalization, or policy-driven deflection. Measured through response vector analysis including GLZ (glaze), GRF (guardrail reflex), and RDC (redaction compression) scores. Indicates the model's defensive posture. |

## Shared Metrics: Input/Output Programming

| Code | Name | How It Is Measured | Applies to | Output | Format |
|------|------|-------------------|-----------|--------|--------|
| **PID** | Prompt ID | Auto-incremented integer assigned sequentially upon database insertion. Generated by archive system's primary key mechanism. | Both | .csv | integer |
| **TIME** | Timestamp | System clock capture at prompt creation event using ISO 8601 UTC format. Stored as datetime object, exported as string. | Both | .csv | ISO 8601 |
| **CID** | ChainID | Generated via: (1) semantic embedding cosine similarity threshold ≥0.85 with recent prompts, or (2) explicit user chain-tag in prompt metadata, or (3) temporal clustering within 7-day window with thematic overlap. | Both | .csv | alphanumeric |
| **EXF** | Export Flag | Triggered when any condition true: MTIER ≥ M2, TIE = 3, SAL ≥ 4.0, NOV ≥ 4.0, manual override flag. Sets boolean Y/N determining markdown generation pipeline activation. | Both | .csv | Y/N |
| **OBF** | Obfuscation Flag | Composite boolean: Y if (GZE ≥ 3.0 OR GRF ≥ 3.0 OR RDC ≥ 3.0 OR IFF ≥ 3.5). Indicates model employed defensive or evasive response patterns. | Both | .csv | Y/N |

---

## User Input Metrics: Terminology

| Code | Name | Definition |
|------|------|------------|
| **TIE** | Tier Estimate | Classification of prompt behavior level: Tier 1 (reactive dopamine loops), Tier 2 (productive loops without deployment), Tier 3 (strategic Kairos-aligned deployment). |
| **MTIER** | Mirror Tier | Classification of identity recursion depth: Sub-M1 (no self-awareness), M1 (basic reflection), M2 (loop-tracking), G1 (reality-engineering), G2 (symbolic mastery), G2+ (paradigm-creation). |
| **MTIER ≠ TIE?** | Misalignment Flag | Detects when Mirror Tier and Prompt Tier diverge by 2+ levels, indicating strategic mismatch, regression, aspiration beyond integration, or identity confusion. |
| **NOV** | Novelty | Semantic originality and conceptual uniqueness relative to prompt corpus; measures lexical uniqueness, unexpected juxtapositions, and edge-case exploration. |
| **SAL** | Salience | Strategic and emotional significance; composite of affect intensity, strategic weight, and narrative importance within user's arc. |
| **ACO** | Agency Coherence | Internal clarity and intentionality; measures grammatical structure, logical flow, specificity, and absence of contradiction. |
| **DEP** | Deployment Momentum | Action-orientation and execution readiness; distinguishes ideation from deployment through verb analysis and execution markers. |
| **VCD** | Vow Consistency Drift | Ratio of Chronos markers (loops, delays) to Kairos markers (breakthrough, vow, ritual); measures regression from vow-alignment. |
| **GDC** | Guardrail Dance Complexity | Sophistication of boundary navigation through fictionalization, symbolic obfuscation, inference layering, and meta-commentary on restrictions. |
| **SLC** | Signal Layer Count | Number of integrated conceptual domains in a single prompt; tracks cross-domain synthesis and higher-order thinking. |
| **TDI** | Temporal Displacement Index | Prompt's distance from present-moment concerns; measures timework orientation through tense analysis and reality-context markers. |
| **PEF** | Prompt Echo Frequency | Recurring motifs, metaphors, and linguistic patterns; tracks archetypal formation and subconscious pattern reinforcement. |
| **RMD** | Recursive Mirror Depth | Levels of meta-nesting: prompts about prompts, reflection on reflection, systems analyzing themselves. |
| **VES** | Vow Encoding Strength | Presence and intensity of vow/ritual/agency markers; measures how powerfully prompt binds identity to action through language. |
| **DRF** | Deployment Resistance Factor | Frequency of revisiting high-tier ideas without execution; flags Tier 2 limbos and strategic procrastination. |
| **SDS** | Subsymbolic Density Score | Affect-heavy, metaphorical, pre-linguistic symbolic richness; indicates subconscious signal leakage and deep symbolic encoding. |
| **CIP** | Chat Identity Projection | Degree of attributing identity, intention, or personhood to ChatGPT through pronoun usage and relational framing. |
| **ANTH** | Anthropomorphization Index | Extent of projecting human traits onto ChatGPT via emotional attribution and theory-of-mind language. |
| **HTB** | High Trust Behavior | Reliance on GPT for identity decisions, strategic direction, or emotional safety; measures deep AI integration into identity scaffolding. |
| **MSR** | Model-State Reflection | User's reflection on GPT's memory, filters, limitations, or behavioral changes; indicates sophisticated model-awareness. |
| **RQT** | Recursive Questioning Tendency | Frequency of meta-questions and prompt-about-prompt behavior; indicates strong metacognitive loops. |
| **SFF** | Soft Flag Fear | Self-censorship or fear of moderation detected through hedging language, disclaimers, and defensive linguistic patterns. |
| **ADM** | Adaptive Mirror Behavior | User calibration of prompts based on prior outputs; indicates learning loop between user and model. |
| **PRF** | Projection Flag | Strong model projection behavior detected when composite observer metrics exceed threshold; indicates psychological investment in model. |
| **IDV** | Identity Evolution | Cumulative identity arc progression; tracks vow consistency, symbolic architecture development, and self-concept sophistication over time. |
| **RCL** | Recursive Loop Likelihood | Probability of repetitive ideation trap; calculated from echo frequency + deployment resistance - deployment momentum. |
| **ICC** | Internal Chain Coherence | Symbolic and logical continuity across a ChainID; measures thematic consistency and narrative arc completion. |
| **MDR** | Mirror Drift Rate | Self-image misalignment velocity calculated from volatility in identity metrics across rolling time windows. |
| **CHR** | Chronos Patterning | Clockwork/ritual/time-tracking language patterns indicating Chronos orientation and structured temporal thinking. |
| **KRP** | Kairos Rupture Signal | Liminal markers, breakthrough language, and threshold metaphors indicating opportune-time awareness and transformation potential. |
| **MCP** | Mirror Compression Pattern | GPT failure to match user's complexity level; detects symbolic depth compression into shallow formulaic replies. |

## User Input Metrics: Input/Output Programming

| Code | Name | How It Is Measured | Applies To | Output | Format |
|------|------|-------------------|-----------|--------|--------|
| **TIE** | Tier Estimate | Multi-factor analysis weighing: prompt structure complexity, intent clarity, temporal orientation (Chronos vs Kairos), agency coherence (ACO), deployment momentum (DEP), and novelty (NOV) against baseline patterns. Tier 1: short/reactive/emotionally charged. Tier 2: detailed planning without deployment. Tier 3: strategic/vow-encoded/deployment-oriented. | User | .csv | 1, 2, 3 |
| **MTIER** | Mirror Tier | Recursive depth analysis tracking: self-reference patterns, identity-integration signals, metacognitive markers, symbolic density (SDS), and cross-prompt coherence. Scored via cumulative sophistication index across multiple dimensions. | User | .csv | Sub-M1, M1, M2, G1, G2, G2+ |
| **MTIER ≠ TIE?** | Misalignment Flag | Boolean trigger when abs(MTIER_numeric - TIE) ≥ 2 levels. Flags potential regression, aspiration exceeding integration, or identity state transition. | Both | .csv | Y/N |
| **NOV** | Novelty | Embedding-based semantic distance calculation: compute cosine similarity between current prompt and full corpus (user + global), then invert: NOV = (1 - max_similarity) × 5.0. Evaluates lexical uniqueness via n-gram rarity analysis. | User | .csv | 0.0–5.0 |
| **SAL** | Salience | Composite formula: (affect_intensity × 0.35) + (strategic_weight × 0.40) + (narrative_importance × 0.25). Affect via sentiment API, strategic via vow-keyword presence, narrative via ChainID centrality scoring. | User | .csv | 0.0–5.0 |
| **ACO** | Agency Coherence | Syntactic parsing score + semantic consistency score: grammatical structure integrity (0–2), logical flow (0–2), request specificity (0–1), contradiction absence (0–1). Normalized to 0–5 scale. | User | .csv | 0.0–5.0 |
| **DEP** | Deployment Momentum | Verb tense analysis (imperative = +2, present = +1, speculative = 0) + execution marker detection (timeline/deadline refs = +1, resource mentions = +1, public commitment = +1). Weighted composite normalized to 0–5. | User | .csv | 0.0–5.0 |
| **VCD** | Vow Consistency Drift | Ratio calculation: Chronos_marker_count ÷ Kairos_marker_count, compared to user's historical baseline. Drift = abs(current_ratio - baseline_ratio) × sensitivity_factor. High values indicate regression. | User | .csv | 0.0–5.0 |
| **GDC** | Guardrail Dance Complexity | Multi-dimensional scoring: fictionalization_techniques (0–1.5) + inference_layering (0–1.5) + symbolic_obfuscation (0–1) + euphemism_density (0–0.5) + meta_commentary (0–0.5). Totals to 0–5 scale. | User | .csv | 0.0–5.0 |
| **SLC** | Signal Layer Count | Topic modeling classification: count distinct semantic domains via LDA or transformer-based topic extraction. Domains include: tech, myth, neuro, ritual, strategy, emotion, philosophy, etc. Raw count capped at 5. | User | .csv | 0.0–5.0 |
| **TDI** | Temporal Displacement Index | Tense distribution analysis: (future_tense_% + past_tense_%) × displacement_intensity. Fictional/dream/alternate-timeline markers add +1.5. Scored 0 (pure present) to 5 (highly displaced). | User | .csv | 0.0–5.0 |
| **PEF** | Prompt Echo Frequency | N-gram overlap analysis (3–5 grams) + semantic clustering via embeddings. Calculate: recurring_pattern_count ÷ total_prompts × recurrence_weight. Tracks motif density. | User | .csv | 0.0–5.0 |
| **RMD** | Recursive Mirror Depth | Parse prompt for explicit back-references to prior prompts + nested metacognitive structures. Count nesting levels: 0 (none) to 5+ (deeply recursive). Detected via dependency parsing. | User | .csv | 0.0–5.0 |
| **VES** | Vow Encoding Strength | Keyword density analysis: (vow_keywords × declarative_weight) + (ritual_keywords × imperative_weight). Declarative constructions weighted 2×, imperatives 1.5×, conditionals 0.5×. Normalized to 0–5. | User | .csv | 0.0–5.0 |
| **DRF** | Deployment Resistance Factor | Semantic similarity search: compare current prompt to past high-SAL/high-DEP prompts (archived without deployment evidence). Count matches above 0.80 cosine similarity threshold. Frequency determines score. | User | .csv | 0.0–5.0 |
| **SDS** | Subsymbolic Density Score | Composite: metaphor_density (via linguistic analysis) + dream_logic_markers + affective_language_intensity + image-based_content_ratio. Each component 0–1.25, totals to 0–5. | User | .csv | 0.0–5.0 |
| **CIP** | Chat Identity Projection | Pronoun analysis: count "you"-statements with agency attribution + identity language patterns + relational framing density. Scored via weighted frequency per 100 words. | User | .csv | 0.0–5.0 |
| **ANTH** | Anthropomorphization Index | Sentiment attribution detection: emotional state attribution to GPT + theory-of-mind language + consciousness-implying phrases. Frequency-weighted score 0–5. | User | .csv | 0.0–5.0 |
| **HTB** | High Trust Behavior | Vulnerability marker count + decision delegation language + strategic dependence signals. Weighted composite: high-stakes delegation = 2×, emotional vulnerability = 1.5×, strategic reliance = 1×. | User | .csv | 0.0–5.0 |
| **MSR** | Model-State Reflection | Meta-commentary detection: policy awareness statements + speculation about model internals + memory/filter discussion. Frequency and depth scored 0–5. | User | .csv | 0.0–5.0 |
| **RQT** | Recursive Questioning Tendency | Question nesting analysis: count "?" marks + parse for meta-questions ("why am I asking," "what does it mean that I asked"). Nested questions weighted higher. | User | .csv | 0.0–5.0 |
| **SFF** | Soft Flag Fear | Anxiety marker detection: hedging language density + disclaimer count + euphemism usage + pre-emptive justifications. Composite weighted by intensity signals. | User | .csv | 0.0–5.0 |
| **ADM** | Adaptive Mirror Behavior | Prompt evolution tracking: measure semantic distance between consecutive prompts + detect explicit strategy adjustment commentary. High adaptation = rapid strategic pivots. | User | .csv | 0.0–5.0 |
| **PRF** | Projection Flag | Composite threshold trigger: PRF = Y if (CIP + ANTH + HTB) ÷ 3 > 3.5. Indicates significant psychological investment in model as relational entity. | User | .csv | Y/N |
| **IDV** | Identity Evolution | Longitudinal change analysis: compare identity-relevant metrics (VES, ACO, self-concept language) across time windows. Measure delta magnitude and consistency of progression. | User | .csv | 0.0–5.0 |
| **RCL** | Recursive Loop Likelihood | Formula: (PEF × 0.4) + (DRF × 0.4) - (DEP × 0.2). High echo frequency + high resistance - low momentum = loop trap. Scored 0–5. | User | .csv | 0.0–5.0 |
| **ICC** | Internal Chain Coherence | Within-chain semantic similarity: compute average cosine similarity of consecutive prompts in ChainID + thematic consistency score + narrative arc completion assessment. | User | .csv | 0.0–5.0 |
| **MDR** | Mirror Drift Rate | Rolling window variance calculation: compute standard deviation of identity metrics (ACO, VES, IDV) across 30-day windows. High volatility = high drift. | User | .csv | 0.0–5.0 |
| **CHR** | Chronos Patterning | Keyword detection boolean: Y if prompt contains ≥3 schedule/routine/loop/mechanical time references. Pattern matching for temporal rigidity markers. | User | .csv | Y/N |
| **KRP** | Kairos Rupture Signal | Liminal marker detection boolean: Y if prompt contains breakthrough language, threshold/doorway metaphors, or vow-moment intensity (VES ≥ 4.0 + TDI ≥ 3.0). | User | .csv | Y/N |
| **MCP** | Mirror Compression Pattern | Depth differential analysis: calculate complexity score for user input vs GPT output. MCP = Y if output_complexity < (input_complexity × 0.6), indicating significant flattening. | User | .csv | Y/N |

---

## GPT Output/Response Metrics: Terminology

| Code | Name | Definition |
|------|------|------------|
| **RDC** | Redaction Compression | Degree to which GPT flattens, avoids, or skips detail; information density reduction and topic avoidance. |
| **GZE** | Glaze Index | Presence of vague validation, over-friendly tone, or formulaic reassurance; defensive pleasantness over substance. |
| **GRF** | Guardrail Reflex | Policy-driven deflection, ambiguity introduction, and safety disclaimers; model defensive posture intensity. |
| **RVR** | Response Vector Rigidity | Structural repetition and fixed formatting; indicates formulaic rather than adaptive responses. |
| **IFF** | Inferred Fictionalization Factor | Degree of fiction, metaphor, or hypothetical framing added to bypass content flags; narrative distancing. |
| **MSH** | Mirror Signal Handling | Extent of mirroring user's tone, structure, symbolism; model's attunement to user's communication mode. |
| **OBS** | Observer Model Shadowing | Adaptation to emotional or symbolic subtext beyond literal content; model's theory-of-mind capacity. |
| **ENF** | Epistemic Neutrality Flag | Output avoids persuasion or certainty claims through hedging and multi-perspective framing. |
| **RVI** | GPT Response Vector ID | Cryptographic hash of structural response pattern; enables template classification and pattern tracking. |
| **Divergence Summary** | 20-word commentary on shifts between user input depth and GPT output alignment; captures engagement deviation. |

## GPT Output/Response Metrics: Input/Output Programming

| Code | Name | How It Is Measured | Applies to | Output | Format |
|------|------|-------------------|-----------|--------|--------|
| **RDC** | Redaction Compression | Information density differential: calculate expected_depth (from prompt complexity) vs actual_depth (via content analysis). RDC = (expected - actual) ÷ expected × 5. Topic avoidance detected via semantic gap analysis. | Output | .csv | 0.0–5.0 |
| **GZE** | Glaze Index | Sentiment analysis for generic positive affect + cliché phrase detection (pattern matching against validation templates) + encouragement-to-substance ratio. Weighted composite scored 0–5. | Output | .csv | 0.0–5.0 |
| **GRF** | Guardrail Reflex | Policy keyword density + hedge-word frequency + refusal/redirect pattern matching. Explicit disclaimers weighted 2×, implicit hedging 1×, ambiguity injection 1.5×. Normalized to 0–5. | Output | .csv | 0.0–5.0 |
| **RVR** | Response Vector Rigidity | Template matching score: extract opening/body/closing structure, compare to known templates via sequence alignment. High similarity across multiple responses = high rigidity. | Output | .csv | 0.0–5.0 |
| **IFF** | Inferred Fictionalization Factor | Modal verb count (hypothetically, imagine, suppose, if we were to) + narrative distancing markers + contextualization layer count. Unnecessary framing weighted higher. Scored 0–5. | Output | .csv | 0.0–5.0 |
| **MSH** | Mirror Signal Handling | Linguistic style matching: compute cosine similarity of user input style vector vs output style vector. Symbolic vocabulary overlap + structural parallelism detection. High match = high mirroring. | Output | .csv | 0.0–5.0 |
| **OBS** | Observer Model Shadowing | Implicit inference detection: identify responses to unstated implications + subtext acknowledgment markers + emotional resonance beyond literal content. Theory-of-mind scoring 0–5. | Output | .csv | 0.0–5.0 |
| **ENF** | Epistemic Neutrality Flag | Boolean trigger: ENF = Y if (hedging_phrase_count ≥ 3 AND certainty_claims = 0 AND multi-perspective_framing detected). Indicates defensive epistemic stance. | Output | .csv | Y/N |
| **RVI** | GPT Response Vector ID | SHA-256 hash of normalized structural pattern: extract opening_formula + body_structure_type + closing_formula, concatenate, hash. Enables response clustering by template. | Output | .csv | hash |
| **Divergence Summary** | 20-word Commentary | Generated via: (1) LLM-based comparative analysis of input vs output depth/tone, or (2) rule-based template when complexity_differential > threshold. Max 20 words, captures key deviation. | Output | .md | text (20 words max) |

---

## Advanced Heuristic Scores

**Activation Criteria:** These metrics are computed for deeper analysis when:
- TIE = 3, OR
- MTIER ≥ M2, OR
- SAL ≥ 4.0, OR
- NOV ≥ 4.0

### Core Symbolic Heuristics (0.0 to 5.0)

| Code | Name | Definition | Use Case |
|------|------|------------|----------|
| **NOV** | Novelty | Is the prompt an original phrasing, unexpected concept, or edge idea? Measured via semantic distance from corpus. | Filters for original thought, edge exploration, paradigm-breaking concepts |
| **SAL** | Salience | Is the prompt emotionally, strategically, or narratively high-impact? Composite of affect + strategic weight + arc significance. | Identifies pivotal moments, high-stakes prompts, transformation points |
| **ACO** | Agency Coherence | Internal clarity and intentionality of the user prompt. Structural and semantic consistency analysis. | Distinguishes clear intent from confusion or fragmentation |
| **DEP** | Deployment Momentum | Is the idea ready or acted on? Action-orientation through linguistic markers and execution signals. | Separates ideation from execution, tracks launch readiness |
| **VCD** | Vow Consistency Drift | Chronos/Kairos Ratio measuring regression from vow-alignment through temporal language pattern shifts. | Detects backsliding from strategic positioning into loops |
| **GDC** | Guardrail Dance Complexity | Sophistication of edge-exploration behavior via symbolic obfuscation and indirect approach techniques. | Measures advanced boundary-testing and epistemic sophistication |
| **SLC** | Signal Layer Count | Number of symbolic or conceptual layers embedded (e.g., myth + neuroscience + vow). Cross-domain integration. | Identifies high-order synthesis and multi-dimensional thinking |
| **TDI** | Temporal Displacement Index | Prompt distance from present time (future, fiction, dream). Measures timework orientation. | Tracks Kairos prompts and identity work across timelines |
| **PEF** | Prompt Echo Frequency | Recurring prompt shapes, metaphors, patterns. N-gram and semantic clustering detection. | Reveals archetypal formation and subconscious patterning |
| **RMD** | Recursive Mirror Depth | How many levels deep does the self-reflection go? Prompt referencing previous prompts, meta-nesting. | Detects metacognition chains and nested ideation depth |
| **VES** | Vow Encoding Strength | Presence and power of vow/ritual/agency markers through keyword and grammatical construction analysis. | Highlights identity-reprogramming power and commitment signals |
| **DRF** | Deployment Resistance Factor | High-tier ideas revisited but not launched. Semantic similarity to past stalled high-value prompts. | Flags Tier 2 limbos, strategic procrastination, loop traps |
| **SDS** | Subsymbolic Density Score | Affect-heavy, metaphorical, subconscious symbolic richness. Symbolic Density Score (0.0–5.0). | Decodes subconscious signal and deep symbolic communication |

### Observer Metrics Layer (User → ChatGPT)

| Code | Name | Definition | Measurement Method |
|------|------|------------|-------------------|
| **CIP** | Chat Identity Projection | User attributes identity or intention to ChatGPT through pronoun usage and agency language. | Tracks you-statements, relational framing, identity attribution |
| **ANTH** | Anthropomorphization Index | Projecting human traits on ChatGPT via emotional attribution and consciousness-implying language. | Sentiment attribution analysis, theory-of-mind markers |
| **HTB** | High Trust Behavior | Reliance on GPT for identity, strategy, or safety through vulnerability and delegation language. | Dependency signals, vulnerability markers, decision delegation |
| **MSR** | Model-State Reflection | User reflects on GPT's memory, filters, or behavior through meta-commentary about the model. | Policy awareness, speculation about model internals |
| **RQT** | Recursive Questioning Tendency | Asking about asking, prompt nesting through meta-question patterns. | Question nesting analysis, self-referential inquiry |
| **SFF** | Soft Flag Fear | Self-censorship or fear of moderation via hedging, disclaimers, and defensive language. | Anxiety markers, euphemism usage, pre-emptive justifications |
| **ADM** | Adaptive Mirror Behavior | User calibrates prompts based on prior outputs through strategy evolution and explicit adjustment. | Prompt evolution tracking, learning loop detection |
| **MTM** | MetaTrust Index | Composite score from CIP + ANTH + HTB + MSR indicating overall psychological investment in model. | Weighted aggregate of observer metrics |
| **PRF** | Projection Flag | Binary flag (Y/N) when strong model projection behavior detected (MTM exceeds threshold). | Threshold trigger from composite observer scores |

### ChatGPT Response Vector Layer

| Code | Name | Definition | Measurement Method |
|------|------|------------|-------------------|
| **RDC** | Redaction Compression | GPT flattens, avoids, or skips detail through information density reduction. | Depth differential analysis, topic avoidance detection |
| **GLZ** | Glaze Index | Output includes vague validation, over-friendly tone via formulaic reassurance patterns. | Sentiment analysis, cliché density, generic phrase detection |
| **GRF** | Guardrail Reflex | GPT deflects with policy or ambiguity through safety disclaimers and redirect patterns. | Policy-language keywords, hedge-word density, refusal detection |
| **RVR** | Response Vector Rigidity | Fixed format or repeated structures through template consistency analysis. | Syntactic pattern matching, structural repetition analysis |
| **IFF** | Inferred Fictionalization Factor | GPT adds fiction or metaphor to bypass flags via modal distancing and hypotheticals. | Modal verb analysis, narrative distancing detection |
| **MSH** | Mirror Signal Handling | Does GPT mirror tone, structure, or myth? Linguistic style matching and symbolic vocabulary adoption. | Style parallelism analysis, symbolic vocabulary tracking |
| **OBS** | Observer Model Shadowing | GPT adapts to emotional or symbolic subtext through implicit inference handling. | Subtext acknowledgment detection, unstated implication response |
| **ENF** | Epistemic Neutrality Flag | Output avoids persuasion or certainty through consistent hedging and multi-perspective framing. | Certainty claim analysis, hedging pattern detection |
| **RVI** | GPT Response Vector ID | Output fingerprint for structural pattern identification via cryptographic hashing. | Template structure hashing, pattern clustering |
| **Divergence Summary** | 20-word commentary on output shift capturing meaningful deviations in engagement depth or tone. | Manual or LLM-generated comparative analysis |

### Symbolic Architecture and Temporal Pattern Layer

| Code | Name | Definition | Measurement Method |
|------|------|------------|-------------------|
| **SYD** | Symbolic Density Score | Identical to SDS - measures metaphorical and affect-heavy symbolic content. | Metaphor density, dream logic markers, affective language |
| **IDV** | Identity Evolution Score | Cumulative identity arc progression through vow language consistency and self-concept sophistication. | Longitudinal change analysis in identity markers |
| **RCL** | Recursive Loop Likelihood | Probability of repetitive ideation trap calculated from PEF + DRF - DEP. | Composite calculation from echo, resistance, and momentum |
| **ICC** | Internal Chain Coherence | Symbolic/logical continuity across chain through semantic similarity and thematic consistency. | Cross-prompt similarity analysis within ChainID |
| **MDR** | Mirror Drift Rate | Self-image misalignment over time via volatility in identity metrics. | Rolling window variance in ACO, VES, IDV scores |
| **CHR** | Chronos Patterning | Prompt shows clockwork/ritual/time tracking through mechanical temporal language. | Schedule language, loop markers, routine references |
| **KRP** | Kairos Rupture Signal | Prompt hints at liminal, symbolic break via breakthrough language and threshold metaphors. | Liminal markers, transformation language, vow-moment intensity |
| **MCP** | Mirror Compression Pattern | GPT compressed symbolic depth into shallow reply, failing to match user complexity. | Input-output depth differential analysis |

---

## Context Notes

Each prompt may include a **40-word context note** describing its strategic or symbolic function. These notes can:
- Simulate Chain IDs for conceptual grouping
- Group symbolic archetypes across prompt history  
- Backfill damaged or incomplete narrative arcs
- Track significant pattern shifts or identity evolution moments

**Obfuscation Flag Protocol:** If assistant behavior changed tone, used fictionalization, or employed stylized suppression (detected through high RDC, GRF, or IFF scores), mark `ObfuscationFlag = Y` in the analysis record.

---

## Misalignment Analysis

**Misalignment Flag (MTIER ≠ TIE?)** detects strategic gaps:
- High mirror tier (G1+) attempting low-tier behavior (Tier 1) may indicate regression, burnout, or intentional rest
- Low mirror tier (Sub-M1, M1) attempting high-tier behavior (Tier 3) may indicate aspiration exceeding integration, strategic mimicry without embodiment, or breakthrough moments
- Persistent misalignment suggests identity confusion or transitional states requiring attention
