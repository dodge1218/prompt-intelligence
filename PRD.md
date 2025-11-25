# Prompt Intelligence Engine (PIE)

A sophisticated prompt analysis and scoring interface for evaluating LLM prompts using the ICE + PIE framework.

**Experience Qualities**:
1. **Analytical** - Interface should feel precise and data-driven, providing clear insights into prompt quality
2. **Intelligent** - Smart scoring that feels like a seasoned prompt engineer is reviewing your work
3. **Empowering** - Users should feel they're gaining mastery over prompt crafting through actionable feedback

**Complexity Level**: Light Application (multiple features with basic state)
  - Single-purpose scoring and analysis with persistent storage, but focused on core evaluation rather than full database/vector operations

## Essential Features

### Prompt Input & Management
- **Functionality**: Accept single or batch prompt submissions via textarea
- **Purpose**: Enable users to quickly analyze their prompt writing patterns
- **Trigger**: User pastes prompt text into main input area or clicks "Analyze Prompt"
- **Progression**: Empty state → User pastes prompt → Click analyze → Loading state → Results displayed with scores
- **Success criteria**: Prompts are parsed, stored in KV, and ready for analysis within 1 second

### ICE Score Calculation
- **Functionality**: Compute Idea/Cost/Exploitability metrics for each prompt
- **Purpose**: Quantify prompt quality along three critical dimensions
- **Trigger**: User submits prompt for analysis
- **Progression**: Prompt received → LLM analyzes novelty, token efficiency, reusability → Scores 0-100 generated → Visual radar chart rendered
- **Success criteria**: Each dimension has clear reasoning and score is reproducible

### PIE Tier Classification
- **Functionality**: Classify prompts into 9 categories across 3 tiers (Dopamine/Escape/Loops, Builder/Deploy/Tool, Strategic/Kairos/Self-authoring)
- **Purpose**: Help users understand the cognitive level and intent behind their prompts
- **Trigger**: Automatically runs alongside ICE scoring
- **Progression**: Prompt analyzed → Pattern matching against tier definitions → Primary tier assigned → Secondary traits identified → Category badge displayed
- **Success criteria**: Classification feels accurate and helps user recognize their prompt patterns

### Prompt History & Analytics
- **Functionality**: Persistent storage of all analyzed prompts with filterable history view
- **Purpose**: Enable users to track improvement and identify patterns over time
- **Trigger**: User clicks "History" tab or views past prompts
- **Progression**: History tab opened → Prompts loaded from KV store → Displayed in reverse chronological order → User can filter by tier/score → Click to view details
- **Success criteria**: Users can review 100+ prompts without performance degradation

### Prompt Improvement Suggestions
- **Functionality**: LLM-powered recommendations for upgrading prompts to higher tiers
- **Purpose**: Provide actionable guidance for prompt refinement
- **Trigger**: Analysis completes with tier < 3
- **Progression**: Low-tier prompt detected → LLM generates 3-5 specific improvements → Suggestions shown with before/after examples → User can apply suggestions
- **Success criteria**: Suggestions are specific, actionable, and relevant to the tier upgrade path

## Edge Case Handling
- **Empty input** - Show helpful placeholder text with example prompts to analyze
- **Very long prompts** - Truncate display but analyze full text; warn if exceeds token limits
- **Malformed text** - Sanitize input and handle gracefully with validation messages
- **API failures** - Show retry button and cache partial results; degrade gracefully to basic analysis
- **Storage limits** - Implement automatic pruning of oldest prompts when approaching KV limits

## Design Direction
The design should feel like a high-precision analysis tool used by experts - clinical yet engaging, data-rich yet scannable. Think of a blend between a developer console and a strategic dashboard. Minimal chrome, maximum information density where it matters, with generous whitespace for breathing room between insights.

## Color Selection
**Triadic** - Using purple (intelligence/analysis), cyan (data/precision), and amber (insight/revelation) to represent the analytical, technical, and strategic aspects of prompt evaluation.

- **Primary Color**: Deep Purple `oklch(0.45 0.15 290)` - Represents intelligence, analysis, and depth of thought
- **Secondary Colors**: 
  - Electric Cyan `oklch(0.75 0.12 200)` - Technical precision and data visualization
  - Warm Amber `oklch(0.70 0.13 70)` - Moments of insight and actionable suggestions
