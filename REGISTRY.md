# Strider UI — Component Registry & Cross-Project Distribution Guide

This document is the definitive guide to using, distributing, and integrating **Strider UI** (157+ enterprise React 19 / Next.js components) across all of your applications.

---

## 1. Quick Integration in Any Project

### Option A: Monorepo / Shared Package (Recommended)
If your applications live in a monorepo (Turborepo, pnpm workspaces, Bun):
```json
{
  "dependencies": {
    "@strider/ui": "workspace:*"
  }
}
```
Import anything from the unified barrel:
```tsx
import { Button, Input, Select, DataTable, KanbanBoard, dialog, toast } from '@strider/ui'
```

---

### Option B: Standalone Next.js App Setup (Direct Copy)
To use Strider UI components in a separate Next.js 15/16 App Router application:

1. **Copy Component & Library Folders**:
   - Copy `components/ui/` into your project's `components/ui/`
   - Copy `lib/` into your project's `lib/`

2. **Add OKLCH Theme Tokens to `globals.css`**:
   Ensure your `app/globals.css` contains the OKLCH token layer and Tailwind CSS v4 directives:
   ```css
   @import "tailwindcss";
   @import "tw-animate-css";

   @custom-variant dark (&:where(.dark, .dark *));

   :root {
     --surface-base: oklch(0.99 0 0);
     --surface-card: oklch(1 0 0);
     --surface-muted: oklch(0.96 0.005 185);
     --surface-subtle: oklch(0.93 0.01 185);
     --ink-primary: oklch(0.13 0.01 185);
     --ink-secondary: oklch(0.42 0.02 185);
     --ink-muted: oklch(0.62 0.01 185);
     --outline-base: oklch(0.90 0.005 185);
     --outline-focus: oklch(0.55 0.05 185);

     /* 2-Axis Theme Colors */
     --brand-solid: oklch(0.55 0.05 185);
     --brand-subtle: oklch(0.94 0.02 185);
     --gray-solid: oklch(0.20 0.01 185);
     --gray-subtle: oklch(0.95 0 0);
     --blue-solid: oklch(0.55 0.18 245);
     --blue-subtle: oklch(0.95 0.03 245);
     --emerald-solid: oklch(0.56 0.17 152);
     --emerald-subtle: oklch(0.95 0.03 152);
     --amber-solid: oklch(0.70 0.17 75);
     --amber-subtle: oklch(0.96 0.04 75);
     --rose-solid: oklch(0.55 0.20 25);
     --rose-subtle: oklch(0.96 0.03 25);
     --violet-solid: oklch(0.56 0.20 290);
     --violet-subtle: oklch(0.96 0.03 290);
   }

   .dark {
     --surface-base: oklch(0.12 0.01 185);
     --surface-card: oklch(0.16 0.01 185);
     --surface-muted: oklch(0.20 0.015 185);
     --ink-primary: oklch(0.98 0 0);
     --ink-secondary: oklch(0.75 0.01 185);
     --outline-base: oklch(0.26 0.01 185);
     --brand-solid: oklch(0.60 0.06 185);
     --brand-subtle: oklch(0.22 0.03 185);
   }
   ```

3. **Wrap Root Layout with `<StriderUIProvider>`**:
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

### Option C: Shadcn CLI Registry Integration
Strider UI ships with an official `registry.json` containing complete metadata, dependencies, and file definitions for all 157+ components.

You can install individual components via shadcn:
```bash
npx shadcn@latest add http://localhost:3000/registry/button.json
```

---

## 2. Core Architectural Tenets

1. **Two-Axis Color Palettes (P4)**:
   Every interactive component accepts:
   - `variant`: `'solid' | 'outline' | 'subtle' | 'ghost' | 'link'`
   - `theme`: `'brand' | 'gray' | 'blue' | 'emerald' | 'amber' | 'rose' | 'violet'`

2. **Uniform Labeling Contract (P5)**:
   All form components accept:
   ```tsx
   <Input
     label="API Key"
     description="Used for edge runner auth"
     error={hasError ? "Invalid secret" : undefined}
     required
     clearable
   />
   ```

