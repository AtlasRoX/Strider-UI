# Strider UI — Unified Master Design System & AI Coding Agent Specification

> **AI Coding Agent Instruction**: When designing, generating, or refactoring user interfaces, you **MUST** strictly adhere to this document. Follow all 15 core architectural principles (P1–P15), the 2-axis OKLCH token system, the P5 uniform form labeling contract, imperative dialog services, and the strict DO's and DON'Ts rulebook below.

---

## Table of Contents
1. [AI Agent Quick Prompt / Directive](#1-ai-agent-quick-prompt--directive)
2. [Core Architectural Principles (P1–P15)](#2-core-architectural-principles-p1p15)
3. [The 2-Axis OKLCH Token System](#3-the-2-axis-oklch-token-system)
4. [Strict DO's and DON'Ts Rulebook](#4-strict-dos-and-donts-rulebook)
5. [Form Controls & P5 Uniform Labeling Contract](#5-form-controls--p5-uniform-labeling-contract)
6. [Imperative Services (Dialogs, Confirmations & Prompts)](#6-imperative-services-dialogs-confirmations--prompts)
7. [Complete Component Catalog (157 Components)](#7-complete-component-catalog-157-components)
8. [Code Snippets & Standard Component Recipes](#8-code-snippets--standard-component-recipes)
9. [Setting Up Strider UI in Any Project](#9-setting-up-strider-ui-in-any-project)

---

## 1. AI Agent Quick Prompt / Directive

When instructing any AI coding agent (Antigravity, Claude Code, Cursor, Windsurf, Codex, ChatGPT), prepend or reference this rule:

```markdown
You are building user interfaces using the Strider UI Design System.
Strict rules to follow:
1. Always use 2-Axis styling: `variant` ('solid'|'outline'|'subtle'|'ghost'|'link') + `theme` ('brand'|'gray'|'blue'|'emerald'|'amber'|'rose'|'violet'). Never use semantic intent props like color="primary" or intent="danger".
2. All form inputs MUST follow the P5 Uniform Labeling Contract: provide `label`, `description`, `error`, and `required` directly to the input component.
3. For confirmations, prompts, or dangerous actions, use imperative `dialog.confirm()`, `dialog.danger()`, or `dialog.prompt()` from `@/lib/dialog` instead of building custom modal state.
4. Follow the dedicated P8 Selection family: `Select` for single fixed items, `MultiSelect` for multiple tagged pills, `Combobox` for searchable autocompletes.
5. Use OKLCH CSS variables (`var(--surface-*)`, `var(--ink-*)`, `var(--outline-*)`, `var(--<theme>-*)`) instead of raw hex values or non-standard Tailwind colors.
6. NO AI-sloppy icons: NEVER use `Sparkles`, magic wands, or generic glitter stars for features or AI tools. Use crisp, purposeful domain icons (`Bot`, `Cpu`, `Layers`, `Terminal`, `Sliders`, `Code2`, `Boxes`, `Zap`, `Star`).
```

---

## 2. Core Architectural Principles (P1–P15)

### P1. Name behaviors, not interactions
Event and callback prop names describe what happened to state or intent, not the physical DOM event.
- **DO**: `onChange`, `onOpenChange`, `onSelect`, `onSubmit`, `onDismiss`
- **DON'T**: `onToggle`, `onClickOutside`, `onKeydownEnter`, `onButtonPress`

### P2. Controlled + Uncontrolled Dual-Mode State
Every stateful component supports both standard React patterns:
- Values: `value` / `defaultValue` / `onChange`
- Toggles: `checked` / `defaultChecked` / `onChange`
- Overlays & Menus: `open` / `defaultOpen` / `onOpenChange`
- Queries: `query` / `onQueryChange`

### P3. Prefer Primitive Prop Types (No Config Blobs)
Keep component props flat primitives (`string`, `number`, `boolean`, `ReactNode`).
- **DO**: `<Dialog open={open} onOpenChange={setOpen} title="Edit" size="lg" dismissible />`
- **DON'T**: `<Dialog config={{ title: 'Edit', size: 'lg', dismissible: true }} />`

### P4. Two Color Axes Only: `variant` + `theme`
Components that vary in color and style use exactly two orthogonal axes:
1. **`variant`** (Visual Weight): `'solid' | 'outline' | 'subtle' | 'ghost' | 'link'`
2. **`theme`** (Concrete Color Tone): `'brand' | 'gray' | 'blue' | 'emerald' | 'amber' | 'rose' | 'violet'`

> **Strict Prohibition**: Never use semantic aliases like `intent="danger"`, `kind="warning"`, `appearance="primary"`, or `color="info"`.

| Semantic Intent | Canonical Strider UI Prop Mapping |
| :--- | :--- |
| Primary Action / Brand | `variant="solid" theme="brand"` |
| Secondary / Neutral | `variant="outline" theme="gray"` |
| Success / Complete | `variant="subtle" theme="emerald"` |
| Warning / Attention | `variant="subtle" theme="amber"` |
| Danger / Destructive | `variant="solid" theme="rose"` or `variant="subtle" theme="rose"` |
| Info / Discovery | `variant="subtle" theme="blue"` |
| Accent / AI / Creative | `variant="subtle" theme="violet"` |

### P5. Uniform Input Labeling Contract
Every form control accepts `label`, `description`, `error`, and `required` props. The component automatically generates stable unique IDs via `useId()` and links `htmlFor`, `aria-describedby`, and `aria-errormessage`.

### P6. Shared Slot Vocabulary & JSX Composition
All sub-element customization follows a canonical naming scheme:
- `children`: Default slot content
- `prefix`: Leading visual element (icon, avatar, status badge)
- `suffix`: Trailing visual element (icon, chevron, keyboard shortcut)
- `trigger` / `asChild`: Trigger element opening an overlay
- `header` / `footer` / `actions`: Container slots
- `empty`: Fallback UI when collections are empty

### P7. Scoped Render Props Expose Internal State
When rendering dynamic collections (lists, table rows, select items), render props expose all state:
- `({ item, index, active, selected, disabled }) => ReactNode`

### P8. Split Components Instead of Boolean Mode Switches
Never create monolithic multi-mode components. Split when the return data type changes:
- `Select`: Single fixed option (`string`)
- `MultiSelect`: Multiple tag selections (`string[]`)
- `Combobox`: Searchable autocomplete with filtering

### P9. Zero-Boilerplate Imperative APIs
One-shot modals, dialogs, and notifications provide promise-aware imperative helpers:
- `await dialog.confirm({ title, message, confirmLabel })`
- `await dialog.danger({ title, message, confirmLabel })`
- `await dialog.prompt({ title, fields, confirmLabel })`
- `toast.success()`, `toast.error()`, `toast.promise()`

### P10. Customization via `data-*` Attributes
Components expose stable DOM styling hooks (`data-slot`, `data-state`, `data-variant`, `data-theme`). Never expose inner class props like `inputClassName` or `dialogWrapperClass`.

### P11. Icon Uniformity
Icons in buttons and inputs accept `icon?: LucideIcon | ReactNode`, `prefix?: ReactNode`, and `suffix?: ReactNode`.

### P12. Accessibility is Non-Negotiable
1. Full keyboard operability (Enter, Space, Arrow keys, Esc, Tab).
2. Visible `:focus-visible` focus rings in both light and dark mode.
3. Explicit ARIA roles and live states (`aria-expanded`, `aria-invalid`, `aria-selected`).
4. Accessible labels on icon-only buttons (`aria-label="..."` or `<span className="sr-only">`).
5. Support for `prefers-reduced-motion`.

### P13. Deprecate, Don't Break
Maintain backward compatibility with warnings on evolving APIs.

### P14. Unstable Features Live in `experimental/`
All alpha/beta components remain isolated under `components/experimental/`.

### P15. Curated Barrels Only
All public components are exported through `components/ui/index.ts`.

---

## 3. The 2-Axis OKLCH Token System

Add the following CSS variable block into your `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* Typography */
  --font-google-sans: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-sans: var(--font-google-sans);
  --font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, monospace;

  /* Surfaces (Backgrounds) */
  --surface-base: oklch(0.99 0 0);
  --surface-card: oklch(1 0 0);
  --surface-muted: oklch(0.96 0.005 185);
  --surface-subtle: oklch(0.93 0.01 185);
  --surface-overlay: oklch(1 0 0);
  --surface-active: oklch(0.90 0.015 185);

  /* Inks (Text & Icons) */
  --ink-primary: oklch(0.13 0.01 185);
  --ink-secondary: oklch(0.42 0.02 185);
  --ink-muted: oklch(0.62 0.01 185);
  --ink-inverse: oklch(0.99 0 0);
  --ink-disabled: oklch(0.75 0 0);

  /* Outlines (Borders & Focus Rings) */
  --outline-base: oklch(0.90 0.005 185);
  --outline-muted: oklch(0.94 0.003 185);
  --outline-focus: oklch(0.55 0.05 185);

  /* 7 Two-Axis Theme Palettes */
  /* 1. Brand (Teal) */
  --brand-solid: oklch(0.55 0.05 185);
  --brand-solid-hover: oklch(0.50 0.05 185);
  --brand-subtle: oklch(0.94 0.02 185);
  --brand-ink: oklch(0.42 0.06 185);

  /* 2. Gray (Slate/Neutral) */
  --gray-solid: oklch(0.20 0.01 185);
  --gray-solid-hover: oklch(0.15 0.01 185);
  --gray-subtle: oklch(0.95 0 0);
  --gray-ink: oklch(0.25 0 0);

  /* 3. Blue (Information) */
  --blue-solid: oklch(0.55 0.18 245);
  --blue-solid-hover: oklch(0.50 0.18 245);
  --blue-subtle: oklch(0.95 0.03 245);
  --blue-ink: oklch(0.45 0.18 245);

  /* 4. Emerald (Success) */
  --emerald-solid: oklch(0.56 0.17 152);
  --emerald-solid-hover: oklch(0.50 0.17 152);
  --emerald-subtle: oklch(0.95 0.03 152);
  --emerald-ink: oklch(0.42 0.17 152);

  /* 5. Amber (Warning/Attention) */
  --amber-solid: oklch(0.70 0.17 75);
  --amber-solid-hover: oklch(0.65 0.17 75);
  --amber-subtle: oklch(0.96 0.04 75);
  --amber-ink: oklch(0.50 0.18 75);

  /* 6. Rose (Danger/Destructive) */
  --rose-solid: oklch(0.55 0.20 25);
  --rose-solid-hover: oklch(0.49 0.20 25);
  --rose-subtle: oklch(0.96 0.03 25);
  --rose-ink: oklch(0.48 0.20 25);

  /* 7. Violet (Creative/AI) */
  --violet-solid: oklch(0.56 0.20 290);
  --violet-solid-hover: oklch(0.50 0.20 290);
  --violet-subtle: oklch(0.96 0.03 290);
  --violet-ink: oklch(0.48 0.20 290);

  /* Radii */
  --radius-xs: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
}

.dark {
  --surface-base: oklch(0.12 0.01 185);
  --surface-card: oklch(0.16 0.01 185);
  --surface-muted: oklch(0.20 0.015 185);
  --surface-subtle: oklch(0.24 0.02 185);
  --surface-overlay: oklch(0.18 0.01 185);
  --surface-active: oklch(0.28 0.02 185);

  --ink-primary: oklch(0.98 0 0);
  --ink-secondary: oklch(0.75 0.01 185);
  --ink-muted: oklch(0.52 0.01 185);
  --ink-inverse: oklch(0.12 0.01 185);
  --ink-disabled: oklch(0.35 0 0);

  --outline-base: oklch(0.26 0.01 185);
  --outline-muted: oklch(0.21 0.005 185);
  --outline-focus: oklch(0.65 0.06 185);

  --brand-solid: oklch(0.60 0.06 185);
  --brand-subtle: oklch(0.22 0.03 185);
  --gray-solid: oklch(0.85 0 0);
  --gray-subtle: oklch(0.22 0 0);
  --blue-solid: oklch(0.60 0.18 245);
  --blue-subtle: oklch(0.22 0.05 245);
  --emerald-solid: oklch(0.60 0.17 152);
  --emerald-subtle: oklch(0.22 0.04 152);
  --amber-solid: oklch(0.72 0.17 75);
  --amber-subtle: oklch(0.24 0.05 75);
  --rose-solid: oklch(0.58 0.20 25);
  --rose-subtle: oklch(0.22 0.04 25);
  --violet-solid: oklch(0.62 0.20 290);
  --violet-subtle: oklch(0.23 0.05 290);
}
```

---

## 4. Strict DO's and DON'Ts Rulebook

| Category | ❌ NEVER DO THIS | ✅ ALWAYS DO THIS |
| :--- | :--- | :--- |
| **Color Props** | `<Button color="primary" intent="danger">` | `<Button variant="solid" theme="rose">` |
| **Semantic Intents** | `<Alert kind="warning" type="error">` | `<Alert theme="amber">` or `<Alert theme="rose">` |
| **Form Labels** | Manual `<label htmlFor="x">` + separate `<p className="error">` | `<Input label="Name" description="Help" error={err} required />` |
| **Selection Controls** | Overloaded `<Select isMulti isSearchable />` | Dedicated `<Select>`, `<MultiSelect>`, or `<Combobox>` |
| **Modals / Prompts** | Managing `const [showModal, setShowModal] = useState(false)` for confirmations | `const ok = await dialog.confirm({ title: 'Deploy?' })` |
| **Colors in Styles** | Hardcoded hex `bg-[#538687]` or Tailwind `bg-red-500` | Semantic token `bg-[var(--brand-solid)]` or `text-[var(--rose-solid)]` |
| **DOM Attributes** | Using inner class names `inputWrapperClass="p-2"` | Using stable CSS hooks `[data-slot="input"]` |
| **Icon Positions** | Inlined `<button><Icon /> Text</button>` with custom spacing | Use standard slots: `<Button prefix={<Icon />} />` |
| **Button States** | Hand-crafted spinners inside `<button>{loading && <Spinner />}</button>` | `<Button loading>Submit</Button>` |
| **Empty States** | Blank `<div>No items</div>` | `<EmptyState title="No items found" description="..." action={<Button .../>} />` |
| **Icons** | Custom SVGs everywhere | Standardized [Lucide React](https://lucide.dev) icons |
| **AI & Feature Icons** | Generic AI sloppy icons (`Sparkles`, `Wand2`, glowing glitter) | Precise semantic icons (`Bot`, `Cpu`, `Layers`, `Terminal`, `Sliders`, `Code2`, `Zap`, `Star`) |
| **Theme Names** | `theme="yellow"`, `theme="red"`, `theme="green"` | `theme="amber"`, `theme="rose"`, `theme="emerald"` |

---

## 5. Form Controls & P5 Uniform Labeling Contract

All form components conform to the standard P5 props interface:

```tsx
export interface FormInputProps {
  label?: React.ReactNode        // Title above the input
  description?: React.ReactNode  // Helper text below the input
  error?: string | boolean       // Validation message (turns border rose)
  required?: boolean             // Adds asterisk & aria-required="true"
  disabled?: boolean             // Applies opacity & disabled styles
  size?: 'sm' | 'md' | 'lg'      // Control height/font scale
  clearable?: boolean            // Shows (X) clear button when populated
  prefix?: React.ReactNode       // Leading icon or currency indicator
  suffix?: React.ReactNode       // Trailing icon or keyboard shortcut
}
```

### Complete Form Example
```tsx
import { 
  Input, 
  PasswordInput, 
  Select, 
  MultiSelect, 
  Combobox, 
  DatePicker, 
  Checkbox, 
  Switch, 
  Slider,
  Button 
} from '@/components/ui'

export function UserRegistrationForm() {
  return (
    <form className="flex flex-col gap-6 max-w-xl p-6 rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)]">
      <Input
        label="Organization Name"
        placeholder="e.g. Acme Cloud Corp"
        description="Unique identifier for your team's workspace."
        required
        clearable
      />

      <PasswordInput
        label="Master Account Password"
        placeholder="Enter secret passkey..."
        showStrength
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Hosting Region"
          description="Primary data residency zone."
          options={[
            { label: 'US East (N. Virginia)', value: 'us-east-1' },
            { label: 'EU West (Frankfurt)', value: 'eu-west-1' },
          ]}
          defaultValue="us-east-1"
        />

        <DatePicker
          label="Deployment Date"
          description="Scheduled go-live target."
          required
        />
      </div>

      <MultiSelect
        label="Compliance Frameworks"
        description="Select active compliance mandates."
        options={[
          { label: 'SOC2 Type II', value: 'soc2' },
          { label: 'HIPAA Compliant', value: 'hipaa' },
          { label: 'ISO 27001', value: 'iso27001' },
        ]}
        defaultValue={['soc2']}
      />

      <div className="flex flex-col gap-3 pt-2 border-t border-[var(--outline-base)]">
        <Checkbox
          label="Enable automated telemetry reporting"
          description="Sends anonymous diagnostic traces every 24 hours."
          theme="brand"
          defaultChecked
        />
        <Switch
          label="Enforce Two-Factor Authentication"
          description="Requires hardware key or TOTP for all team members."
          theme="brand"
          defaultChecked
        />
      </div>

      <Button variant="solid" theme="brand" size="md" className="mt-2">
        Create Workspace
      </Button>
    </form>
  )
}
```

---

## 6. Imperative Services (Dialogs, Confirmations & Prompts)

Never write boilerplate modal state (`const [open, setOpen] = useState(false)`) for confirmations, alerts, or quick prompts.

```tsx
import { dialog } from '@/lib/dialog'
import { toast } from 'sonner'

// 1. Standard Confirmation Dialog
async function handleDeploy() {
  const confirmed = await dialog.confirm({
    title: 'Deploy New Production Build?',
    message: 'This will publish version 2.4.0 to all active edge nodes worldwide.',
    confirmLabel: 'Deploy Now',
    theme: 'brand',
  })

  if (confirmed) {
    toast.success('Production deployment queued!')
  }
}

// 2. Destructive / Danger Modal
async function handlePurgeDatabase() {
  const confirmed = await dialog.danger({
    title: 'Permanently Purge Ephemeral Cache?',
    message: 'This action cannot be undone. All redis keys will be deleted.',
    confirmLabel: 'Purge Database',
  })

  if (confirmed) {
    toast.error('Ephemeral cache purged.')
  }
}

// 3. User Input Prompt Modal
async function handleRename() {
  const result = await dialog.prompt({
    title: 'Rename Project',
    message: 'Enter the new display title for this workspace.',
    fields: [
      {
        name: 'name',
        label: 'Workspace Name',
        type: 'text',
        placeholder: 'e.g. Production Cluster Beta',
        required: true,
      },
    ],
    confirmLabel: 'Save Changes',
  })

  if (result) {
    toast.success(`Renamed to "${result.name}"`)
  }
}
```

---

## 7. Complete Component Catalog (157 Components)

All components are directly exportable from `@/components/ui`:

### Core Atoms & Primitives
`Avatar`, `AvatarGroup`, `Badge`, `PulseBadge`, `ScoreBadge`, `Button`, `ButtonGroup`, `SplitButton`, `Icon`, `Kbd`, `Label`, `Logo`, `Separator` (`Divider`), `Skeleton`, `Snippet`, `Spinner`, `LoadingIndicator`, `LoadingText`, `Toggle`, `ToggleGroup`.

### Form Controls & Inputs
`Input`, `PasswordInput`, `PasswordValidator`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup`, `Radio`, `Slider`, `Select`, `MultiSelect`, `Combobox`, `DatePicker`, `TimePicker`, `Duration`, `FileUploader`, `ColorPicker`, `TagInput`, `AiPromptInput`, `SignaturePad`, `PhoneInput`, `CurrencyInput`, `CreditCardInput`, `CronPicker`, `Rating`, `SegmentedControl`, `InputOTP`, `InputGroup`, `MentionInput`, `MultiEmailInput`, `Captcha`, `FormControl`.

### Overlays, Dialogs & Modals
`Dialog`, `AlertDialog`, `Sheet`, `Drawer` (`BottomSheet`), `DropdownMenu`, `ContextMenu`, `Menubar`, `Popover`, `Tooltip`, `HoverCard`, `Tour`, `MediaLightbox`, `KeyboardShortcutsDialog`.

### Data Display, Tables & Layout
`Card`, `DataTable`, `Table`, `Accordion`, `Tabs`, `Timeline`, `EmptyState`, `DiffViewer`, `JsonTree`, `Dock`, `DocumentPreview`, `MasonryGrid`, `PivotTable`, `VirtualList`, `OrgChartTree`, `PricingTable`, `KbdShortcutList`, `Collapsible`, `AspectRatio`, `CodeBlock`, `Carousel`, `Pagination`, `Resizable`, `ScrollArea`, `ScrollProgress`, `SectionHeader`, `PageHeader`, `Stepper`, `Tree`, `Field`, `Item`.

### Charts & Analytics Visualizations
`ChartContainer`, `ChartTooltip`, `ChartLegend`, `Sparkline`, `BarList`, `Gauge`, `Heatmap`, `FunnelChart`, `Treemap`, `RoadmapGantt`, `Progress`, `CircularProgress`, `Trend`, `MetricCard`, `MetricCompare`.

### Enterprise Security & Developer Tools
`ApiKeyManager`, `ActiveSessions`, `TwoFactorSetup`, `AuditLogStream`, `WebhookTester`, `ServiceStatusGrid`, `LogViewer`, `TerminalEmulator`, `ContrastChecker`, `FilterBuilder`, `FacetFilter`, `MarkdownEditor`, `Watermark`, `PaletteGenerator`, `PipelineStep`.

### Collaboration, Social & Media
`CommentThread`, `NotificationCenter`, `NotificationPreferences`, `OmniSearch`, `MessageBubble`, `AudioPlayer`, `Confetti`, `ImageCompare`, `TopList`, `UserMenu`, `ModelSelector`.

### Feedback, Banners & Shell Utilities
`Alert`, `Banner`, `Breadcrumb`, `BreadcrumbNav`, `Countdown`, `NavigationMenu`, `Sidebar`, `ThemeToggle`, `Toast`, `Toaster`, `SonnerToaster`, `TransferList`, `SearchBar`, `SearchDialog`, `StriderUIProvider`, `useMobile`, `useToast`.

---

## 8. Code Snippets & Standard Component Recipes

### 1. Executive KPI Metric Card with Sparklines
```tsx
import { MetricCard } from '@/components/ui'

<MetricCard
  title="Total Monthly Recurring Revenue"
  value="$128,450"
  change={14.2}
  changeLabel="vs last month"
  trend="up"
  theme="brand"
  sparklineData={[30, 45, 60, 55, 80, 95, 128]}
/>
```

### 2. Enterprise Data Table with Sorting & Pagination
```tsx
import { DataTable } from '@/components/ui'

<DataTable
  columns={[
    { key: 'name', header: 'User', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ]}
  data={userList}
  selectable
  searchable
  pagination={{ page: 1, pageSize: 10, total: 150, onPageChange: (p) => setPage(p) }}
/>
```

### 3. AI Copilot Prompt Input with Model Selector
```tsx
import { AiPromptInput, ModelSelector } from '@/components/ui'

<AiPromptInput
  placeholder="Ask Strider AI to scaffold a component..."
  modelSelector={<ModelSelector value="gpt-4o" onChange={setModel} />}
  onSend={(prompt, attachments) => handleGenerate(prompt, attachments)}
  maxTokens={4096}
  showAttachments
/>
```

### 4. Kanban Workflow Board
```tsx
import { KanbanBoard } from '@/components/ui'

<KanbanBoard
  columns={[
    { id: 'todo', title: 'Backlog', limit: 10 },
    { id: 'in_progress', title: 'In Progress', limit: 5 },
    { id: 'review', title: 'Code Review', limit: 3 },
    { id: 'done', title: 'Deployed', limit: 50 },
  ]}
  initialTasks={tasks}
  onTaskMove={(taskId, targetCol) => handleTaskMove(taskId, targetCol)}
/>
```

---

## 9. Setting Up Strider UI in Any Project

1. Copy `components/ui/` and `lib/` to your project root.
2. Copy the token definitions from `app/globals.css` into your `globals.css`.
3. Wrap your root layout:

```tsx
// app/layout.tsx
import { StriderUIProvider } from '@/components/ui/provider'
import '@/app/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StriderUIProvider defaultTheme="system">
          {children}
        </StriderUIProvider>
      </body>
    </html>
  )
}
```

---

## 📄 License & Attribution
**Strider UI Design System** © [AtlasRoX](https://github.com/AtlasRoX). Built with React 19, Next.js 16, and Tailwind CSS v4.
