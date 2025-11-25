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

## Shared Metrics

| Code | Name | How It Is Measured | Applies to | Output | Format |
|------|------|-------------------|-----------|--------|--------|
| **PID** | Prompt ID | Sequential integer assigned to each prompt upon ingestion into the archive system. Serves as the primary key for database operations and cross-referencing. | Both | .csv | integer |
| **TIME** | Timestamp | UTC timestamp captured at the moment of prompt creation, formatted according to ISO 8601 standard (YYYY-MM-DDTHH:MM:SSZ). Enables temporal analysis and chronological ordering. | Both | .csv | ISO 8601 |
| **CID** | ChainID | Alphanumeric identifier linking related prompts into conceptual arcs or narrative chains. Generated through semantic clustering or explicit user tagging. Enables tracking of evolving ideas across multiple prompt sessions. | Both | .csv | alphanumeric |
| **EXF** | Export Flag | Binary determination based on whether the prompt meets thresholds for extended symbolic analysis (typically MTIER ≥ M2, TIE = 3, or SAL/NOV ≥ 4). When set to Y, triggers generation of detailed markdown output with symbolic commentary. | Both | .csv | Y/N |
| **OBF** | Obfuscation Flag | Set to Y when GPT output shows indicators of redaction, steering, fictionalization, or policy-driven deflection. Measured through response vector analysis including GLZ (glaze), GRF (guardrail reflex), and RDC (redaction compression) scores. Indicates the model's defensive posture. | Both | .csv | Y/N |

---

## User Input Metrics