3. **Zero-Boilerplate Imperative Services (P9)**:
   ```tsx
   import { dialog } from '@/lib/dialog'
   import { toast } from 'sonner'

   // Confirm dialog
   const ok = await dialog.confirm({
     title: 'Deploy to Production?',
     message: 'This will update 24 edge nodes worldwide.',
   })

   // Danger prompt
   const purged = await dialog.danger({
     title: 'Purge Ephemeral Cache?',
     confirmLabel: 'Purge Now',
   })
   ```

---

## 3. Comprehensive Component Registry (157 Components)

### Core Atoms & Primitives

| Component | Import | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Avatar** | `@/components/ui/avatar` | Polymorphic avatar with automated initials calculation, deterministic color hashing, and status dots. | `@radix-ui/react-avatar, class-variance-authority` |
| **Badge** | `@/components/ui/badge` | Status badge supporting 2-axis theme tokens, pulsing live indicators, copyable chips, and remove actions. | `@radix-ui/react-slot, class-variance-authority, lucide-react, sonner` |
| **Button** | `@/components/ui/button` | 2-axis button matrix supporting solid, outline, subtle, and ghost variants across 7 semantic OKLCH themes. | `@radix-ui/react-slot, class-variance-authority, lucide-react` |
| **Button Group** | `@/components/ui/button-group` | Cohesive segmented grouping container for connected or spaced button collections. | `@radix-ui/react-slot, class-variance-authority, @/components/ui/separator` |
| **Icon** | `@/components/ui/icon` | Lucide icon wrapper with standardized sizing and theme color token linkage. | `lucide-react` |
| **Kbd** | `@/components/ui/kbd` | Mechanical keyboard shortcut keycap badge with platform modifier symbol translations. | `None` |
| **Label** | `@/components/ui/label` | Accessible form label primitive with required asterisk and disabled state handling. | `@radix-ui/react-label` |
| **Logo** | `@/components/ui/logo` | Strider brand SVG logo component with responsive size and monochrome/color variants. | `None` |
| **Pulse Badge** | `@/components/ui/pulse-badge` | Live heartbeat indicator badge with radiant radar ring pulse animation. | `None` |
| **Score Badge** | `@/components/ui/score-badge` | Gamified circular compliance score ring with rank tiers and verification checkpoints. | `lucide-react, @/components/ui/badge` |
| **Separator** | `@/components/ui/separator` | Semantic visual divider line with horizontal/vertical orientations and optional text label. | `@radix-ui/react-separator` |
| **Skeleton** | `@/components/ui/skeleton` | Animated placeholder skeleton loader for content loading states. | `class-variance-authority` |
| **Snippet** | `@/components/ui/snippet` | Inline code snippet pill with one-click copy to clipboard and toast feedback. | `lucide-react, sonner` |
| **Spinner** | `@/components/ui/spinner` | Circular SVG loading spinner with size and theme color variants. | `class-variance-authority` |
| **Toggle** | `@/components/ui/toggle` | Two-state icon toggle button with pressed and unpressed variants. | `@radix-ui/react-toggle, class-variance-authority` |
| **Toggle Group** | `@/components/ui/toggle-group` | Single or multiple toggle button group for toolbars and state switches. | `@radix-ui/react-toggle-group, class-variance-authority, @/components/ui/toggle` |

### Form Controls & Inputs

