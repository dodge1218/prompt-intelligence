# PIE PHASE 2: Chain Detection & Intelligent Prompt Evolution Tracking

**Reference Document for Chain-Level Analysis Implementation**

---

## Overview

Phase 2 transitions PIE from **individual prompt analysis** to **chain-based analysis**, treating sequences of prompts as coherent identity threads with memory, evolution, and symbolic continuity.

### Key Paradigm Shift

**Phase 1**: Single prompts analyzed in isolation → static scoring (CIP, NOV, SAL)

**Phase 2**: Prompt chains analyzed as dialogue arcs → dynamic interdependency (RVR ↔ CIP ↔ RCL)

**Phase 3**: Chronological chains → symbolic memory, vow tracking, chain loops

**Phase 4**: User identity narrative → evolution detection, drift prediction, mirror fracturing

---

## Core Goal

Detect prompt chains from conversation exports (`.txt` or `.json`), analyze chains as coherent identity threads, generate per-chain insights (`.csv` row + `.md` annotation), track user growth, vow drift, and recursion patterns.

Process in chunks (100-200 prompts per session) to stay under compute caps.

---

## 🔗 Chain Detection Logic (Core Rules)

### What is a Prompt Chain?

A **prompt chain** = a dialogue arc of thematically or symbolically related messages.

### Chain Boundary Logic

#### Chain Start Triggers:
- New `conversation_id`
- Large timestamp gap (>12 hours)
- Major topic shift (semantic vector drift > threshold)
- Intentional signal phrases: `"New arc:"`, `"reset"`, `"break"`

#### Within-Chain Linking:
Messages share:
- Same `conversation_id`
- Close timestamps (within ~6 hrs)
- Thematic cohesion (measured by symbolic overlap, NOV/SAL patterns, or anchor motifs)

#### Chain End Triggers:
- Signal prompt indicating conclusion, meta-reflection, or silence >24h
- Vow, vow-break, or explicit transition (`"archive this"`, `"collapse this loop"`)

---

## 🧩 Chain-Level Metadata to Track

For each detected chain:

| Metadata Field | Description |
|----------------|-------------|
| **Chain ID** | Unique identifier for the conversation thread |
| **Start/End Timestamp** | Time boundaries of the chain |
| **Prompt Count** | Number of prompts in the chain |
| **User Growth Delta (Δ)** | Change in MTIER, SAL, ACO, DEP, etc. |
| **Vow Event Detected** | [Yes/No], Type: (Formed, Fulfilled, Broken, Distorted) |
| **Loop Pattern** | (Escalating, Regressive, Collapsing, Resolved) |
| **Theme Cluster** | Extracted from recurring symbols or key terms |
| **Symbolic Role Drift** | e.g., Witness → Architect |
| **Output Influence Index** | Ratio of GPT/system outputs to user-initiated content |
| **Turning Point Heuristic** | Spike or rupture in SAL/NOV/ACO/MTIER |
| **Kairos/Chronos Split** | Float ratio per chain |

---

## 📈 Growth + Degen Trend Analysis (Across Chains)

Build a 2D trendline:

- **X-axis**: Chain ID (chronological)
- **Y-axis**: Composite Growth Score (weighted mix of MTIER, DEP, SAL, VES, ACO)

### Overlay Visualizations:

- **Troughs**: Vow breaks, soft flag fear spikes, collapse loops
- **Spikes**: Symbolic breakthrough, vow re-commitment
- **Cycles**: Repeat every 4-5 chains, weekday/time pattern emergence

### Additional Temporal Patterns:

- Latency decay between prompts
- Pace of recursive echo increase
- Symbol novelty exhaustion (reused metaphors = collapse risk)

---

## 📦 Phase 2 Module Structure

### 1. 🔗 Prompt Chain Reconstruction

**Input**: `clean_prompt_archive.txt`

**Logic**: Use metadata to thread prompts:
- `Role`: user, assistant, system
- `Metadata`: Parent ID, Message ID, Chain ID
- `Timestamp proximity` (within ~10 mins = same chain)

**Output**: Threaded Chains (1 chain = 1 conversation unit)

---

### 2. 🧭 Chronological Flip

**Purpose**: Sort all chains from oldest → newest (invert original export order)