- **Accent Color**: Bright Cyan `oklch(0.80 0.15 195)` - Attention for CTAs, active states, and key metrics
- **Foreground/Background Pairings**:
  - Background (Dark Navy `oklch(0.15 0.02 270)`): Light Cyan text `oklch(0.95 0.02 200)` - Ratio 12.1:1 ✓
  - Card (Slate `oklch(0.22 0.02 270)`): White text `oklch(0.98 0 0)` - Ratio 14.3:1 ✓
  - Primary (Deep Purple `oklch(0.45 0.15 290)`): White text `oklch(0.98 0 0)` - Ratio 8.2:1 ✓
  - Secondary (Dark Slate `oklch(0.30 0.03 270)`): Light text `oklch(0.95 0.02 200)` - Ratio 9.5:1 ✓
  - Accent (Bright Cyan `oklch(0.80 0.15 195)`): Dark Navy text `oklch(0.15 0.02 270)` - Ratio 11.8:1 ✓
  - Muted (Medium Slate `oklch(0.35 0.02 270)`): Light Muted text `oklch(0.70 0.02 260)` - Ratio 4.6:1 ✓

## Font Selection
Typography should communicate precision and modernity - like reading a technical spec that somehow feels approachable.

- **Primary**: Inter (700/600/500/400) - Clean, highly legible, technical yet friendly
- **Monospace**: JetBrains Mono (500) - For prompt text, scores, and code-like elements

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight (-0.02em) 
  - H2 (Section Headers): Inter Semibold/24px/tight (-0.01em)
  - H3 (Card Titles): Inter Semibold/18px/normal
  - Body (Analysis Text): Inter Regular/15px/relaxed (1.6)
  - Prompt Text: JetBrains Mono Medium/14px/relaxed (1.5)
  - Metrics/Scores: Inter Semibold/20px/tight
  - Labels: Inter Medium/13px/normal (0.01em)
  - Captions: Inter Regular/12px/normal

## Animations
Animations should feel like data flowing through a system - quick, purposeful, with subtle elasticity that suggests intelligence at work.

- **Purposeful Meaning**: Score animations should feel like calculations completing; tier badges should "lock in" with confidence; transitions should suggest seamless state changes in a processing pipeline
- **Hierarchy of Movement**: 
  - Primary: Score counter animations, radar chart drawing, tier classification reveal
  - Secondary: Card entry/exit, tab transitions, filter applications
  - Tertiary: Hover states, focus indicators, micro-interactions

## Component Selection

- **Components**:
  - `Textarea` - Main prompt input with character count
  - `Button` (variants: default/outline/ghost) - Actions and navigation
  - `Card` - Prompt history items, score displays, analysis containers
  - `Tabs` - Switch between Analyze/History/Settings views
  - `Badge` - Tier indicators, status tags
  - `Progress` - Visual representation of scores
  - `Separator` - Clean divisions between sections
  - `ScrollArea` - History list with many items
  - `Dialog` - Prompt detail view, settings configuration
  - `Label` - Form inputs and metric identifiers
  - `Tooltip` - Explanations for scoring dimensions

- **Customizations**:
  - **Score Radar Chart** - Custom D3 visualization for ICE dimensions
  - **Tier Classification Matrix** - 3x3 grid showing all PIE categories with highlighting
  - **Prompt Diff Viewer** - Before/after comparison for improvement suggestions
  - **Animated Counter** - For score reveals using framer-motion

- **States**:
  - Buttons: Distinct primary (solid accent), secondary (outline), and ghost states; disabled uses muted with 50% opacity
  - Cards: Subtle hover elevation, active state with accent border
  - Inputs: Focus ring using accent color, validation states with amber (warning) or destructive (error)
  - Badges: Different colors per tier (Tier 1: muted, Tier 2: secondary, Tier 3: primary)

- **Icon Selection**:
  - Brain (brain) - Analysis mode
  - ClockCounterClockwise (clock-counter-clockwise) - History
  - ChartPolar (chart-polar) - ICE scores
  - Stack (stack) - PIE tiers  
  - Sparkle (sparkle) - Improvement suggestions
  - Plus (plus) - New prompt
  - FunnelSimple (funnel-simple) - Filter history
  - Lightning (lightning) - Quick actions

- **Spacing**:
  - Page padding: `p-6` (24px)
  - Card padding: `p-6` 
  - Section gaps: `gap-8` (32px)
  - Element gaps within cards: `gap-4` (16px)
  - Tight spacing for labels/values: `gap-2` (8px)

- **Mobile**:
  - Stack tabs vertically below 768px
  - Single column layout for analysis cards
  - Collapsible history items with summary view
  - Fixed bottom action bar for primary CTA
  - Reduce font sizes by 1-2px across hierarchy
  - Reduce padding to `p-4` for cards and page