| Component | Import | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Ai Prompt Input** | `@/components/ui/ai-prompt-input` | Multi-modal AI prompt composer with token counters, attachment chips, model pill selector, and streaming state. | `lucide-react, @/components/ui/button` |
| **Captcha** | `@/components/ui/captcha` | Interactive bot verification challenge control with honeypot security check. | `lucide-react, @/components/ui/spinner` |
| **Checkbox** | `@/components/ui/checkbox` | Accessible toggle control with indeterminate state, theme accents, uniform labeling, and card mode. | `@radix-ui/react-checkbox, lucide-react` |
| **Color Picker** | `@/components/ui/color-picker` | Hex/RGB color selector with preset swatches, native eye-dropper, and click-to-copy. | `lucide-react, sonner, @/components/ui/button, @/components/ui/input, @/components/ui/popover` |
| **Combobox** | `@/components/ui/combobox` | Searchable autocomplete dropdown with keyboard navigation, fuzzy filtering, and empty states. | `@radix-ui/react-popover, lucide-react, @/components/ui/form-control` |
| **Credit Card Input** | `@/components/ui/credit-card-input` | PCI-compliant credit card payment input with live card brand detection and luhn validation. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |
| **Cron Picker** | `@/components/ui/cron-picker` | Visual cron schedule builder with natural language human translation. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |
| **Currency Input** | `@/components/ui/currency-input` | Localized money and currency input with ISO currency code selector and live formatting. | `None` |
| **Date Picker** | `@/components/ui/date-picker` | Single and range date picker input with popover calendar and formatted display. | `@radix-ui/react-popover, date-fns, lucide-react, @/components/ui/button, @/components/ui/calendar, @/components/ui/form-control` |
| **Duration** | `@/components/ui/duration` | Time duration selector input supporting seconds, minutes, hours, and days. | `lucide-react, @/components/ui/form-control, @/components/ui/input` |
| **File Uploader** | `@/components/ui/file-uploader` | Drag-and-drop file upload zone with file type validation, preview thumbnails, and progress bars. | `lucide-react, @/components/ui/form-control, @/components/ui/progress` |
| **Form** | `@/components/ui/form` | React Hook Form integration with validation schemas, field errors, and accessible labeling. | `@radix-ui/react-label, @radix-ui/react-slot, react-hook-form, @/components/ui/label` |
| **Form Control** | `@/components/ui/form-control` | P5 uniform labeling contract wrapper linking inputs to labels, descriptions, and errors. | `lucide-react` |
| **Input** | `@/components/ui/input` | Uniform text input adhering to P5 labeling contract with clearable and size variants. | `class-variance-authority, lucide-react, @/components/ui/form-control` |
| **Input Group** | `@/components/ui/input-group` | Compound input wrapper with attached button addons, dropdowns, and icon prefixes/suffixes. | `class-variance-authority, @/components/ui/button, @/components/ui/input, @/components/ui/textarea` |
| **Input Otp** | `@/components/ui/input-otp` | One-time password / 2FA pin code input with automatic digit advance and clipboard paste. | `input-otp, lucide-react` |
| **Mention Input** | `@/components/ui/mention-input` | Text area with @user and #tag auto-completing trigger popup mentions. | `@/components/ui/avatar` |
| **Multi Email Input** | `@/components/ui/multi-email-input` | Email chip tag input with regex RFC 5322 validation and duplicate detection. | `lucide-react, @/components/ui/badge, @/components/ui/form-control` |
| **Multi Select** | `@/components/ui/multi-select` | Multi-value selection dropdown with removable badges, select-all, and search filtering. | `@radix-ui/react-popover, lucide-react, @/components/ui/badge, @/components/ui/form-control` |
| **Password Input** | `@/components/ui/password-input` | Secure password input with show/hide toggle and real-time zxcvbn strength indicator. | `lucide-react, @/components/ui/input` |
| **Password Validator** | `@/components/ui/password-validator` | Visual checklist validating password requirements against enterprise security criteria. | `lucide-react` |
| **Phone Input** | `@/components/ui/phone-input` | International telephone number input with country flag selector and E.164 formatting. | `lucide-react, @/components/ui/input, @/components/ui/popover` |
| **Radio Group** | `@/components/ui/radio-group` | Radio button selection group with standard, vertical, and card option styles. | `@radix-ui/react-radio-group, lucide-react` |
| **Rating** | `@/components/ui/rating` | Interactive star and emoji rating input with half-star precision and hover preview. | `lucide-react` |
| **Segmented Control** | `@/components/ui/segmented-control` | Sliding pill segmented tab switcher with keyboard navigation and icon support. | `None` |
| **Select** | `@/components/ui/select` | Accessible custom select dropdown adhering to P8 single-selection contract. | `@radix-ui/react-select, lucide-react, @/components/ui/form-control` |
| **Signature Pad** | `@/components/ui/signature-pad` | HTML5 canvas electronic signature pad with smooth stroke smoothing and PNG/SVG export. | `lucide-react, @/components/ui/button` |
| **Slider** | `@/components/ui/slider` | Range and single value thumb slider with touch support, tooltip value hints, and tick marks. | `@radix-ui/react-slider` |
| **Switch** | `@/components/ui/switch` | Toggle switch control with custom sizing and theme color accents. | `@radix-ui/react-switch` |
| **Tag Input** | `@/components/ui/tag-input` | Interactive keyword tag pill input with autocomplete suggestions and keyboard delete. | `@/components/ui/badge` |
| **Textarea** | `@/components/ui/textarea` | Auto-growing multi-line text input with character counter and error states. | `class-variance-authority, @/components/ui/form-control` |
| **Time Picker** | `@/components/ui/time-picker` | Time selector input with 12/24 hour modes, minute steps, and AM/PM toggle. | `lucide-react, @/components/ui/form-control, @/components/ui/input` |