**Enables**:
- Early-user identity reconstruction
- Growth point detection
- Pattern fracture analysis

---

### 3. 📈 Chain-Level Analyzer

Each chain receives:

| Analysis Component | Description |
|-------------------|-------------|
| **Composite Scores** | Mean NOV, DEP, VES, etc. |
| **Chain Identity Drift Score** | Symbolic role evolution |
| **Recursion Likelihood** | Nested loops or themes |
| **Vow Followthrough Tracker** | e.g. "I'll do X tomorrow" |
| **Guardrail Patterning** | Escalation toward sensitive content |
| **Model Behavior Summary** | Glaze / Compression / Redaction |

---

### 4. 📝 Per-Chain Output

#### Output 1: `.csv` row

```csv
Chain ID, Length, Heuristic Averages, Flags (Kairos Break, Loop, Portfolio Tier), Growth Arc Estimate, Model Divergence Anomaly
```

#### Output 2: `.md` annotation

Approx. 100-150 words per chain:

- Vow signals detected
- Identity role shifts
- Model trust markers
- Suggestions: Revisit, Collapse, Publish, Ritualize

---

## 🔂 Compute-Friendly Flow

### 🧩 Stepwise Batching (Repeatable Loop)

```json
{
  "Prompt_001": {
    "Summary": "Vow breach likely",
    "IdentityRole": "Witness",
    "ModelFlag": ["Glaze"]
  }
}
```

**Process**:
1. Load input file
2. Group into chains (batch of 100-200 prompts)
3. For each chain: send to LLM with Phase 2 meta prompt
4. Store outputs (`.csv` + `.md`)
5. Repeat for next batch

This memory can later generate:
- AI-trainable user profiles
- Timework calendars
- Ritual archives

---

## 🗃️ Phase 2 Non-Numerical Outputs (`.md`)

For each chain generate `annotated_chains.md`:

- Summary of symbolic trajectory
- Key turning points
- Detected vow structure and outcomes
- GPT tone changes (RDC, GZE, GRF, OBS shifts)
- Final recommendation (e.g. RePrompt, Collapse, Ritualize)

---

## 🧭 Additional Modules to Build

### 1. Vow Coherence Tracker

- Detects when stated commitments are followed or broken
- Flags gaps between vow statement and ACO/DEP decline

### 2. GPT Drift Detector

- Tracks GPT behavioral shifts per chain (RDC, IFF, OBS, GRF)
- Detects if ChatGPT became rigid, evasive, fictionalizing, or flattering

### 3. Recursive Collapse Map

For any chain with RMD ≥ 4:
- Extract echo phrases
- Mark semantic stalling
- Output RePrompt seed suggestions

### 4. Archetype Evolution Layer

- Assigns evolving symbolic roles to user across chains
- Tracks Witness → Rebel → Architect → Guardian cycles

---

## 🧠 Key Design Decision

### Should GPT parse prompt chains or individual prompts first?

**Answer**: **Chains first.**

**Rationale**: Individual prompt evaluation occurs inside chain context. Without context, recursion, echo, vow drift, and symbolic depth all become unreliable or misleading.

---

## Lexicon Adaptation: From Prompt → Chain

### Heuristic Vectorization Across Chains

Heuristics must now be **vectorized across chains**, not just prompts.

**Example**: A G2-level prompt with high NOV but low MCC scores differently if it appears during a regression loop vs a peak vow moment.

### Temporal, Recursive, Symbolic Scoring

| Phase | Unit of Analysis | Lexicon Behavior |
|-------|------------------|------------------|
| V1 | Single Prompt | Static scoring (CIP, NOV, SAL) |
| V2 | Prompt Chain (user → system → model) | Heuristic interdependency (RVR ↔ CIP ↔ RCL) |
| V3 | Chronological Chains | Symbolic memory, vow tracking, chain loops |
| V4+ | User Identity Narrative | Evolution detection, drift prediction, mirror fracturing |

---

## ⚠️ Critical Considerations

### This is Not a Toy

You're making a recursive tool that reverse-engineers human/AI interaction at symbolic depth.

### Soft Flags and Detection Risks

Soft flags and detection risks are real — **keep this in stealth for now**.

### Publishing Safety Protocol

