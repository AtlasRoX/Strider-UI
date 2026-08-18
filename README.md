# StriderBoard — Enterprise Next.js UI Design System & Component Library

[![React 19](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://react.dev/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.0.0-black.svg)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38bdf8.svg)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-darkviolet.svg)](https://www.radix-ui.com/)
[![Components Count](https://img.shields.io/badge/Components-160+-emerald.svg)](./REGISTRY.md)
[![Design System Spec](https://img.shields.io/badge/Design_System-P1--P15_OKLCH-indigo.svg)](./DESIGN_SYSTEM.md)

**StriderBoard / Strider UI** is a full-stack, enterprise-grade component architecture and design system built for modern SaaS platforms. It ships with **160+ accessible React 19 / Radix UI components**, unified **two-axis OKLCH color palettes**, zero-boilerplate imperative dialog services, interactive charts, developer vaults, AI copilot interfaces, and a complete **AI Agent Constitution Ecosystem** (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `.windsurfrules`).

---

## 📑 Table of Contents

1. [Quickstart (Run Locally)](#1-quickstart-run-locally)
2. [Instant 1-Command Project Setup (Bootstrap Any Workspace)](#2-instant-1-command-project-setup-bootstrap-any-workspace)
3. [How to Instruct Your AI Coding Agent (Analyze ➔ Plan ➔ Build)](#3-how-to-instruct-your-ai-coding-agent-analyze--plan--build)
4. [Using Strider UI in Your Other Projects (Manual Setup)](#4-using-strider-ui-in-your-other-projects-manual-setup)
   - [Step 1: Install Peer Dependencies](#step-1-install-peer-dependencies)
   - [Step 2: Copy Component & Utility Files](#step-2-copy-component--utility-files)
   - [Step 3: Configure Tailwind CSS v4 & OKLCH Tokens](#step-3-configure-tailwind-css-v4--oklch-tokens)
   - [Step 4: Wrap Root Layout with Provider](#step-4-wrap-root-layout-with-provider)
5. [Developer CLI Tools & Automation](#5-developer-cli-tools--automation)
6. [Strict DO's and DON'Ts Matrix](#6-strict-dos-and-donts-matrix)
7. [Key Component Usage Recipes](#7-key-component-usage-recipes)
   - [2-Axis Buttons & Badges](#1-2-axis-buttons--badges)
   - [P5 Uniform Form Controls & AutoForm](#2-p5-uniform-form-controls--autoform)
   - [Imperative Dialogs & Responsive Dialog](#3-imperative-dialogs--responsive-dialog)
   - [Global Command Palette (Cmd+K)](#4-global-command-palette-cmdk)
   - [Enterprise Data Table & Data Grids](#5-enterprise-data-table--data-grids)
   - [Kanban Workflow Board & Roadmap Gantt](#6-kanban-workflow-board--roadmap-gantt)
   - [AI Copilot Input & Model Selector](#7-ai-copilot-input--model-selector)
   - [Metric Cards & Visualizations](#8-metric-cards--visualizations)
8. [Complete 160-Component Catalog](#8-complete-160-component-catalog)
9. [Documentation Reference Index](#9-documentation-reference-index)

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

- **Component Showcase (All 160+ UI Controls)**: [`http://localhost:3000/components`](http://localhost:3000/components)
- **Global Command Palette**: Press **`Cmd+K`** or **`Ctrl+K`** anywhere to search components and copy code snippets.

---

## 2. Instant 1-Command Project Setup (Bootstrap Any Workspace)

When starting any new Next.js or React application, you can configure the entire Strider UI ecosystem in seconds with the built-in initializer:

```bash
# In your StriderBoard directory (or via npx tsx):
pnpm run setup:project <path-to-your-target-project>
```

This automated script performs the following tasks:
1. ✅ Copies all `components/ui/` and `lib/` folders to your project.
2. ✅ Injects the OKLCH token layer and dark-mode styles into `app/globals.css`.
3. ✅ Ingests all AI Agent Constitutions (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md`).
4. ✅ Updates your target `package.json` with all required peer dependencies.

---

## 3. How to Instruct Your AI Coding Agent (Analyze ➔ Plan ➔ Build)

When you clone Strider UI into a new project, copy and paste this **Master Prompt** into your AI coding assistant (**Antigravity, Claude Code, Cursor, Windsurf, Codex, ChatGPT**):

```markdown
I want to build [Describe Your Application / Feature, e.g. "a Multi-Tenant SaaS Workspace for API Keys, Webhooks, Billing, and Team Members"].

STRICT INSTRUCTIONS:
1. FIRST, analyze the Strider UI components in `@/components/ui` and read `AGENTS.md`.
2. SECOND, formulate a step-by-step implementation plan that explicitly maps every view, table, form, metric, and modal to existing Strider UI components and OKLCH tokens.
3. THIRD, after presenting the plan, build the UI strictly following the Strider UI design system (2-Axis variant/theme styling, P5 uniform form labeling, and imperative dialog helpers). Do not install other UI libraries or invent custom color classes.
```

### 🧭 The AI Agent Execution Lifecycle

```
Step 1: Reconnaissance ➔ Step 2: Architecture Plan ➔ Step 3: 100% Compliant Execution
```

1. **Phase 1: Strider UI Reconnaissance**: The agent scans `@/components/ui/index.ts` and `app/globals.css` to identify all existing components and OKLCH color tokens.
2. **Phase 2: Architectural Mapping Plan**: The agent formulates a structured implementation plan mapping your application features to exact Strider primitives (`MetricCard`, `DataTable`, `AutoForm`, `ResponsiveDialog`, `dialog.confirm()`).
3. **Phase 3: 100% Compliant Execution**: The agent writes clean, accessible React 19 code importing exclusively from `@/components/ui` and `@/lib/dialog`.

---

## 4. Using Strider UI in Your Other Projects (Manual Setup)

You can also manually integrate Strider UI into any Next.js 15/16, React 19, or Vite application:

### Step 1: Install Peer Dependencies

```bash
# Core Primitives & Styling
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip

# Icons, Charts, Animation & Utilities
pnpm add lucide-react recharts sonner class-variance-authority clsx tailwind-merge cmdk vaul input-otp next-themes zod date-fns react-day-picker
```

---

### Step 2: Copy Component & Utility Files

```
Your-Project/
├── components/
│   └── ui/              <-- Copy from StriderBoard/components/ui/
├── lib/                 <-- Copy from StriderBoard/lib/
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

  /* Outline Layers (Borders) */
  --outline-base: oklch(0.90 0.005 185);
  --outline-muted: oklch(0.94 0.003 185);
  --outline-focus: oklch(0.55 0.05 185);

  /* 7 Two-Axis Theme Palettes */
  --brand-solid: oklch(0.55 0.05 185);
  --brand-subtle: oklch(0.94 0.02 185);
  --brand-ink: oklch(0.35 0.04 185);

  --gray-solid: oklch(0.20 0.01 185);
  --gray-subtle: oklch(0.95 0 0);
  --gray-ink: oklch(0.25 0 0);

  --blue-solid: oklch(0.55 0.18 245);
  --blue-subtle: oklch(0.95 0.03 245);
  --blue-ink: oklch(0.35 0.12 245);

  --emerald-solid: oklch(0.56 0.17 152);
  --emerald-subtle: oklch(0.95 0.03 152);
  --emerald-ink: oklch(0.35 0.12 152);

  --amber-solid: oklch(0.70 0.17 75);
  --amber-subtle: oklch(0.96 0.04 75);
  --amber-ink: oklch(0.38 0.12 75);

  --rose-solid: oklch(0.55 0.20 25);
  --rose-subtle: oklch(0.96 0.03 25);
  --rose-ink: oklch(0.40 0.14 25);

  --violet-solid: oklch(0.56 0.20 290);
  --violet-subtle: oklch(0.96 0.03 290);
  --violet-ink: oklch(0.38 0.14 290);
}

.dark {
  --surface-base: oklch(0.12 0.01 185);
  --surface-card: oklch(0.16 0.01 185);
  --surface-muted: oklch(0.20 0.015 185);
  --surface-subtle: oklch(0.24 0.02 185);
  --ink-primary: oklch(0.98 0 0);
  --ink-secondary: oklch(0.75 0.01 185);
  --outline-base: oklch(0.26 0.01 185);
  --brand-solid: oklch(0.60 0.06 185);
  --brand-subtle: oklch(0.22 0.03 185);
}
```

---

### Step 4: Wrap Root Layout with Provider

Wrap children with `<StriderUIProvider>` to automatically enable tooltips, theme toggling, imperative dialog services, toast notifications, the `Cmd+K` command palette, and the Agentation feedback overlay:

```tsx
// app/layout.tsx
import * as React from 'react'
import { StriderUIProvider } from '@/components/ui/provider'
import '@/app/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--surface-base)] text-[var(--ink-primary)] font-sans antialiased">
        <StriderUIProvider defaultTheme="light" enableSystem toastPosition="bottom-right">
          {children}
        </StriderUIProvider>
      </body>
    </html>
  )
}
```

---

## 5. Developer CLI Tools & Automation

StriderBoard includes built-in CLI scripts to accelerate everyday development:

```bash
# 1. Bootstrap any external project with Strider UI:
pnpm run setup:project <path-to-target-project>

# 2. Scaffold a new component strictly adhering to P1–P15:
pnpm run new:component <component-name> [--type=atom|form]

# 3. Scan components/ui/ and regenerate registry.json & docs:
pnpm run registry:build
```

---

## 6. Strict DO's and DON'Ts Matrix

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

## 7. Key Component Usage Recipes

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

### 2. P5 Uniform Form Controls & AutoForm
```tsx
import { Input, PasswordInput, Select, MultiSelect, AutoForm } from '@/components/ui'
import { z } from 'zod'

// Standard P5 Input Contract:
<Input
  label="Project Subdomain"
  placeholder="e.g. acme-edge"
  description="Allocates your dedicated edge URL."
  required
/>

// Auto-generated Form from Zod Schema:
const profileSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  role: z.enum(["admin", "developer", "viewer"]),
  notifications: z.boolean().default(true),
})

<AutoForm
  schema={profileSchema}
  onSubmit={async (data) => await saveUser(data)}
  submitLabel="Save Profile"
/>
```

---

### 3. Imperative Dialogs & Responsive Dialog
```tsx
import { dialog } from '@/lib/dialog'
import { ResponsiveDialog, Button, Input } from '@/components/ui'

// Imperative Modal Confirmation:
const confirmed = await dialog.confirm({
  title: 'Publish Production Release?',
  message: 'This will push version 2.4.0 to all edge nodes.',
  confirmLabel: 'Publish Now',
})

// Adaptive Desktop Dialog / Mobile Vaul Drawer:
<ResponsiveDialog
  title="Invite Team Member"
  description="Send an invitation link with granular role permissions."
  trigger={<Button variant="solid" theme="brand">Invite Member</Button>}
>
  <Input label="Email Address" placeholder="colleague@company.com" required />
</ResponsiveDialog>
```

---

### 4. Global Command Palette (Cmd+K)
```tsx
import { GlobalCommandPalette } from '@/components/ui'

// Automatically mounted in <StriderUIProvider>, or trigger manually:
const [open, setOpen] = React.useState(false)
<GlobalCommandPalette open={open} onOpenChange={setOpen} />
```

---

### 5. Enterprise Data Table & Data Grids
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
  pagination={{
    page: 1,
    pageSize: 10,
    total: 120,
    onPageChange: (newPage) => fetchPage(newPage),
  }}
/>
```

---

### 6. Kanban Workflow Board & Roadmap Gantt
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

### 7. AI Copilot Input & Model Selector
```tsx
import { AiPromptInput, ModelSelector } from '@/components/ui'

<AiPromptInput
  placeholder="Ask Strider AI to scaffold a component or refactor code..."
  modelSelector={<ModelSelector defaultValue="claude-3-5-sonnet" />}
  onSubmit={(prompt, attachments) => handleAiStream(prompt, attachments)}
  maxTokens={8192}
/>
```

---

### 8. Metric Cards & Visualizations
```tsx
import { MetricCard, Gauge, Sparkline } from '@/components/ui'

<MetricCard
  title="Monthly Recurring Revenue"
  value="$148,250"
  change="+18.4%"
  changeType="increase"
  changePeriod="vs last month"
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

## 8. Complete 167-Component Catalog

All components are directly exported from `@/components/ui`. See [`REGISTRY.md`](./REGISTRY.md) for full metadata:

- **Layout & Typographic Primitives**: `Container`, `Section`, `Stack`, `VStack`, `HStack`, `SimpleGrid`, `Heading`, `Text`, `Blockquote`, `Highlight`, `Card`, `AspectRatio`, `Separator` (`Divider`), `ScrollArea`, `Resizable`, `SectionHeader`, `PageHeader`, `MasonryGrid`, `Dock`
- **Core Atoms & Utilities**: `Button`, `ButtonGroup`, `Badge`, `Avatar`, `AvatarGroup`, `CopyButton`, `QrCode`, `CookieConsent`, `Icon`, `Kbd`, `Label`, `Logo`, `PulseBadge`, `ScoreBadge`, `Skeleton`, `Snippet`, `Spinner`, `LoadingIndicator`, `LoadingText`, `Toggle`, `ToggleGroup`, `SplitButton`
- **Form Controls (P5 Contract)**: `Input`, `PasswordInput`, `NumberInput`, `Editable`, `PasswordValidator`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup`, `Radio`, `Slider`, `Select`, `MultiSelect`, `Combobox`, `DatePicker`, `TimePicker`, `Duration`, `FileUploader`, `ColorPicker`, `TagInput`, `AiPromptInput`, `SignaturePad`, `PhoneInput`, `CurrencyInput`, `CreditCardInput`, `CronPicker`, `Rating`, `SegmentedControl`, `InputOTP`, `InputGroup`, `MentionInput`, `MultiEmailInput`, `Captcha`, `FormControl`, `AutoForm`
- **Overlays & Dialogs**: `Dialog`, `AlertDialog`, `Sheet`, `Drawer` (`BottomSheet`), `DropdownMenu`, `ContextMenu`, `Menubar`, `Popover`, `Tooltip`, `HoverCard`, `Tour`, `MediaLightbox`, `KeyboardShortcutsDialog`, `ResponsiveDialog`, `GlobalCommandPalette`
- **Data Display & Tables**: `DataTable`, `PivotTable`, `ComparisonTable`, `DescriptionList`, `Table`, `Accordion`, `Tabs`, `Timeline`, `EmptyState`, `DiffViewer`, `JsonTree`, `DocumentPreview`, `VirtualList`, `OrgChartTree`, `PricingTable`, `KbdShortcutList`, `Collapsible`, `CodeBlock`, `Carousel`, `Pagination`, `ScrollProgress`, `Stepper`, `Tree`, `Field`, `Item`
- **Charts & Visualizations**: `ChartContainer`, `ChartTooltip`, `ChartLegend`, `Sparkline`, `BarList`, `Gauge`, `Heatmap`, `FunnelChart`, `Treemap`, `RoadmapGantt`, `Progress`, `CircularProgress`, `Trend`, `MetricCard`, `MetricCompare`
- **Security & DevTools**: `ApiKeyManager`, `ActiveSessions`, `TwoFactorSetup`, `AuditLogStream`, `WebhookTester`, `ServiceStatusGrid`, `LogViewer`, `TerminalEmulator`, `ContrastChecker`, `FilterBuilder`, `FacetFilter`, `MarkdownEditor`, `Watermark`, `PaletteGenerator`, `PipelineStep`
- **Collaboration & Media**: `CommentThread`, `NotificationCenter`, `NotificationPreferences`, `OmniSearch`, `MessageBubble`, `AudioPlayer`, `Confetti`, `ImageCompare`, `TopList`, `UserMenu`, `ModelSelector`
- **Feedback & Utilities**: `Alert`, `Banner`, `Breadcrumb`, `BreadcrumbNav`, `Countdown`, `NavigationMenu`, `Sidebar`, `ThemeToggle`, `Toast`, `Toaster`, `SonnerToaster`, `TransferList`, `SearchBar`, `SearchDialog`, `StriderUIProvider`, `useMobile`, `useToast`

---

## 9. Documentation Reference Index

| Document | Purpose |
| :--- | :--- |
| [`AGENTS.md`](./AGENTS.md) | **Universal AI Agent Constitution**: The mandatory 3-phase workflow (`Analyze ➔ Plan ➔ Build`) and rulebook for all AI coding assistants. |
| [`CLAUDE.md`](./CLAUDE.md) | **Claude Code Configuration**: Native instructions for Claude Code CLI. |
| [`GEMINI.md`](./GEMINI.md) | **Antigravity / Gemini Kernel**: System kernel and operating rules for Antigravity agents. |
| [`.cursorrules`](./.cursorrules) | **Cursor IDE Rules**: Auto-loaded instructions for Cursor Composer. |
| [`.windsurfrules`](./.windsurfrules) | **Windsurf Rules**: Configuration for Windsurf / Cascade AI agent. |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | **Master Unified Specification**: Complete rulebook combining principles P1–P15, token layers, DO's/DONT's. |
| [`REGISTRY.md`](./REGISTRY.md) | **Component Tabular Index**: Directory of all 160 components, imports, and dependencies. |
| [`AGENTATION.md`](./AGENTATION.md) | **Visual AI Feedback Loop**: Instructions for in-browser visual annotation for AI coding agents. |
| [`registry.json`](./registry.json) | **Shadcn CLI Registry**: Official JSON registry schema for automated CLI component installation. |

---

## 📄 License

MIT © [AtlasRoX](https://github.com/AtlasRoX). Built with React 19, Next.js 16, and Tailwind CSS v4.