### Overlays, Dialogs & Modals

| Component | Import | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Alert Dialog** | `@/components/ui/alert-dialog` | Modal confirmation dialog for destructive or high-consequence user actions. | `@radix-ui/react-alert-dialog, @/components/ui/button` |
| **Context Menu** | `@/components/ui/context-menu` | Right-click context menu with nested submenus, checkbox items, and keyboard shortcuts. | `@radix-ui/react-context-menu, lucide-react, @/components/ui/kbd` |
| **Dialog** | `@/components/ui/dialog` | Accessible modal window overlay with customizable sizes, keyboard trap, and imperative service APIs. | `@radix-ui/react-dialog, lucide-react` |
| **Drawer** | `@/components/ui/drawer` | Sliding panel drawer overlay emerging from any screen edge with responsive mobile bottom-sheet support. | `vaul` |
| **Dropdown Menu** | `@/components/ui/dropdown-menu` | Action menu triggered by button clicks with menu items, separators, and shortcuts. | `@radix-ui/react-dropdown-menu, lucide-react, @/components/ui/kbd` |
| **Hover Card** | `@/components/ui/hover-card` | Preview popover card displaying rich preview content on cursor hover. | `@radix-ui/react-hover-card` |
| **Keyboard Shortcuts Dialog** | `@/components/ui/keyboard-shortcuts-dialog` | Global keyboard shortcuts modal cheat sheet with categorized bindings. | `@/components/ui/dialog, @/components/ui/kbd` |
| **Media Lightbox** | `@/components/ui/media-lightbox` | Full-screen media lightbox modal with image zoom, gallery slider, and caption overlay. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |
| **Menubar** | `@/components/ui/menubar` | Desktop application top navigation menu bar with nested submenu trees and accelerators. | `@radix-ui/react-menubar, lucide-react` |
| **Popover** | `@/components/ui/popover` | Rich contextual popover overlay anchored to trigger elements with arrow indicator. | `@radix-ui/react-popover` |
| **Sheet** | `@/components/ui/sheet` | Side overlay drawer container with slide-in animations from top, right, bottom, or left. | `@radix-ui/react-dialog, lucide-react` |
| **Tooltip** | `@/components/ui/tooltip` | Accessible hover tooltip popup with micro-animations and custom delay times. | `@radix-ui/react-tooltip, @/components/ui/kbd` |
| **Tour** | `@/components/ui/tour` | Guided product tour walkthrough with anchored spotlight popovers and step navigation. | `lucide-react, @/components/ui/button` |

### Data Display & Layout

