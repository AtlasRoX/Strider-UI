# StriderBoard — Enterprise Next.js UI Design System & Component Library

[![React 19](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://react.dev/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.0.0-black.svg)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38bdf8.svg)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-darkviolet.svg)](https://www.radix-ui.com/)
[![Components Count](https://img.shields.io/badge/Components-157+-emerald.svg)](./REGISTRY.md)
[![Design System Spec](https://img.shields.io/badge/Design_System-P1--P15_OKLCH-indigo.svg)](./DESIGN_SYSTEM.md)

**StriderBoard / Strider UI** is a full-stack, enterprise-grade component architecture and design system built for modern SaaS platforms. It ships with **157+ accessible React 19 / Radix UI components**, unified **two-axis OKLCH color palettes**, zero-boilerplate imperative dialog services, interactive charts, developer vaults, and AI copilot interfaces.

---

## 📑 Table of Contents

1. [Quickstart (Run Locally)](#1-quickstart-run-locally)
2. [Using Strider UI in Your Other Projects](#2-using-strider-ui-in-your-other-projects)
   - [Step 1: Install Peer Dependencies](#step-1-install-peer-dependencies)
   - [Step 2: Copy Component & Utility Files](#step-2-copy-component--utility-files)
   - [Step 3: Configure Tailwind CSS v4 & OKLCH Tokens](#step-3-configure-tailwind-css-v4--oklch-tokens)
   - [Step 4: Wrap Root Layout with Provider](#step-4-wrap-root-layout-with-provider)
3. [How to Instruct Your AI Coding Agent](#3-how-to-instruct-your-ai-coding-agent)
4. [Strict DO's and DON'Ts Matrix](#4-strict-dos-and-donts-matrix)
5. [Key Component Usage Recipes](#5-key-component-usage-recipes)
   - [2-Axis Buttons & Badges](#1-2-axis-buttons--badges)
   - [P5 Uniform Form Controls](#2-p5-uniform-form-controls)
   - [Imperative Dialogs & Modals](#3-imperative-dialogs--modals)
   - [Enterprise Data Table & Data Grids](#4-enterprise-data-table--data-grids)
   - [Kanban Workflow Board & Roadmap Gantt](#5-kanban-workflow-board--roadmap-gantt)
   - [AI Copilot Input & Model Selector](#6-ai-copilot-input--model-selector)
   - [Metric Cards & Visualizations](#7-metric-cards--visualizations)
6. [Complete 157-Component Catalog](#6-complete-157-component-catalog)
7. [Documentation Reference Index](#7-documentation-reference-index)

---

## 1. Quickstart (Run Locally)

Clone and launch the development dashboard and component showcase locally:

```bash
# Clone the repository
git clone https://github.com/AtlasRoX/StriderBoard-v1.git
cd StriderBoard

# Install dependencies using pnpm
pnpm install

# Start development server
pnpm dev
```

- **Dashboard**: [`http://localhost:3000`](http://localhost:3000)
- **Component Showcase (All 157+ UI Controls)**: [`http://localhost:3000/components`](http://localhost:3000/components)

---

## 2. Using Strider UI in Your Other Projects

You can use Strider UI across any Next.js 15/16, React 19, or Vite application.

### Step 1: Install Peer Dependencies

In your new or existing project, install the core dependencies:

```bash
# Core Primitives & Styling
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip

# Icons, Charts, Animation & Utilities
pnpm add lucide-react recharts sonner class-variance-authority clsx tailwind-merge cmdk vaul input-otp
```

---

### Step 2: Copy Component & Utility Files

Copy the two core directories from this repository into your project:

```
Your-Project/
├── components/
│   └── ui/              <-- Copy all files from StriderBoard/components/ui/
├── lib/                 <-- Copy all files from StriderBoard/lib/
└── app/
    └── globals.css      <-- Add token layer (see Step 3)
```

---

### Step 3: Configure Tailwind CSS v4 & OKLCH Tokens

Add the OKLCH theme token layer to your `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* Typography */
  --font-google-sans: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-sans: var(--font-google-sans);
  --font-mono: 'Geist Mono', ui-monospace, monospace;

  /* Surface Layers */
  --surface-base: oklch(0.99 0 0);
  --surface-card: oklch(1 0 0);
  --surface-muted: oklch(0.96 0.005 185);
  --surface-subtle: oklch(0.93 0.01 185);
  --surface-overlay: oklch(1 0 0);
  --surface-active: oklch(0.90 0.015 185);

  /* Ink Layers (Text & Icons) */
  --ink-primary: oklch(0.13 0.01 185);
  --ink-secondary: oklch(0.42 0.02 185);
  --ink-muted: oklch(0.62 0.01 185);
  --ink-inverse: oklch(0.99 0 0);
  --ink-disabled: oklch(0.75 0 0);

  /* Outline Layers (Borders) */
  --outline-base: oklch(0.90 0.005 185);
  --outline-muted: oklch(0.94 0.003 185);
  --outline-focus: oklch(0.55 0.05 185);

  /* 7 Two-Axis Theme Palettes */
  --brand-solid: oklch(0.55 0.05 185);
  --brand-subtle: oklch(0.94 0.02 185);
  --brand-ink: oklch(0.42 0.06 185);

  --gray-solid: oklch(0.20 0.01 185);
  --gray-subtle: oklch(0.95 0 0);
  --gray-ink: oklch(0.25 0 0);

  --blue-solid: oklch(0.55 0.18 245);
  --blue-subtle: oklch(0.95 0.03 245);
  --blue-ink: oklch(0.45 0.18 245);

  --emerald-solid: oklch(0.56 0.17 152);
  --emerald-subtle: oklch(0.95 0.03 152);
  --emerald-ink: oklch(0.42 0.17 152);

  --amber-solid: oklch(0.70 0.17 75);
  --amber-subtle: oklch(0.96 0.04 75);
  --amber-ink: oklch(0.50 0.18 75);

  --rose-solid: oklch(0.55 0.20 25);
  --rose-subtle: oklch(0.96 0.03 25);
  --rose-ink: oklch(0.48 0.20 25);

  --violet-solid: oklch(0.56 0.20 290);
  --violet-subtle: oklch(0.96 0.03 290);
  --violet-ink: oklch(0.48 0.20 290);

  /* Corner Radii */
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

  --ink-primary: oklch(0.98 0 0);
  --ink-secondary: oklch(0.75 0.01 185);
  --ink-muted: oklch(0.52 0.01 185);
  --ink-inverse: oklch(0.12 0.01 185);

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

### Step 4: Wrap Root Layout with Provider

In `app/layout.tsx`, wrap children with `<StriderUIProvider>` to enable tooltips, theme toggling, imperative dialogs, and toast notifications:

```tsx
// app/layout.tsx
import * as React from 'react'
import { StriderUIProvider } from '@/components/ui/provider'
import '@/app/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--surface-base)] text-[var(--ink-primary)] font-sans antialiased">
        <StriderUIProvider defaultTheme="system">
          {children}
        </StriderUIProvider>
      </body>
    </html>
  )
}
```

---

## 3. How to Instruct Your AI Coding Agent

Whenever you prompt an AI coding assistant (**Antigravity, Cursor, Windsurf, Claude Code, Codex, ChatGPT**), reference [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md):

### Recommended System Prompt / `.cursorrules` / `CLAUDE.md` snippet:

```markdown
You are building and modifying user interfaces in this codebase using the Strider UI Design System.
Always adhere to DESIGN_SYSTEM.md:
1. Always use 2-Axis styling: `variant` ('solid'|'outline'|'subtle'|'ghost'|'link') + `theme` ('brand'|'gray'|'blue'|'emerald'|'amber'|'rose'|'violet'). Never use semantic intent props like color="primary" or intent="danger".
2. All form inputs MUST follow the P5 Uniform Labeling Contract: provide `label`, `description`, `error`, and `required` directly to the input component.
3. For confirmations, prompts, or dangerous actions, use imperative `dialog.confirm()`, `dialog.danger()`, or `dialog.prompt()` from `@/lib/dialog` instead of building custom modal state.
4. Follow the dedicated P8 Selection family: `Select` for single fixed items, `MultiSelect` for multiple tagged pills, `Combobox` for searchable autocompletes.
5. Use OKLCH CSS variables (`var(--surface-*)`, `var(--ink-*)`, `var(--outline-*)`, `var(--<theme>-*)`) instead of raw hex values or non-standard Tailwind colors.
6. NO AI-sloppy icons: NEVER use `Sparkles`, magic wands, or generic glitter stars for features or AI tools. Use crisp, purposeful domain icons (`Bot`, `Cpu`, `Layers`, `Terminal`, `Sliders`, `Code2`, `Boxes`, `Zap`, `Star`).
```

---

## 4. Strict DO's and DON'Ts Matrix

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
| **AI & Feature Icons** | Generic AI sloppy icons (`Sparkles`, `Wand2`, glowing glitter) | Precise semantic icons (`Bot`, `Cpu`, `Layers`, `Terminal`, `Sliders`, `Code2`, `Zap`, `Star`) |
| **Theme Names** | `theme="yellow"`, `theme="red"`, `theme="green"` | `theme="amber"`, `theme="rose"`, `theme="emerald"` |

---

## 5. Key Component Usage Recipes

### 1. 2-Axis Buttons & Badges
```tsx
import { Button, ButtonGroup, Badge } from '@/components/ui'
import { Plus, Trash2, CheckCircle2 } from 'lucide-react'

// Solid & Subtle Theme Buttons
<Button variant="solid" theme="brand" prefix={<Plus className="size-4" />}>
  Create Deployment
</Button>

<Button variant="subtle" theme="rose" suffix={<Trash2 className="size-4" />}>
  Delete Instance
</Button>

// Connected Button Group
<ButtonGroup attached>
  <Button variant="outline" theme="gray" size="sm">Monthly</Button>
  <Button variant="solid" theme="brand" size="sm">Annual (Save 20%)</Button>
</ButtonGroup>

// Status Badges with Pulsing Live Indicators
<Badge variant="subtle" theme="emerald" dot pulse>
  All Systems Operational
</Badge>
```

---

### 2. P5 Uniform Form Controls
```tsx
import { 
  Input, 
  PasswordInput, 
  Select, 
  MultiSelect, 
  Combobox, 
  DatePicker, 
  Checkbox, 
  Switch 
} from '@/components/ui'

<Input
  label="Project Subdomain"
  placeholder="e.g. acme-edge"
  description="Allocates your dedicated edge URL."
  required
  clearable
/>

<PasswordInput
  label="API Secret Key"
  placeholder="Enter cryptographic secret..."
  showStrength
  required
/>

<Select
  label="Edge Cluster Location"
  options={[
    { label: 'US East (N. Virginia)', value: 'us-east-1' },
    { label: 'EU West (Frankfurt)', value: 'eu-west-1' },
    { label: 'AP South (Singapore)', value: 'ap-south-1' },
  ]}
  defaultValue="us-east-1"
/>

<MultiSelect
  label="Security Tags"
  options={[
    { label: 'SOC2 Type II', value: 'soc2' },
    { label: 'HIPAA Compliant', value: 'hipaa' },
    { label: 'PCI-DSS', value: 'pci' },
  ]}
  defaultValue={['soc2']}
/>

<Checkbox
  label="Enable Automatic SSL Renewal"
  description="Renews certificates 30 days prior to expiry."
  theme="brand"
  defaultChecked
/>

<Switch
  label="Maintenance Mode"
  description="Temporarily routes public traffic to maintenance page."
  theme="amber"
/>
```

---

### 3. Imperative Dialogs & Modals
```tsx
import { dialog } from '@/lib/dialog'
import { toast } from 'sonner'

// Confirmation Dialog
const confirmed = await dialog.confirm({
  title: 'Publish Production Release?',
  message: 'This will push version 2.4.0 to all 24 edge nodes.',
  confirmLabel: 'Publish Now',
  theme: 'brand',
})

// Destructive Action Modal
const purged = await dialog.danger({
  title: 'Purge Redis Cache?',
  message: 'All ephemeral cache data will be permanently destroyed.',
  confirmLabel: 'Purge Cache',
})

// Interactive Prompt Modal
const res = await dialog.prompt({
  title: 'Rename Workspace',
  message: 'Enter the new title for this environment.',
  fields: [
    { name: 'name', label: 'Workspace Name', type: 'text', placeholder: 'e.g. Acme Production', required: true },
  ],
  confirmLabel: 'Save Title',
})
```

---

### 4. Enterprise Data Table & Data Grids
```tsx
import { DataTable } from '@/components/ui'

<DataTable
  columns={[
    { key: 'name', header: 'Member', sortable: true },
    { key: 'role', header: 'Access Role', sortable: true },
    { key: 'team', header: 'Engineering Team' },
    { key: 'status', header: 'Status' },
  ]}
  data={userRecords}
  selectable
  searchable
  pagination={{
    page: 1,
    pageSize: 10,
    total: 120,
    onPageChange: (newPage) => fetchPage(newPage),
  }}
/>
```

---

### 5. Kanban Workflow Board & Roadmap Gantt
```tsx
import { KanbanBoard, RoadmapGantt } from '@/components/ui'

<KanbanBoard
  columns={[
    { id: 'todo', title: 'Backlog', limit: 15 },
    { id: 'in_progress', title: 'In Flight', limit: 5 },
    { id: 'review', title: 'Peer Review', limit: 3 },
    { id: 'done', title: 'Deployed', limit: 100 },
  ]}
  initialTasks={tasks}
  onTaskMove={(taskId, targetCol) => handleTaskMove(taskId, targetCol)}
/>
```

---

### 6. AI Copilot Input & Model Selector
```tsx
import { AiPromptInput, ModelSelector } from '@/components/ui'

<AiPromptInput
  placeholder="Ask Strider AI to scaffold a component or refactor code..."
  modelSelector={<ModelSelector defaultValue="claude-3-5-sonnet" />}
  onSend={(prompt, files) => handleAiStream(prompt, files)}
  showAttachments
  maxTokens={8192}
/>
```

---

### 7. Metric Cards & Visualizations
```tsx
import { MetricCard, Gauge, Sparkline } from '@/components/ui'

<MetricCard
  title="Monthly Recurring Revenue"
  value="$148,250"
  change={18.4}
  changeLabel="vs last quarter"
  trend="up"
  theme="brand"
  sparklineData={[40, 55, 62, 78, 90, 120, 148]}
/>

<Gauge
  value={78}
  min={0}
  max={100}
  label="CPU Cluster Load"
  theme="brand"
  showValue
/>
```

---

## 6. Complete 157-Component Catalog

All components are directly exported from `@/components/ui`. See [`REGISTRY.md`](./REGISTRY.md) for full metadata:

- **Core Atoms**: `Button`, `ButtonGroup`, `Badge`, `Avatar`, `AvatarGroup`, `Icon`, `Kbd`, `Label`, `Logo`, `PulseBadge`, `ScoreBadge`, `Separator` (`Divider`), `Skeleton`, `Snippet`, `Spinner`, `LoadingIndicator`, `LoadingText`, `Toggle`, `ToggleGroup`, `SplitButton`
- **Form Controls**: `Input`, `PasswordInput`, `PasswordValidator`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup`, `Radio`, `Slider`, `Select`, `MultiSelect`, `Combobox`, `DatePicker`, `TimePicker`, `Duration`, `FileUploader`, `ColorPicker`, `TagInput`, `AiPromptInput`, `SignaturePad`, `PhoneInput`, `CurrencyInput`, `CreditCardInput`, `CronPicker`, `Rating`, `SegmentedControl`, `InputOTP`, `InputGroup`, `MentionInput`, `MultiEmailInput`, `Captcha`, `FormControl`
- **Overlays & Dialogs**: `Dialog`, `AlertDialog`, `Sheet`, `Drawer` (`BottomSheet`), `DropdownMenu`, `ContextMenu`, `Menubar`, `Popover`, `Tooltip`, `HoverCard`, `Tour`, `MediaLightbox`, `KeyboardShortcutsDialog`
- **Data Display**: `Card`, `DataTable`, `Table`, `Accordion`, `Tabs`, `Timeline`, `EmptyState`, `DiffViewer`, `JsonTree`, `Dock`, `DocumentPreview`, `MasonryGrid`, `PivotTable`, `VirtualList`, `OrgChartTree`, `PricingTable`, `KbdShortcutList`, `Collapsible`, `AspectRatio`, `CodeBlock`, `Carousel`, `Pagination`, `Resizable`, `ScrollArea`, `ScrollProgress`, `SectionHeader`, `PageHeader`, `Stepper`, `Tree`, `Field`, `Item`
- **Charts & Visualizations**: `ChartContainer`, `ChartTooltip`, `ChartLegend`, `Sparkline`, `BarList`, `Gauge`, `Heatmap`, `FunnelChart`, `Treemap`, `RoadmapGantt`, `Progress`, `CircularProgress`, `Trend`, `MetricCard`, `MetricCompare`
- **Security & DevTools**: `ApiKeyManager`, `ActiveSessions`, `TwoFactorSetup`, `AuditLogStream`, `WebhookTester`, `ServiceStatusGrid`, `LogViewer`, `TerminalEmulator`, `ContrastChecker`, `FilterBuilder`, `FacetFilter`, `MarkdownEditor`, `Watermark`, `PaletteGenerator`, `PipelineStep`
- **Collaboration & Media**: `CommentThread`, `NotificationCenter`, `NotificationPreferences`, `OmniSearch`, `MessageBubble`, `AudioPlayer`, `Confetti`, `ImageCompare`, `TopList`, `UserMenu`, `ModelSelector`
- **Feedback & Utilities**: `Alert`, `Banner`, `Breadcrumb`, `BreadcrumbNav`, `Countdown`, `NavigationMenu`, `Sidebar`, `ThemeToggle`, `Toast`, `Toaster`, `SonnerToaster`, `TransferList`, `SearchBar`, `SearchDialog`, `StriderUIProvider`, `useMobile`, `useToast`

---

## 7. Documentation Reference Index

| Document | Purpose |
| :--- | :--- |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | **Master Unified Specification**: Complete rulebook combining principles P1–P15, token layers, DO's/DONT's, and AI coding agent guidelines. |
| [`REGISTRY.md`](./REGISTRY.md) | **Component Tabular Index**: Detailed directory of all 157 components, imports, descriptions, and npm dependencies. |
| [`PHILOSOPHY.md`](./PHILOSOPHY.md) | **Generative Architectural Principles**: Deep-dive rationale behind API design, color orthogonality, and accessibility contracts. |
| [`CONTEXT.md`](./CONTEXT.md) | **Canonical Vocabulary**: Standardized terminology for composition levels, slot naming, and lifecycle states. |
| [`AGENTATION.md`](./AGENTATION.md) | **Visual AI Feedback Loop**: Instructions for using the in-browser visual annotation toolbar with AI coding agents. |
| [`registry.json`](./registry.json) | **Shadcn CLI Registry**: Official JSON registry schema for automated CLI component installation. |

---

## 📄 License

MIT © [AtlasRoX](https://github.com/AtlasRoX). Built with React 19, Next.js 16, and Tailwind CSS v4.