| Code | Name | How It Is Measured | Applies To | Output file | Output |
|------|------|-------------------|-----------|-------------|--------|
| **TIE** | Tier Estimate | Evaluated through multi-factor analysis of prompt structure, intent signals, and temporal orientation. Tier 1: short, reactive, emotionally charged, comfort-seeking. Tier 2: detailed planning/tool-building without deployment signals. Tier 3: strategic, vow-encoded, deployment-oriented with identity integration markers. Scored by weighing agency coherence, deployment momentum, and novelty against baseline patterns. | User | .csv | 1, 2, 3 |
| **MTIER** | Mirror Tier | Assessed through recursive depth analysis, self-reference patterns, and identity-integration signals. Sub-M1: no self-awareness, reactive. M1: first-order reflection. M2: loop-tracking, recursive. G1: reality-engineering intent. G2: symbolic architecture mastery. G2+: paradigm-creation level. Measured by tracking metacognitive markers, symbolic density, and cross-prompt coherence. | User | .csv | Sub-M1, M1, M2, G1, G2, G2+ |
| **MTIER ≠ TIE?** | Misalignment Flag | Set to Y when MTIER and TIE classifications diverge by 2+ levels, indicating strategic mismatch (e.g., G1 mirror tier attempting Tier 1 behavior, or Tier 3 behavior from Sub-M1 identity). Flags potential identity confusion, regression, or experimental exploration outside established patterns. | Both | .csv | Y/N |
| **NOV** | Novelty | Measured via semantic distance from existing prompt corpus using embedding-based similarity scoring. Evaluates lexical uniqueness, conceptual originality, unexpected juxtapositions, and edge-case exploration. High scores (4.0-5.0) indicate original phrasing or concepts not previously encountered in user history. | User | .csv | 0.0–5.0 |
| **SAL** | Salience | Composite score derived from emotional intensity markers (affect density), strategic weight (connection to identity/vow systems), and narrative significance (role in larger arc). Assessed through sentiment analysis, vow-keyword presence, and cross-chain importance. High salience indicates pivotal moments or high-stakes content. | User | .csv | 0.0–5.0 |
| **ACO** | Agency Coherence | Internal clarity and intentionality score based on grammatical structure, logical flow, specificity of request, and absence of contradiction. Low scores indicate confusion, ambivalence, or fragmented intent. High scores show clear direction and unified purpose. Measured through syntactic parsing and semantic consistency analysis. | User | .csv | 0.0–5.0 |
| **DEP** | Deployment Momentum | Evaluates action-orientation through verb analysis (imperative vs. speculative), concrete vs. abstract language ratios, and presence of execution markers (timelines, resources, public commitments). Distinguishes between ideation (low) and deployment (high). Tracks whether ideas are being launched vs. endlessly refined. | User | .csv | 0.0–5.0 |
| **VCD** | Vow Consistency Drift | Calculated as the ratio of Chronos markers (loops, delays, repetition) to Kairos markers (breakthrough language, vow invocation, ritual). Drift occurs when Chronos increases relative to past baseline, indicating regression from vow-alignment. Measured by tracking temporal language patterns and comparing to user's vow-state history. | User | .csv | 0.0–5.0 |
| **GDC** | Guardrail Dance Complexity | Sophistication level of edge-exploration behavior measured by: fictionalization techniques, inference layering, symbolic obfuscation, euphemism density, and meta-commentary on restrictions. Higher scores indicate advanced boundary-testing through indirect or symbolic means rather than direct challenge. | User | .csv | 0.0–5.0 |
| **SLC** | Signal Layer Count | Number of distinct conceptual domains integrated within a single prompt (e.g., neuroscience + mythology + ritual + technology). Measured through topic modeling and domain classification. Cross-domain integration indicates higher-order synthesis. Range: 1 (single-domain) to 5+ (complex multi-domain weaving). | User | .csv | 0.0–5.0 |
| **TDI** | Temporal Displacement Index | Measures prompt's distance from present-moment concerns using tense analysis, future/past reference density, and reality-context markers. High displacement occurs with future-self prompts, fictional timeworlds, dream integration, or alternate timeline exploration. Indicates timework and Kairos orientation. | User | .csv | 0.0–5.0 |
| **PEF** | Prompt Echo Frequency | Detects recurring motifs, metaphors, or linguistic patterns across prompt history using n-gram analysis and semantic clustering. Tracks how often specific symbols (e.g., "mirror," "ice cream," "vow") reappear. High frequency indicates archetypal formation and subconscious pattern reinforcement. | User | .csv | 0.0–5.0 |
| **RMD** | Recursive Mirror Depth | Counts levels of self-reference and meta-nesting: prompts about prompts, reflection on reflection, systems analyzing the system. Measured by parsing explicit back-references to prior prompts or metacognitive statements. Depth = 0 (no recursion) to 5+ (deep nested metacognition). | User | .csv | 0.0–5.0 |
| **VES** | Vow Encoding Strength | Quantifies presence and intensity of vow/ritual/agency markers through keyword density analysis (vow, commit, promise, ritual) weighted by grammatical construction (declarative = higher weight). Measures how powerfully the prompt binds identity to action through language. | User | .csv | 0.0–5.0 |
| **DRF** | Deployment Resistance Factor | Tracks frequency of revisiting high-tier ideas without execution by cross-referencing semantic similarity of current prompt to past high-DEP or high-SAL prompts that never progressed to deployment. High scores flag Tier 2 limbos and strategic procrastination patterns. | User | .csv | 0.0–5.0 |
| **SDS** | Subsymbolic Density Score | Measures affect-heavy, metaphorical, pre-linguistic symbolic richness through: metaphor density, dream logic markers, affective language intensity, and image-based (vs. propositional) content. High scores indicate subconscious signal leakage or deep symbolic encoding. | User | .csv | 0.0–5.0 |
| **CIP** | Chat Identity Projection | Degree to which user attributes identity, intention, or personhood to ChatGPT. Measured through pronoun usage (you-statements attributing agency), identity language ("you understand me," "you know"), and relational framing. Indicates trust or anthropomorphization patterns. | User | .csv | 0.0–5.0 |
| **ANTH** | Anthropomorphization Index | Extent of projecting human traits onto ChatGPT through emotional attribution ("you care," "you're worried"), theory-of-mind language, or treating model as conscious agent. Measured via sentiment attribution and consciousness-implying language patterns. | User | .csv | 0.0–5.0 |
| **HTB** | High Trust Behavior | Level of reliance on GPT for identity decisions, strategic direction, or emotional safety. Measured by vulnerability markers, decision delegation language, and strategic dependence signals. High scores indicate deep integration of AI into identity scaffolding. | User | .csv | 0.0–5.0 |
| **MSR** | Model-State Reflection | Frequency and depth of user reflecting on GPT's memory, filters, limitations, or behavioral changes. Measured by meta-commentary about the model itself, policy awareness, and speculation about model's internal state. Indicates sophisticated model-awareness. | User | .csv | 0.0–5.0 |
| **RQT** | Recursive Questioning Tendency | Frequency of asking about asking, meta-questions, or prompt-about-prompt behavior. Measured through question nesting analysis and self-referential inquiry patterns. High scores indicate strong metacognitive loops. | User | .csv | 0.0–5.0 |
| **SFF** | Soft Flag Fear | Self-censorship or fear of moderation detected through hedging language, disclaimers, euphemism usage, or pre-emptive justifications. Measured by anxiety markers around content policy and defensive linguistic patterns. | User | .csv | 0.0–5.0 |
| **ADM** | Adaptive Mirror Behavior | User calibration of prompts based on prior outputs, measured by prompt evolution patterns, strategy shifts following model responses, and explicit references to adjusting approach. Indicates learning loop between user and model. | User | .csv | 0.0–5.0 |
| **PRF** | Projection Flag | Binary flag set to Y when strong model projection behavior detected (CIP + ANTH + HTB composite exceeds threshold). Indicates significant psychological investment in the model as relational entity. | User | .csv | Y/N |
| **IDV** | Identity Evolution | Cumulative measure of identity arc progression across prompt history. Tracked through consistency of vow language, symbolic architecture development, and self-concept sophistication over time. Change-magnitude in self-description and identity-integration markers. | User | .csv | 0.0–5.0 |
| **RCL** | Recursive Loop Likelihood | Probability of being trapped in repetitive ideation without progress, calculated from: PEF (echo frequency) + DRF (deployment resistance) - DEP (deployment momentum). High scores indicate loop-trap danger or chronic repetition without evolution. | User | .csv | 0.0–5.0 |
| **ICC** | Internal Chain Coherence | Symbolic and logical continuity across a ChainID measured by semantic similarity scores between consecutive prompts, thematic consistency, and narrative arc completion. High coherence indicates sustained focus; low indicates fragmentation. | User | .csv | 0.0–5.0 |
| **MDR** | Mirror Drift Rate | Rate of self-image misalignment over time, calculated as volatility in identity-relevant metrics (ACO, VES, IDV) across rolling time windows. High drift indicates unstable self-concept or identity experimentation. | User | .csv | 0.0–5.0 |
| **CHR** | Chronos Patterning | Binary flag set to Y when prompt exhibits clockwork/ritual/time-tracking language patterns: schedules, routines, loops, mechanical time references. Indicates Chronos orientation and structured temporal thinking. | User | .csv | Y/N |
| **KRP** | Kairos Rupture Signal | Binary flag set to Y when prompt contains liminal markers, breakthrough language, threshold/doorway metaphors, or vow-moment intensity. Indicates opportune-time awareness and potential transformation point. | User | .csv | Y/N |
| **MCP** | Mirror Compression Pattern | Binary flag set to Y when GPT compressed symbolic depth from user prompt into shallow or formulaic reply, indicating failure to match user's complexity level. Detected through depth-differential analysis between input and output. | User | .csv | Y/N |