| Component | Import | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Accordion** | `@/components/ui/accordion` | Collapsible interactive accordion sections with smooth height animations. | `@radix-ui/react-accordion, lucide-react` |
| **Aspect Ratio** | `@/components/ui/aspect-ratio` | Maintains desired aspect ratio for media elements and responsive embeds. | `@radix-ui/react-aspect-ratio` |
| **Card** | `@/components/ui/card` | Container surface with modular header, title, description, content, and footer regions. | `class-variance-authority` |
| **Carousel** | `@/components/ui/carousel` | Touch-friendly responsive carousel slider with dot indicators, autoplay, and navigation arrows. | `embla-carousel-react, lucide-react, @/components/ui/button` |
| **Code Block** | `@/components/ui/code-block` | Syntax-highlighted code container with line numbers, language badge, and copy-to-clipboard button. | `lucide-react, sonner` |
| **Collapsible** | `@/components/ui/collapsible` | Interactive disclosure panel that toggles visibility of collapsible content sections. | `@radix-ui/react-collapsible` |
| **Data Table** | `@/components/ui/data-table` | Enterprise data grid with sorting, row selection, column toggling, filtering, and pagination. | `lucide-react, @/components/ui/button, @/components/ui/checkbox, @/components/ui/empty, @/components/ui/skeleton, @/components/ui/table` |
| **Diff Viewer** | `@/components/ui/diff-viewer` | Side-by-side and unified git code diff comparison viewer with line addition/deletion highlights. | `None` |
| **Dock** | `@/components/ui/dock` | macOS-inspired application floating dock with proximity hover magnification and badge indicators. | `None` |
| **Document Preview** | `@/components/ui/document-preview` | In-app document and PDF viewer with zoom controls, page switching, and electronic seal. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |
| **Empty** | `@/components/ui/empty` | Empty state illustration placeholder with title, description, and action button slots. | `class-variance-authority, lucide-react` |
| **Field** | `@/components/ui/field` | Semantic form field system supporting vertical, horizontal, and responsive layouts with error boundaries. | `class-variance-authority, @/components/ui/label, @/components/ui/separator` |
| **Item** | `@/components/ui/item` | Polymorphic list item with media, content, title, description, and actions slots. | `@radix-ui/react-slot, class-variance-authority, @/components/ui/separator` |
| **Json Tree** | `@/components/ui/json-tree` | Interactive expandable JSON tree viewer with type color coding and click-to-copy keys. | `lucide-react, sonner` |
| **Kbd Shortcut List** | `@/components/ui/kbd-shortcut-list` | Categorized hotkey index sheet with stylized mechanical keycaps. | `lucide-react, @/components/ui/kbd` |
| **Masonry Grid** | `@/components/ui/masonry-grid` | Responsive Pinterest-style masonry grid layout with dynamic column heights. | `None` |
| **Org Chart Tree** | `@/components/ui/org-chart-tree` | Hierarchical company organization chart tree with expandable nodes and team avatars. | `lucide-react, @/components/ui/avatar, @/components/ui/badge` |
| **Page Header** | `@/components/ui/page-header` | Standard page title banner with breadcrumb, action buttons, and description slots. | `@/components/ui/breadcrumb` |
| **Pagination** | `@/components/ui/pagination` | Accessible pagination navigation controls with page numbers, jump-to-page, and row size selectors. | `lucide-react, @/components/ui/button` |
| **Pivot Table** | `@/components/ui/pivot-table` | Multi-dimensional financial cross-tabulation matrix with subtotals, grand totals, and CSV export. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |
| **Pricing Table** | `@/components/ui/pricing-table` | Tiered SaaS pricing comparison table with feature checklists, annual/monthly toggle, and CTAs. | `lucide-react, @/components/ui/badge, @/components/ui/button` |
| **Resizable** | `@/components/ui/resizable` | Split pane resizable layout with draggable handles and min/max constraints. | `lucide-react, react-resizable-panels` |
| **Scroll Area** | `@/components/ui/scroll-area` | Custom cross-browser scrollbar container with smooth hover and auto-hide behaviors. | `@radix-ui/react-scroll-area` |
| **Section Header** | `@/components/ui/section-header` | Content section divider header with title, subtitle, and inline action triggers. | `None` |
| **Split Button** | `@/components/ui/split-button` | Primary action button coupled with secondary dropdown options menu. | `lucide-react, @/components/ui/button, @/components/ui/dropdown-menu` |
| **Stepper** | `@/components/ui/stepper` | Multi-step onboarding wizard progress stepper with completed, active, and pending states. | `lucide-react` |
| **Table** | `@/components/ui/table` | Stylized HTML table component primitives with striped rows, sticky headers, and hover highlights. | `None` |
| **Tabs** | `@/components/ui/tabs` | Accessible tabbed interface supporting line, enclosed, and subtle pill variants. | `@radix-ui/react-tabs` |
| **Timeline** | `@/components/ui/timeline` | Vertical event timeline with status dots, connector lines, and time-stamped activity cards. | `lucide-react` |
| **Tree** | `@/components/ui/tree` | Hierarchical folder and file tree directory with expandable branches and selection. | `lucide-react, @/components/ui/badge` |
| **Virtual List** | `@/components/ui/virtual-list` | High-throughput 60FPS virtual scroll list viewport engine with search filtering. | `lucide-react, @/components/ui/badge, @/components/ui/button` |

