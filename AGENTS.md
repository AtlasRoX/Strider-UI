# AGENT DIRECTIVE: STRIDER UI MASTER DESIGN SYSTEM CONSTITUTION

> **CRITICAL INSTRUCTION FOR ALL AI CODING AGENTS (Antigravity, Claude Code, Cursor, Windsurf, Copilot, Codex)**:
> When developing, refactoring, or generating user interfaces in this project, you **MUST EXCLUSIVELY** use the **Strider UI Component Library & Design System**.
> You are strictly forbidden from inventing arbitrary Tailwind colors, creating manual form/modal boilerplate, or importing third-party UI libraries.

---

## 🧭 Mandatory 3-Phase AI Agent Execution Workflow

Whenever you receive a prompt to build, refactor, or extend an application UI in this codebase, you **MUST** follow this exact 3-phase sequence:

```
Step 1: Analyze Strider UI ➔ Step 2: Formulate Strider UI Plan ➔ Step 3: 100% Compliant Execution
```

### Phase 1: Strider UI Codebase Reconnaissance
1. **Scan Available Components**: Inspect `@/components/ui/index.ts` and `REGISTRY.md` to identify all existing atomic, molecular, and enterprise components.
2. **Review OKLCH Tokens**: Check `app/globals.css` for active `--surface-*`, `--ink-*`, `--outline-*`, and `--<theme>-*` CSS custom properties.
3. **Check Contracts**: Re-verify the 2-Axis styling (`variant` + `theme`), P5 form labeling contract, P8 selection family, and P9 imperative dialog services.

### Phase 2: Strider UI Component Mapping & Architectural Plan
Before writing any code, produce an implementation plan that explicitly maps every part of the requested UI to Strider UI primitives:
- **Layout & Shell**: Define container cards, sidebars, headers using `bg-[var(--surface-base)]`, `border-[var(--outline-base)]`, `PageHeader`, `Breadcrumb`.
- **Data & Tables**: Map collections to `DataTable`, `PivotTable`, `KanbanBoard`, or `VirtualList`. Map KPIs to `MetricCard`, `Gauge`, or `Sparkline`.
- **Forms & Inputs**: Map fields to `AutoForm` with Zod schema, or individual `Input`, `PasswordInput`, `Select`, `MultiSelect`, `Switch`, `DatePicker` following the P5 contract.
- **Modals & Overlays**: Map confirmations to `await dialog.confirm()`, destructive actions to `await dialog.danger()`, multi-field prompts to `await dialog.prompt()`, and complex responsive modals to `<ResponsiveDialog>`.
- **Color & Weight Mapping**: Explicitly define the 2-Axis `variant` + `theme` pairs (e.g. `variant="solid" theme="brand"`, `variant="subtle" theme="emerald"`).

### Phase 3: 100% Design-System-Compliant Execution
1. **Exclusively Import from `@/components/ui`**: Never install third-party libraries.
2. **Strict P5 Form Contracts**: Pass `label`, `description`, `error`, and `required` directly to inputs.
3. **No Arbitrary Colors**: Use only Strider OKLCH tokens and 2-axis component themes.
4. **Crisp Engineering Icons**: Use functional Lucide icons (`Bot`, `Cpu`, `Layers`, `Terminal`, `Sliders`, `Code2`, `Boxes`, `Zap`, `Star`). Never use generic glitter stars or magic wands.

---

## 🚨 The 8 Unbreakable Rules of Strider UI

### 1. EXCLUSIVE COMPONENT USAGE
- **ALL** user interface components must be imported directly from `@/components/ui`.
- **NEVER** install or import other component libraries (such as `@chakra-ui`, `@mui/material`, `antd`, `heroui`).
- **NEVER** write raw unstyled HTML primitives (`<button>`, `<input>`, `<select>`, `<dialog>`) when a Strider UI component exists.

### 2. STRICT TWO-AXIS STYLING ONLY (P4)
Components that accept visual styling use **EXACTLY TWO** orthogonal axes:
1. **`variant`** (Visual Weight): `'solid' | 'outline' | 'subtle' | 'ghost' | 'link'`
2. **`theme`** (Concrete Color Tone): `'brand' | 'gray' | 'blue' | 'emerald' | 'amber' | 'rose' | 'violet'`

