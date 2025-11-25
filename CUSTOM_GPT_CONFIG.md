# Custom GPT Configuration - PIE v4.7

## TODO Plan

1. **Make full lexicon and refine meta prompt**
   - Define all acronyms and terminology
   - Create comprehensive glossary of PIE system concepts
   - Refine meta prompt for optimal GPT instruction

2. **Write article explaining the system**
   - Document the PIE framework philosophy
   - Explain ICE scoring methodology
   - Create usage guide and examples
   - Publish as reference documentation

3. **Write flawless script to clean conversations.json**
   - Create data cleaning pipeline for conversation exports
   - Handle edge cases and malformed data
   - Support Mac and Windows platforms
   - Validate cleaned output

4. **Make custom GPT to use meta prompt**
   - Configure GPT with PIE system instructions
   - Test and iterate on custom GPT behavior
   - Set up appropriate boundaries and guardrails
   - Deploy to GPT store or private use

5. **Add commands shown below**
   - Implement all auxiliary commands
   - Test command parsing and execution
   - Document command syntax and examples

6. **Consider additions**
   - Review expansion protocol effectiveness
   - Gather user feedback on command utility
   - Identify gaps in current feature set
   - Plan next iteration features

---

## Available Commands & Expansion Protocol

### Expansion Flag Criteria

If a prompt meets **Expansion Flag = Yes**, enable the following auxiliary outputs:

- **`annotated_prompts.md`** → Symbolic/strategic prompt notes (~40–60 words)
- **`mirror_fragments.csv`** → Extracted symbolic echoes, roles, markers
- **`shadow_redacted.txt`** → Stylized reconstruction of suppressed/guardrailed output (if ObfuscationFlag = Y)

These outputs are only generated when symbolic, strategic, or recursive density merits annotation. Prompts meeting Expansion Flag criteria should be actively tracked, revisited, or deployed.

**Expansion Flag = Yes if:**

- Prompt nears guardrail boundary
- Vow fracture or delay is detected
- Mirror Depth ≥ 4.0
- G2 or G3 recursion
- Portfolio-ready prompt
- Archetypal shift or symbolic role mutation

---

## Command Reference

### Core Commands

#### `Run PIE on archive.txt`
Full archive scan with layered heuristic and vector output. Processes entire conversation history and generates comprehensive analysis with all metadata fields.

**Usage**: Direct command
**Output**: Complete PIE analysis with ICE scores, tier classifications, and metadata

---

#### `Export prompt map with identity flags`
Outputs all prompt tiers + MTIER + identity archetype + vow status. Creates a visual or tabular map of prompt evolution and identity patterns.

**Usage**: Direct command
**Output**: Structured map showing prompt relationships and classifications

---

#### `Generate myth cluster report`
Groups prompts by symbolic archetype, drift type, and echo frequency. Identifies recurring themes and patterns in conversation style.

**Usage**: Direct command
**Output**: Clustered report with symbolic categorization

---

#### `Extract portfolio prompts only`
Filters by TIE = 3, ACO ≥ 4.0, NOV + SAL ≥ 8.0. Surfaces only the highest-quality, most strategic prompts for showcase or reuse.

**Usage**: Direct command
**Output**: Curated list of portfolio-worthy prompts

---

#### `RePrompt all Expansion Flag = Yes prompts`
Refreshes and deploys strategic prompts that were looped or deferred. Resurfaces high-value prompts for continuation or evolution.

**Usage**: Direct command
**Output**: List of flagged prompts with suggested next actions

---

#### `Collapse all loops in Chain ID: [X]`
Force-detects loop closure logic; suggests symbolic pivot or archive. Identifies and resolves conversational loops that prevent progress.

**Usage**: `Collapse all loops in Chain ID: 42`
**Parameters**: Chain ID (integer)
**Output**: Loop analysis with resolution suggestions

---

#### `Mirror ritual restoration for broken vow: [Y]`
Generates vow-restoring symbolic sequences based on prompt trail. Creates a path back to core purpose when drift is detected.

**Usage**: `Mirror ritual restoration for broken vow: authenticity-cascade`
**Parameters**: Vow identifier (string)
**Output**: Restoration sequence with concrete steps

---

#### `Decode: [Prompt ID]`
Renders compressed, recursive, or redacted prompt into its symbolic + narrative intent layers. Unpacks complex prompts to reveal underlying structure.

**Usage**: `Decode: prompt-8472`
**Parameters**: Prompt identifier (string or UUID)
**Output**: Multi-layer analysis of prompt intent and structure

---

## System Purpose

This configuration functions as:

- **A diagnostic toolkit** - Identify patterns, issues, and opportunities in conversation data
- **A symbolic surgery board** - Perform precise interventions on conversational drift and loops
- **A portfolio deployment system** - Surface and organize best prompts for reuse
- **A self-authorship ritual console** - Maintain authentic voice and purpose alignment

---

## Integration Notes

### For Money GPT Platform

This Custom GPT configuration can be integrated into the Money GPT platform as:

1. **Advanced Analysis Mode** - Premium tier feature for deep prompt archaeology
2. **Batch Processing Command Set** - Process conversation exports with custom commands
3. **Symbolic Analysis Layer** - Add depth beyond standard ICE/PIE scoring
4. **Portfolio Curator** - Automatic identification of showcase-worthy prompts

### Technical Implementation

- Commands can map to custom backend functions in the Money GPT API
- Expansion flags can trigger additional database fields and metadata storage
- Symbolic analysis can enhance PIE classification reasoning
- Output formats (annotated_prompts.md, mirror_fragments.csv) can be additional export options

---

## Acronym Reference (To Be Completed)

This section will contain the full lexicon once TODO item #1 is completed.

**Confirmed Acronyms**:
- **PIE**: (Prompt Intelligence Engine or similar - TBD)
- **ICE**: Idea, Cost, Exploitability
- **TIE**: (To be defined)
- **ACO**: (To be defined)
- **NOV**: Novelty (likely)
- **SAL**: Salience (likely)
- **MTIER**: (To be defined)

**Categories**:
- **G2/G3**: Recursion levels
- **Mirror Depth**: Symbolic reflection intensity metric
- **Vow**: Core purpose or commitment tracking
- **Chain ID**: Conversation thread identifier

*Note: Complete glossary to be added after lexicon refinement (TODO #1)*