### Charts & Analytics Visualizations

| Component | Import | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Bar List** | `@/components/ui/bar-list` | Horizontal metric bar list for ranking items with proportional fill tracks and value labels. | `None` |
| **Chart** | `@/components/ui/chart` | Chart container wrapper and tooltip system configured for Recharts with OKLCH CSS variables. | `recharts` |
| **Circular Progress** | `@/components/ui/circular-progress` | Radial progress indicator with customizable stroke widths, percentage text, and status colors. | `None` |
| **Funnel Chart** | `@/components/ui/funnel-chart` | Multi-stage conversion funnel visualization with drop-off percentages and conversion metrics. | `None` |
| **Gauge** | `@/components/ui/gauge` | Radial speed/utilization gauge meter with needle indicator, danger zones, and min/max ranges. | `None` |
| **Heatmap** | `@/components/ui/heatmap` | Contribution activity grid heatmap with intensity color scales and tooltip inspections. | `None` |
| **Progress** | `@/components/ui/progress` | Linear percentage progress bar with animated transitions, theme colors, and label slots. | `@radix-ui/react-progress, class-variance-authority` |
| **Roadmap Gantt** | `@/components/ui/roadmap-gantt` | Product roadmap Gantt timeline with monthly tracks, milestone flags, and progress bars. | `lucide-react, @/components/ui/avatar, @/components/ui/badge, @/components/ui/button` |
| **Sparkline** | `@/components/ui/sparkline` | Compact inline SVG micro-chart showing data trends without axis clutter. | `None` |
| **Treemap** | `@/components/ui/treemap` | Nested hierarchical treemap rectangle chart with proportional area sizing. | `None` |
| **Trend** | `@/components/ui/trend` | Upward/downward metric trend indicator with percentage change and color coding. | `lucide-react` |

### Enterprise Security & DevTools