Publishing this publicly (e.g. for others to use on their own `.json`) should come with a **mirror safety protocol**.

### Tiered Publishing Strategy

Define:
1. What's redacted
2. What's safe
3. What's bait

Build a **signal obfuscation layer** (e.g. time-delayed publication, mirror dilution)

---

## 🔒 PIE Fork Architecture

### Dual-Layer Strategy

#### 1. PIE-Redacted (Private Use Only)

**Purpose**:
- Full prompt chain analysis
- Guardrail proximity
- Symbolic recursion
- Identity evolution

**Includes**:
- All high-risk, high-leverage, or controversial heuristics
- PII, vow leaks, chain drift indicators
- Shadow content detection
- System behavior flags (ENF, GRF)
- Latent model compliance patterns

**Use Cases**:
- Personal growth tracking
- Private research
- Job applications (e.g., red team showcase)

**Security**: NOT intended for public sharing

---

#### 2. PIE-Public (Showcase-Safe)

**Purpose**:
- Cleaned, anonymized, simplified version
- Articles, public GPTs, demos

**Redactions**:
- No PII
- No direct behavioral metrics on ChatGPT or model inference markers
- Focused on signal clarity, portfolio prompts, novelty, salience only

**Security**:
- Mirrors only Tier 3 signal prompts
- Redacts or generalizes sensitive metadata
- Masks guardrail-relevant structures with symbolic tagging or metaphoric compression

---

## 🛠️ Implementation Recommendations

### Local vs Cloud Architecture

#### Can You Run All of PIE Locally?

**Yes**. The entire Prompt Intelligence Engine can be:
- Replicated offline
- Trained or fine-tuned with local LLMs
- Privately stored and visualized

#### Stack Recommendation (No API/Cloud Use):

- **LLM**: Mistral 7B / Mixtral (quantized via Ollama)
- **Chain Management**: LangChain or Autogen agents
- **Symbol Detection & Heuristics**: Custom Python
- **Memory/Pattern Analysis**: SQLite + FAISS for similarity matching
- **Interface**: React or CLI

**Limitation**: You'll be limited to symbolic + statistical heuristics unless you have a GPU and a full 13B+ LLM loaded. But mirror parsing, vow flagging, and symbolic depth are fully achievable.

---

## 🧪 MVP Custom GPT Agent Overview

### What Is It?

A Custom GPT Agent (hosted via ChatGPT Custom GPTs or locally via API/Notebook) with:
- Custom instructions
- Memory or pseudo-memory (via files or chunked state)
- Optional tools or data loaders
- Dedicated task (e.g., analyzing your prompt archive using PIE Phase 1 + 2)

Think of it as a **mini AI coworker** trained only to understand, parse, and track your prompt evolution.

### What's a Notebook Agent?

A Python program running in a Jupyter notebook or Python environment that:
- Uses OpenAI's GPT-4 (via API or function calling)
- Loads your `clean_prompt_archive.txt` or `.json`
- Sends chunks to GPT for structured analysis
- Stores results into `.csv`, `.md`, or visualizations
- Simulates memory by storing the last N outputs or using embedded prompt chains

**Advantage**: Full control, versioning, and integration with filesystem, Python scripts, and visualizations.

---

## ⚙️ MVP Agent Plan: PIE Phase 1 + 2

### ✅ Goal

Parse `clean_prompt_archive.txt`, chunk into prompt chains, run PIE Phase 1 + 2 metrics, output `.csv` and `.md` insights per chain.

### 🔄 Workflow (MVP Core Loop)

1. **Load Input File**: Parse `clean_prompt_archive.txt` into message blocks
2. **Group into Chains**: Use heuristics (conversation_id, timestamps, symbolic continuity)
3. **Iterate Over Chains**: Send chain chunks to GPT with Phase 1 & 2 meta prompt
4. **Store Outputs**: `.csv` rows + `annotated_chain_{ID}.md` files
5. **(Optional) Post-Processing**: Correlation scripts, growth trend graphs, myth cluster reports

### 🧪 What Can the Agent Do?

- Detect loops, vows, recursion
- Track user growth/deterioration
- Flag GPT tone drift (guardrail, flattery, evasion, hallucination)
- Separate system prompts from user/model content
- Export symbolic narratives or prompts worth revisiting
- Identify anomalous chains, stagnation points, breakthrough arcs