```tsx
// ❌ FORBIDDEN (Semantic intent aliases or arbitrary tailwind colors)
<Button intent="danger">Delete</Button>
<Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
<Badge color="primary">Active</Badge>
<Badge kind="warning">Pending</Badge>

// ✅ MANDATORY (Two-Axis Strider Mapping)
<Button variant="solid" theme="brand">Save Changes</Button>
<Button variant="outline" theme="gray">Cancel</Button>
<Button variant="solid" theme="rose">Delete Permanently</Button>
<Badge variant="subtle" theme="emerald">Active</Badge>
<Badge variant="subtle" theme="amber">Pending</Badge>
<Badge variant="subtle" theme="blue">Informational</Badge>
<Badge variant="subtle" theme="violet">AI Copilot</Badge>
```

### 3. P5 UNIFORM FORM LABELING CONTRACT
Every form control receives its labeling props (`label`, `description`, `error`, `required`, `prefix`, `suffix`) directly on the input component. The component automatically generates stable unique IDs via `useId()` and links `htmlFor`, `aria-describedby`, and `aria-errormessage`.

```tsx
// ❌ FORBIDDEN (Manual wrapping boilerplate)
<div className="flex flex-col gap-1">
  <label htmlFor="email">Email Address</label>
  <input id="email" type="email" />
  {error && <span className="text-red-500">{error}</span>}
</div>

// ✅ MANDATORY (P5 Contract)
<Input
  label="Email Address"
  description="We'll send your verification link here"
  placeholder="alex@example.com"
  error={errors.email?.message}
  required
  prefix={<Mail className="size-4" />}
/>
```

### 4. P8 DEDICATED SELECTION FAMILY
Never search for or build a monolithic picker. Use the dedicated component based on data type:
- **Single fixed choice (`string`)**: `<Select options={...} />`
- **Multiple tag selection (`string[]`)**: `<MultiSelect options={...} />`
- **Searchable / autocomplete / filtered**: `<Combobox options={...} />`
- **Segmented tab switcher**: `<SegmentedControl options={...} />`
- **Dual-pane transfer**: `<TransferList leftItems={...} rightItems={...} />`

### 5. ZERO-BOILERPLATE IMPERATIVE DIALOGS (P9)
Never build custom modal state (`const [isOpen, setIsOpen] = useState(false)`) just to display confirmations, alerts, or simple text prompts. Use imperative promise-based helpers from `@/lib/dialog`:

```tsx
import { dialog } from '@/lib/dialog'
import { toast } from 'sonner'

// Confirmation Modal:
const confirmed = await dialog.confirm({
  title: 'Publish Production Release?',
  message: 'This will deploy version 2.4.0 to all active edge nodes worldwide.',
  confirmLabel: 'Deploy Now',
})
if (confirmed) toast.success('Deployment initiated!')

// Destructive Warning Modal:
const confirmed = await dialog.danger({
  title: 'Delete Customer Database?',
  message: 'This action is irreversible. All records will be permanently erased.',
  confirmLabel: 'Delete Database',
})
if (confirmed) toast.error('Database deleted')

// Multi-Field Prompt Modal:
const res = await dialog.prompt({
  title: 'Create New Workspace',
  fields: [
    { name: 'name', label: 'Workspace Name', placeholder: 'e.g. Acme Corp', required: true },
    { name: 'slug', label: 'URL Slug', placeholder: 'acme-corp', required: true },
  ],
  confirmLabel: 'Create',
})
```

### 6. OKLCH CSS TOKENS FOR CUSTOM CONTAINERS
For custom cards, page shells, sidebars, and dividers, **ALWAYS** use Strider OKLCH CSS custom properties:
- **Backgrounds**: `bg-[var(--surface-base)]`, `bg-[var(--surface-card)]`, `bg-[var(--surface-muted)]`, `bg-[var(--surface-subtle)]`
- **Borders**: `border-[var(--outline-base)]`, `border-[var(--outline-focus)]`
- **Typography**: `text-[var(--ink-primary)]`, `text-[var(--ink-secondary)]`, `text-[var(--ink-muted)]`
- **Theme Accents**: `bg-[var(--brand-solid)]`, `text-[var(--brand-solid)]`, `bg-[var(--brand-subtle)]`, `text-[var(--brand-ink)]`