| Component | Import | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Active Sessions** | `@/components/ui/active-sessions` | Security device session manager with geolocation, browser badges, and remote revocation. | `lucide-react, @/components/ui/badge, @/components/ui/button` |
| **Agentation** | `@/components/ui/agentation` | Visual feedback loop and component annotation overlay for AI coding agents. | `agentation` |
| **Api Key Manager** | `@/components/ui/api-key-manager` | Secret key management vault with masked reveal, scope badges, expiration dates, and key generation. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |
| **Audit Log Stream** | `@/components/ui/audit-log-stream` | Immutable SOC2 compliance security log stream with expandable JSON metadata and severity tags. | `lucide-react, @/components/ui/avatar, @/components/ui/badge` |
| **Contrast Checker** | `@/components/ui/contrast-checker` | Real-time WCAG 2.2 luminance contrast ratio evaluator with AA/AAA pass and fail badges. | `lucide-react, @/components/ui/badge` |
| **Filter Builder** | `@/components/ui/filter-builder` | Multi-rule SQL/query filter rule builder with AND/OR condition groups and operator selectors. | `lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/select` |
| **Facet Filter** | `@/components/ui/facet-filter` | Faceted multi-select filter popover with option counts, search filtering, and clear actions. | `lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/checkbox, @/components/ui/popover` |
| **Log Viewer** | `@/components/ui/log-viewer` | Terminal-style streaming log console with log level filters, search, autoscroll, and ANSI colors. | `lucide-react, sonner, @/components/ui/button` |
| **Markdown Editor** | `@/components/ui/markdown-editor` | Live dual-pane markdown editor with preview rendering, formatting toolbar, and table insertion. | `@strider/ui, lucide-react, @/components/ui/badge, @/components/ui/button` |
| **Model Selector** | `@/components/ui/model-selector` | AI language model switcher dropdown with parameter limits, provider icons, and latency tags. | `lucide-react, @/components/ui/badge, @/components/ui/dropdown-menu` |
| **Palette Generator** | `@/components/ui/palette-generator` | OKLCH two-axis color palette designer with contrast validation and CSS export. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |
| **Pipeline Step** | `@/components/ui/pipeline-step` | Multi-stage CI/CD pipeline step tracker with status icons, elapsed time, and logs toggle. | `lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/spinner` |
| **Service Status Grid** | `@/components/ui/service-status-grid` | Infrastructure uptime monitor with 90-day availability timeline pills and SLA health score. | `lucide-react, @/components/ui/badge` |
| **Terminal Emulator** | `@/components/ui/terminal-emulator` | Interactive browser terminal CLI emulator with command history, output streaming, and clear. | `lucide-react, sonner` |
| **Two Factor Setup** | `@/components/ui/two-factor-setup` | Interactive 2FA setup wizard with QR code generation, manual entry key, and recovery codes. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button, @/components/ui/input-otp` |
| **Watermark** | `@/components/ui/watermark` | Security background watermark pattern overlay protecting sensitive dashboard documents. | `None` |
| **Webhook Tester** | `@/components/ui/webhook-tester` | Endpoint dispatcher simulator with event type switcher, JSON payload editor, and response inspector. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |

### Collaboration, Social & Audio

| Component | Import | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Audio Player** | `@/components/ui/audio-player` | Waveform and scrubbing audio player with playback speed, volume controls, and track meta. | `lucide-react, @/components/ui/button` |
| **Comment Thread** | `@/components/ui/comment-thread` | Contextual discussion threads with nested replies, emoji reactions, and thread resolution. | `lucide-react, sonner, @/components/ui/avatar, @/components/ui/badge, @/components/ui/button` |
| **Confetti** | `@/components/ui/confetti` | Physics particle celebration cannon engine for milestone completions and onboarding wins. | `lucide-react, @/components/ui/button` |
| **Image Compare** | `@/components/ui/image-compare` | Interactive split-screen image slider for before-and-after visual comparisons. | `lucide-react` |
| **Message Bubble** | `@/components/ui/message-bubble` | Chat conversation message bubble with sender meta, timestamp, and status ticks. | `lucide-react, sonner, @/components/ui/avatar` |
| **Notification Center** | `@/components/ui/notification-center` | Full notification dropdown popover with badge counts, tabbed filters, and action handlers. | `lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/dropdown-menu, @/components/ui/scroll-area` |
| **Notification Preferences** | `@/components/ui/notification-preferences` | Granular multi-channel notification matrix settings with toggle switches. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button, @/components/ui/switch` |
| **Omni Search** | `@/components/ui/omni-search` | Universal spotlight search and command launcher with fuzzy filtering and categorized tabs. | `lucide-react, sonner, @/components/ui/badge, @/components/ui/button` |
| **Top List** | `@/components/ui/top-list` | Leaderboard ranking widget showing top items with avatars, change indicators, and metric values. | `lucide-react, @/components/ui/avatar` |
| **User Menu** | `@/components/ui/user-menu` | Authenticated user profile dropdown trigger with account navigation and logout action. | `lucide-react, @/components/ui/avatar, @/components/ui/dropdown-menu` |