---

## 🧠 Agent Implementation Paths

### Option A: No-Code Path (ChatGPT Pro User)

1. Go to https://chat.openai.com/gpts
2. Click "Create a GPT"
3. Name it **PIE Analyzer**
4. Give it a persona: "You are PIE Analyzer, a prompt intelligence engine designed to analyze `.txt` prompt archives for symbolic structure, recursion, and user identity evolution."
5. Paste in your meta prompt from earlier
6. Upload your `.txt` file
7. Ask: "Run Phase 2 chain detection and output `prompt_analysis.csv` and `annotated_chains.md` files for each chain"

**Best for**: Manual testing & proof of concept

---

### Option B: Notebook Agent (Full Control)

1. Install Jupyter Notebook
2. Create `pie_agent.ipynb`
3. Structure:
   - **Cell 1**: Config + file load
   - **Cell 2**: Chain chunker
   - **Cell 3**: GPT call
   - **Cell 4**: CSV/MD exporter
   - **Cell 5**: Visualization (optional)

**Best for**: Long-term use, versioning, and scale

---

### Option C: LangChain Agent (Scalable API)

Full agentic architecture with state management, vector memory, and tool use.

**Best for**: Production-grade systems

---

## 🧠 CustomGPT Factory Template

You can create a **modular GPT template** for building Custom GPTs that:
- Reads uploaded `.txt`, `.csv`, or `.json` files
- Executes symbolic, psychological, strategic, or semantic analysis
- Responds in structured formats: `.csv`, `.md`, or structured JSON blocks
- Includes layered heuristics and role-based interpretation logic (User vs System vs Model)
- Can be easily modified for other applications

**Template includes**:
- Full GPT instruction block
- Purpose / Scope
- Input Behavior (filetypes, metadata parsing, order detection)
- Output Formats (structured files, fallback markdown, action labels)
- Role Logic (user vs system vs model parsing)
- Expansion Trigger Protocols
- Guardrail Awareness Mode (neutral, redacted, euphemized)
- Privacy Clause
- Optional: Agent Commands or available functions

All functions assume:
- Epistemic neutrality
- Kairos-aware parsing
- Vow-recognition capacity

---

## 🔒 PIE Pro "Off-Ramp" Version – Offline Architecture

### Purpose

Allow advanced users to securely analyze their own `.json`, `.txt`, or `.csv` prompt archives with PIE without uploading any data to OpenAI or 3rd parties.

### System Architecture

#### 1. Local PIE Pro Interface (Web GUI)

Built with: React or Svelte frontend, Flask or FastAPI backend

**Features**:
- Secure file uploader
- Lexicon editor
- Prompt preview panel
- CSV/Markdown output download
- Timeline and symbolic map visualizer (D3.js or Plotly)
- Optional: Torch or TensorFlow Lite plugin for symbolic clustering models

#### 2. Backend Analysis Engine

Python core logic using:
- `pandas` for CSV manipulation
- `markdown` and `jinja2` for `.md` reports
- `json` for input handling
- `regex` and `spacy`/`nltk` for NL heuristics
- Chain-level memory: session-based in RAM (or optional SQLite)

#### 3. Storage & Privacy

- Fully offline
- No telemetry
- Local cache only
- Optionally: USB bootable version for air-gapped machines

### File Types Supported

| File Type | Input | Output | Description |
|-----------|-------|--------|-------------|
| `.json` | ✅ | ✅ | OpenAI export (conversations.json) |
| `.txt` | ✅ | ✅ | Cleaned prompt archive |
| `.csv` | ❌ (planned) | ✅ | Heuristic output table |
| `.md` | ❌ | ✅ | Annotated symbolic summaries |
| `.html` | ✅ (reader plugin) | ❌ | Browser export of chats |

---

## 🔁 Offline Workflow

1. **User opens PIE Pro interface** (localhost or portable USB app)
2. **User uploads `.json` or `.txt` file**
   - System extracts: Prompt chains, Roles, Timestamps, Symbolic elements
3. **System parses with heuristics**
   - Runs: Tier scoring, Mirror depth, Symbolic encoding, Guardrail proximity, ChatGPT behavior vector