### 7. CRISP FUNCTIONAL ENGINEERING ICONS (P11)
- Import icons **exclusively** from `lucide-react`.
- **NEVER** use generic glitter stars, magical sparkles, or fantasy wands (`Sparkles`, `Wand2`) for AI or technical features.
- **ALWAYS** use crisp, functional engineering icons: `Bot`, `Cpu`, `Layers`, `Terminal`, `Sliders`, `Code2`, `Boxes`, `Zap`, `Star`, `Search`, `Activity`.

### 8. ACCESSIBILITY & DOM HOOKS (P10 & P12)
- Target component states using `data-slot`, `data-state`, `data-variant`, and `data-theme`.
- Every interactive element must have accessible labels (`aria-label` for icon buttons) and full keyboard navigability (Enter, Space, Arrows, Esc).

---

## 📦 Component Import Quick Reference (`@/components/ui`)

```tsx
// Layout Primitives & Typography
import { Container, Section, Stack, VStack, HStack, SimpleGrid, Heading, Text, Blockquote, Highlight } from '@/components/ui'

// Buttons & Utilities
import { Button, ButtonGroup, SplitButton, FloatingActionMenu, Toggle, ToggleGroup, CopyButton, QrCode, CookieConsent } from '@/components/ui'

// Form Controls (P5 Contract)
import { Input, PasswordInput, NumberInput, Editable, Textarea, Checkbox, Switch, RadioGroup, Slider, DatePicker, TimePicker, FileUploader, PhoneInput, CurrencyInput, TagInput, CreditCardInput, AutoForm } from '@/components/ui'

// Selection & Filters (P8)
import { Select, MultiSelect, Combobox, SegmentedControl, TransferList, FilterBuilder, FacetFilter } from '@/components/ui'

// Overlays & Dialogs (P9)
import { Dialog, Sheet, DropdownMenu, ContextMenu, Popover, Tooltip, Drawer, ResponsiveDialog } from '@/components/ui'
import { dialog } from '@/lib/dialog'

// Data Display, Tables & Grids
import { DataTable, PivotTable, ComparisonTable, DescriptionList, KanbanBoard, RoadmapGantt, VirtualList, MasonryGrid, Tree, JsonTree, LogViewer, DiffViewer } from '@/components/ui'

// Feedback, Badges & Indicators
import { Badge, PulseBadge, ScoreBadge, Alert, Banner, Progress, CircularProgress, Spinner, Skeleton, EmptyState, ScoreBadge } from '@/components/ui'
import { toast } from 'sonner'

// Enterprise SaaS Widgets
import { ApiKeyManager, WebhookTester, NotificationPreferences, AuditLogStream, ActiveSessions, TwoFactorSetup, CommentThread, ServiceStatusGrid, PricingTable } from '@/components/ui'

// AI Copilot Suite
import { AiPromptInput, ModelSelector, MessageBubble, CodeBlock, TerminalEmulator } from '@/components/ui'

// Charts & Visualizations
import { MetricCard, MetricCompare, Sparkline, Gauge, FunnelChart, Treemap, Heatmap, BarList, Timeline } from '@/components/ui'

// Utilities & Global Helpers
import { GlobalCommandPalette, ThemeToggle, AgentationToolbar, StriderUIProvider } from '@/components/ui'
```

---

## 🎨 OKLCH Theme Color Palette Reference

| Theme Key | Purpose / Role | Solid Token | Subtle Background | Subtle Foreground |
| :--- | :--- | :--- | :--- | :--- |
| `brand` | Primary SaaS Identity / Call to Action | `var(--brand-solid)` | `var(--brand-subtle)` | `var(--brand-ink)` |
| `gray` | Neutral / Secondary / Structural | `var(--gray-solid)` | `var(--gray-subtle)` | `var(--gray-ink)` |
| `blue` | Informational / Discovery / Status | `var(--blue-solid)` | `var(--blue-subtle)` | `var(--blue-ink)` |
| `emerald` | Success / Active / Verified / Paid | `var(--emerald-solid)` | `var(--emerald-subtle)` | `var(--emerald-ink)` |
| `amber` | Warning / Attention / Pending (never 'yellow') | `var(--amber-solid)` | `var(--amber-subtle)` | `var(--amber-ink)` |
| `rose` | Destructive / Danger / Error / Failed | `var(--rose-solid)` | `var(--rose-subtle)` | `var(--rose-ink)` |
| `violet` | Accent / AI Copilot / Special Features | `var(--violet-solid)` | `var(--violet-subtle)` | `var(--violet-ink)` |