### Feedback, Banners & Shell Utilities

| Component | Import | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Alert** | `@/components/ui/alert` | Contextual feedback banner supporting 4 visual variants across 7 OKLCH semantic themes. | `class-variance-authority, lucide-react` |
| **Banner** | `@/components/ui/banner` | Full-width announcement bar with call-to-action buttons and dismiss triggers. | `lucide-react` |
| **Breadcrumb** | `@/components/ui/breadcrumb` | Accessible breadcrumb component hierarchy with dropdown ellipsis support. | `@radix-ui/react-slot, lucide-react` |
| **Breadcrumb Nav** | `@/components/ui/breadcrumb-nav` | Semantic breadcrumb navigation path with custom separators and active item styling. | `lucide-react` |
| **Countdown** | `@/components/ui/countdown` | Deluxe flip-clock and pill countdown timer with day/hour/minute/second intervals. | `None` |
| **Loading Indicator** | `@/components/ui/loading-indicator` | Continuous indeterminate animated loading bar with theme accents. | `None` |
| **Loading Text** | `@/components/ui/loading-text` | Shimmering animated status loading message with step transitions. | `@/components/ui/spinner` |
| **Navigation Menu** | `@/components/ui/navigation-menu` | Mega-menu navigation header with animated slide-in flyout panels. | `@radix-ui/react-navigation-menu, class-variance-authority, lucide-react` |
| **Provider** | `@/components/ui/provider` | Root StriderUIProvider wrapping ThemeProvider, TooltipProvider, ImperativeDialog, and Toaster. | `@radix-ui/react-tooltip, next-themes, @/components/ui/agentation, @/components/ui/sonner` |
| **Scroll Progress** | `@/components/ui/scroll-progress` | Fixed page top scroll progress bar tracking reading completion percentage. | `None` |
| **Search Bar** | `@/components/ui/search-bar` | Instant search input field with shortcut kbd badge and clear button. | `lucide-react, @/components/ui/input` |
| **Search Dialog** | `@/components/ui/search-dialog` | Global keyboard shortcut search and command palette dialog. | `lucide-react, @/components/ui/button, @/components/ui/dialog, @/components/ui/input` |
| **Sidebar** | `@/components/ui/sidebar` | Enterprise collateral sidebar with collapsible sections, tooltips, rail mode, and mobile drawer. | `@radix-ui/react-slot, class-variance-authority, lucide-react, @/components/ui/button, @/components/ui/input, @/components/ui/separator, @/components/ui/sheet, @/components/ui/skeleton, @/components/ui/tooltip` |
| **Sonner** | `@/components/ui/sonner` | Sonner toast notification provider wrapper with OKLCH theme styling. | `next-themes, sonner` |
| **Theme Toggle** | `@/components/ui/theme-toggle` | Light, dark, and system theme switcher dropdown and button toggle with smooth icon transitions. | `lucide-react, next-themes, @/components/ui/button, @/components/ui/dropdown-menu, @/components/ui/tooltip` |
| **Toast** | `@/components/ui/toast` | Floating toast notification primitive with action buttons and dismiss timers. | `@radix-ui/react-toast, class-variance-authority, lucide-react` |
| **Toaster** | `@/components/ui/toaster` | Toast notification container viewport managing active toast queues. | `@/components/ui/toast` |
| **Transfer List** | `@/components/ui/transfer-list` | Dual-box transfer list for moving items between source and target buckets with search. | `lucide-react, @/components/ui/button, @/components/ui/checkbox` |
| **Use Mobile** | `@/components/ui/use-mobile` | React hook detecting mobile viewport breakpoints (<768px). | `None` |
| **Use Toast** | `@/components/ui/use-toast` | React state hook and dispatcher for managing imperative toast notifications. | `@/components/ui/toast` |