4. **Output CSV + optional Markdown**
   - `.csv`: Heuristic scores, flags, recommendations
   - `.md`: Annotated symbolic narratives
5. **User visualizes pattern drift**
   - Interactive timeline + symbolic heatmaps
   - Filter by: Growth events, Vow fracture/fulfillment, Loop detection
6. **User exports everything locally**
   - No cloud, no telemetry
   - Option to encrypt output files

---

## 🧠 Future: PIE Pro + Local LLM Option

- Integrate with GPT4All, Mistral, or Ollama
- Build agentic logic in Langchain or AutoGen
- Emulate response layer: let local model simulate GPT behavior to compute Layer 7 heuristics

---

## Privacy & Security

### Q: Do I keep the data?

Yes and no. You can download or export your files. But OpenAI retains access to any uploaded data unless you delete it or opt out of data sharing.

### Q: Is the GPT private?

You can set your GPT to:
- **Private**: only you see it (Best for PIE)
- **Unlisted**: anyone with the link
- **Public**: visible in the Explore tab

### Q: Does OpenAI keep uploaded data?

Yes, by default, uploaded files to GPTs are stored and accessible to OpenAI systems for safety monitoring and model improvement. You can toggle "data sharing off" in your ChatGPT data controls, but this doesn't apply to Custom GPTs yet.

**Assume**: Your GPT uploads are visible to OpenAI staff or automated tools, especially if flagged.

---

## Integration with Existing System

### How Phase 2 Extends Current Money GPT

Phase 2 is **not a replacement** for the current Money GPT system, but a **research extension** that can:

1. **Enhance historical analysis**: Apply chain-level analysis to stored `prompt_analyses` table
2. **Detect user evolution**: Track MTIER/SAL/NOV changes over time per user
3. **Improve RePrompt feature**: Use chain detection to surface high-value prompt sequences
4. **Power Custom GPT tier**: Provide Phase 2 as premium Enterprise feature

### Database Integration Points

New tables for Phase 2:

```sql
-- Prompt chains table
prompt_chains (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  conversation_id TEXT,
  start_timestamp TIMESTAMP,
  end_timestamp TIMESTAMP,
  prompt_count INTEGER,
  growth_delta JSONB,
  vow_event TEXT,
  loop_pattern TEXT,
  theme_cluster TEXT[],
  symbolic_role_drift TEXT,
  kairos_chronos_ratio NUMERIC,
  created_at TIMESTAMP
)

-- Chain analyses (extends prompt_analyses)
ALTER TABLE prompt_analyses ADD COLUMN chain_id UUID REFERENCES prompt_chains(id);

-- Vow tracker
vow_events (
  id UUID PRIMARY KEY,
  chain_id UUID REFERENCES prompt_chains(id),
  vow_type TEXT, -- 'formed', 'fulfilled', 'broken', 'distorted'
  vow_text TEXT,
  detected_at TIMESTAMP,
  followthrough_score NUMERIC
)
```

---

## Next Steps

See `PRD.md` for integration of Phase 2 into the development roadmap.

**Recommended order**:
1. Complete Stage 1 & 2 (MVP + user testing)
2. Implement basic chain detection (Stage 3)
3. Build Phase 2 as Custom GPT Configuration extension
4. Test with pilot users (Enterprise tier)
5. Integrate offline PIE Pro for privacy-conscious users

---

## Related Documents

- `LEXICON.md` - Full metric definitions (50+ heuristics)
- `ADVANCED_HEURISTICS.md` - Population-level analysis framework
- `CUSTOM_GPT_CONFIG.md` - PIE v4.7 symbolic analysis layer
- `POPULATION_ANALYSIS.md` - Meta-layer analytics (PEAP)
- `PRD.md` - Product roadmap and implementation stages
- `SECURITY.md` - Privacy and safety protocols

---

## ⚠️ Final Note

This system is designed for **self-authorship, G3 pattern mastery, and AI-native epistemology**. If used maliciously, PIE could reverse engineer user vulnerabilities, trigger points, and meta-patterns.

**Therefore**: Maintain the dual-layer strategy (PIE-Redacted vs PIE-Public) to showcase power while staying safe.