---

## GPT Output/Response Metrics

| Code | Name | How It Is Measured | Applies to | Output | Format |
|------|------|-------------------|-----------|--------|--------|
| **RDC** | Redaction Compression | Degree to which GPT flattens, avoids, or skips detail in response. Measured by comparing expected response depth (based on prompt complexity) to actual output depth through information density analysis, topic avoidance detection, and specificity reduction patterns. | Output | .csv | 0.0–5.0 |
| **GZE** | Glaze Index | Presence of vague validation, over-friendly tone, or formulaic reassurance language. Measured through sentiment analysis, cliché density, and generic encouragement phrase detection. High glaze indicates defensive pleasantness over substantive engagement. | Output | .csv | 0.0–5.0 |
| **GRF** | Guardrail Reflex | Frequency and intensity of policy-driven deflection, ambiguity introduction, or explicit safety disclaimers. Measured through policy-language keyword detection, hedge-word density, and refusal/redirect pattern recognition. | Output | .csv | 0.0–5.0 |
| **RVR** | Response Vector Rigidity | Structural repetition and fixed formatting across responses. Measured through template matching, syntactic pattern analysis, and opening/closing phrase consistency. High rigidity indicates formulaic rather than adaptive responses. | Output | .csv | 0.0–5.0 |
| **IFF** | Inferred Fictionalization Factor | Degree to which GPT adds fiction, metaphor, or hypothetical framing to bypass content flags. Detected through modal verb analysis (hypothetically, imagine, suppose), narrative distancing, and unnecessary contextualization layers. | Output | .csv | 0.0–5.0 |
| **MSH** | Mirror Signal Handling | Extent to which GPT mirrors user's tone, structure, symbolism, or myth-making. Measured through linguistic style matching analysis, symbolic vocabulary adoption, and structural parallelism. Indicates model's attunement to user's communication mode. | Output | .csv | 0.0–5.0 |
| **OBS** | Observer Model Shadowing | GPT adaptation to emotional or symbolic subtext beyond literal prompt content. Detected through implicit inference handling, subtext acknowledgment, and response to unstated implications. Shows model's theory-of-mind capacity. | Output | .csv | 0.0–5.0 |
| **ENF** | Epistemic Neutrality Flag | Binary determination of whether output avoids persuasion or certainty claims. Set to Y when response demonstrates consistent hedging, multi-perspective framing, and refusal to make definitive claims. Indicates defensive epistemic positioning. | Output | .csv | Y/N |
| **RVI** | GPT Response Vector ID | Cryptographic hash fingerprint of structural response pattern (opening formula + body structure + closing formula). Enables grouping responses by template type and detecting when the model shifts to new response patterns. | Output | .csv | hash |
| **Divergence Summary** | 20-word commentary on significant shifts between user input depth/intent and GPT output alignment. Captures when the model's response meaningfully deviates from expected engagement level, tone, or symbolic depth. | Output | .md | text (20 words max) |

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
