'use client'

import * as React from 'react'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import {
  Boxes,
  Layers,
  Sliders,
  ShieldCheck,
  FileText,
  BarChart3,
  Bot,
  Copy,
  Moon,
  Sun,
  Laptop,
  Check,
  Terminal,
  ExternalLink,
  Code2,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

export interface GlobalCommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const COMPONENT_REGISTRY = [
  // Atoms & Primitives
  { name: 'Button', category: 'Atoms', description: '2-Axis button with solid, outline, subtle, ghost variants' },
  { name: 'ButtonGroup', category: 'Atoms', description: 'Attached or spaced button grouping' },
  { name: 'SplitButton', category: 'Atoms', description: 'Primary action with attached dropdown menu trigger' },
  { name: 'Badge', category: 'Atoms', description: '2-Axis pill badge with dot, pulse, and removable states' },
  { name: 'PulseBadge', category: 'Atoms', description: 'Live animated radar status pill' },
  { name: 'ScoreBadge', category: 'Atoms', description: 'Color-graded health & confidence indicator' },
  { name: 'Avatar', category: 'Atoms', description: 'User image with status ring and initials fallback' },
  { name: 'AvatarGroup', category: 'Atoms', description: 'Stacked avatar group with count overflow' },
  { name: 'Kbd', category: 'Atoms', description: 'Accessible keyboard shortcut badge' },
  { name: 'Spinner', category: 'Atoms', description: 'Dual-speed indeterminate loading spinner' },
  { name: 'Skeleton', category: 'Atoms', description: 'Content placeholder with shimmering pulse' },

  // Form Controls (P5 Contract)
  { name: 'Input', category: 'Forms', description: 'P5 accessible text input with label and prefix/suffix' },
  { name: 'PasswordInput', category: 'Forms', description: 'Toggleable password visibility with strength indicator' },
  { name: 'Textarea', category: 'Forms', description: 'Auto-expanding multi-line text input' },
  { name: 'Checkbox', category: 'Forms', description: 'Accessible checkbox with label and description' },
  { name: 'Switch', category: 'Forms', description: 'Accessible toggle switch with dual-state labeling' },
  { name: 'RadioGroup', category: 'Forms', description: 'Accessible radio button collection' },
  { name: 'Slider', category: 'Forms', description: 'Range slider with single or multi-thumb bounds' },
  { name: 'DatePicker', category: 'Forms', description: 'Calendar date selection with presets' },
  { name: 'TimePicker', category: 'Forms', description: '12h / 24h clock time selector' },
  { name: 'Duration', category: 'Forms', description: 'Time duration input with days/hours/minutes' },
  { name: 'FileUploader', category: 'Forms', description: 'Drag-and-drop file upload zone with progress' },
  { name: 'PhoneInput', category: 'Forms', description: 'International telephone input with country codes' },
  { name: 'CurrencyInput', category: 'Forms', description: 'Monetary input with ISO symbol formatting' },
  { name: 'TagInput', category: 'Forms', description: 'Pill tag entry with delimiter and badge removal' },
  { name: 'CreditCardInput', category: 'Forms', description: 'Live interactive card visualizer with Luhn validation' },
  { name: 'AutoForm', category: 'Forms', description: 'Auto-generate full P5 forms from Zod schema' },

  // Selection Family (P8)
  { name: 'Select', category: 'Selection', description: 'Single fixed-choice dropdown selector' },
  { name: 'MultiSelect', category: 'Selection', description: 'Multi-tag selection with removable chips' },
  { name: 'Combobox', category: 'Selection', description: 'Searchable autocomplete selection with remote filter' },
  { name: 'SegmentedControl', category: 'Selection', description: 'Sliding pill segment switcher' },
  { name: 'TransferList', category: 'Selection', description: 'Dual-pane item transfer picker' },
  { name: 'FacetFilter', category: 'Selection', description: 'Multi-attribute facet search filtering' },
  { name: 'FilterBuilder', category: 'Selection', description: 'Rule condition builder (AND / OR predicates)' },

  // Overlays & Dialogs (P9)
  { name: 'Dialog', category: 'Overlays', description: 'Accessible modal dialog overlay' },
  { name: 'ResponsiveDialog', category: 'Overlays', description: 'Desktop modal dialog ↔ Mobile bottom drawer' },
  { name: 'Sheet', category: 'Overlays', description: 'Slide-out drawer panel from left, right, top, bottom' },
  { name: 'Drawer', category: 'Overlays', description: 'Bottom gesture-driven sheet for touch devices' },
  { name: 'DropdownMenu', category: 'Overlays', description: 'Contextual actions menu' },
  { name: 'ContextMenu', category: 'Overlays', description: 'Right-click contextual action palette' },
  { name: 'Popover', category: 'Overlays', description: 'Floating contextual container' },
  { name: 'Tooltip', category: 'Overlays', description: 'Hover text bubble with custom delay' },

  // Data Display & Grids
  { name: 'DataTable', category: 'Data', description: 'Sortable, searchable data grid with pagination' },
  { name: 'PivotTable', category: 'Data', description: 'Multi-dimensional data aggregation table' },
  { name: 'KanbanBoard', category: 'Data', description: 'Drag-and-drop workflow task board' },
  { name: 'RoadmapGantt', category: 'Data', description: 'Timeline roadmap with milestone dragging' },
  { name: 'VirtualList', category: 'Data', description: 'High-performance 100k+ row virtualized scroller' },
  { name: 'MasonryGrid', category: 'Data', description: 'Dynamic Pinterest-style auto-fitting column grid' },
  { name: 'Tree', category: 'Data', description: 'Hierarchical node explorer with branch folding' },
  { name: 'JsonTree', category: 'Data', description: 'Interactive formatted JSON inspector' },
  { name: 'DiffViewer', category: 'Data', description: 'Side-by-side or unified code diff comparator' },
  { name: 'LogViewer', category: 'Data', description: 'Real-time log stream with level filtering' },

  // Enterprise SaaS
  { name: 'ApiKeyManager', category: 'Enterprise', description: 'Developer API token creation, scoping & revocation' },
  { name: 'WebhookTester', category: 'Enterprise', description: 'Live webhook dispatch, payload editor & response log' },
  { name: 'NotificationPreferences', category: 'Enterprise', description: 'Multi-channel delivery matrix table' },
  { name: 'AuditLogStream', category: 'Enterprise', description: 'Security audit trail with actor and IP geolocation' },
  { name: 'ActiveSessions', category: 'Enterprise', description: 'Session viewer with device icons and revoke actions' },
  { name: 'TwoFactorSetup', category: 'Enterprise', description: '2FA wizard with TOTP QR and backup recovery codes' },
  { name: 'CommentThread', category: 'Enterprise', description: 'Nested discussion thread with emoji reactions' },
  { name: 'ServiceStatusGrid', category: 'Enterprise', description: 'Service uptime status grid with latency pings' },
  { name: 'PricingTable', category: 'Enterprise', description: 'Tiered subscription pricing grid with billing toggle' },

  // AI Copilot Suite
  { name: 'AiPromptInput', category: 'AI Copilot', description: 'AI chat prompt bar with attachments and model tags' },
  { name: 'ModelSelector', category: 'AI Copilot', description: 'LLM model dropdown with latency and context sizes' },
  { name: 'MessageBubble', category: 'AI Copilot', description: 'Chat message bubble with role styling and copy actions' },
  { name: 'CodeBlock', category: 'AI Copilot', description: 'Syntax-highlighted code block with line numbering' },
  { name: 'TerminalEmulator', category: 'AI Copilot', description: 'Interactive command shell with ANSI color output' },

  // Charts & Visualizations
  { name: 'MetricCard', category: 'Charts', description: 'KPI metric card with change pill and mini sparkline' },
  { name: 'MetricCompare', category: 'Charts', description: 'Side-by-side metric comparison bar' },
  { name: 'Sparkline', category: 'Charts', description: 'Lightweight inline trend line and area graphic' },
  { name: 'Gauge', category: 'Charts', description: 'Circular speedometer and metric progress gauge' },
  { name: 'FunnelChart', category: 'Charts', description: 'Multi-stage conversion funnel drop-off graph' },
  { name: 'Heatmap', category: 'Charts', description: 'Contribution and activity intensity matrix' },
  { name: 'BarList', category: 'Charts', description: 'Horizontal ranked bar list with values' },
  { name: 'Timeline', category: 'Charts', description: 'Vertical chronological activity event feed' },
]

const MASTER_AGENT_DIRECTIVE = `You are developing user interfaces exclusively using the Strider UI Design System.
Strict rules:
1. All UI components MUST be imported from '@/components/ui'.
2. Use 2-Axis styling ('variant': solid/outline/subtle/ghost + 'theme': brand/gray/blue/emerald/amber/rose/violet). Never use semantic intents like intent="danger" or color="primary".
3. Use OKLCH CSS variables (var(--surface-*), var(--ink-*), var(--outline-*), var(--<theme>-*)) for custom containers.
4. Pass label, description, error, and required directly to inputs (P5 uniform form contract).
5. Use Select (single), MultiSelect (tags), Combobox (searchable) from P8 selection family.
6. Use imperative dialog helpers: await dialog.confirm(), await dialog.danger(), await dialog.prompt() from '@/lib/dialog'.
7. Use crisp Lucide engineering icons (Bot, Cpu, Layers, Terminal, Sliders, Code2, Boxes, Zap, Star). Never use sparkles or magic wands.
8. Read AGENTS.md and DESIGN_SYSTEM.md for full specs.`

export function GlobalCommandPalette({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: GlobalCommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen
  const setIsOpen = isControlled ? setControlledOpen! : setInternalOpen

  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isOpen, setIsOpen])

  const copyImport = (componentName: string) => {
    const code = `import { ${componentName} } from '@/components/ui'`
    navigator.clipboard.writeText(code)
    toast.success(`Copied: ${code}`)
    setIsOpen(false)
  }

  const copyShadcnCommand = (componentName: string) => {
    const slug = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    const code = `npx shadcn@latest add http://localhost:3000/registry/${slug}.json`
    navigator.clipboard.writeText(code)
    toast.success(`Copied CLI install command for ${componentName}`)
    setIsOpen(false)
  }

  const copyMasterPrompt = () => {
    navigator.clipboard.writeText(MASTER_AGENT_DIRECTIVE)
    toast.success('Copied Strider UI Master Agent Directive to clipboard!')
    setIsOpen(false)
  }

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Strider UI Command Center"
      description="Search all 157+ components, copy code snippets, and manage agent directives."
    >
      <CommandInput placeholder="Type a component name (e.g. Button, DataTable, AutoForm, Kanban)..." />
      <CommandList>
        <CommandEmpty>No matching Strider UI component found.</CommandEmpty>

        {/* Master AI Agent Actions */}
        <CommandGroup heading="AI Agent Directives & Shortcuts">
          <CommandItem
            onSelect={copyMasterPrompt}
            prefix={<Bot className="size-4 text-[var(--violet-solid)]" />}
          >
            <div className="flex flex-col">
              <span className="font-semibold text-xs text-[var(--ink-primary)]">
                Copy Master AI Agent Directive Prompt
              </span>
              <span className="text-[11px] text-[var(--ink-muted)]">
                Paste into Antigravity, Claude Code, Cursor, or ChatGPT to lock into Strider UI
              </span>
            </div>
            <CommandShortcut combo="⌘⇧C" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Theme Switcher */}
        <CommandGroup heading="Theme & Display Settings">
          <CommandItem
            onSelect={() => {
              setTheme('light')
              toast.success('Switched to Light Theme')
              setIsOpen(false)
            }}
            prefix={<Sun className="size-4 text-amber-500" />}
          >
            Switch to Light Theme
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme('dark')
              toast.success('Switched to Dark Theme')
              setIsOpen(false)
            }}
            prefix={<Moon className="size-4 text-violet-500" />}
          >
            Switch to Dark Theme
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme('system')
              toast.success('Syncing with System Theme')
              setIsOpen(false)
            }}
            prefix={<Laptop className="size-4 text-[var(--ink-muted)]" />}
          >
            Sync with Operating System
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Component Catalog Grouped by Category */}
        {['Atoms', 'Forms', 'Selection', 'Overlays', 'Data', 'Enterprise', 'AI Copilot', 'Charts'].map(
          (category) => {
            const items = COMPONENT_REGISTRY.filter((c) => c.category === category)
            if (items.length === 0) return null

            return (
              <CommandGroup key={category} heading={`${category} Components (${items.length})`}>
                {items.map((item) => (
                  <CommandItem
                    key={item.name}
                    onSelect={() => copyImport(item.name)}
                    prefix={
                      category === 'Atoms' ? (
                        <Layers className="size-4 text-[var(--brand-solid)]" />
                      ) : category === 'Forms' ? (
                        <Sliders className="size-4 text-[var(--emerald-solid)]" />
                      ) : category === 'Selection' ? (
                        <Check className="size-4 text-[var(--blue-solid)]" />
                      ) : category === 'Overlays' ? (
                        <ShieldCheck className="size-4 text-[var(--violet-solid)]" />
                      ) : category === 'Data' ? (
                        <FileText className="size-4 text-[var(--amber-solid)]" />
                      ) : category === 'Enterprise' ? (
                        <Boxes className="size-4 text-[var(--brand-solid)]" />
                      ) : category === 'AI Copilot' ? (
                        <Bot className="size-4 text-[var(--violet-solid)]" />
                      ) : (
                        <BarChart3 className="size-4 text-[var(--rose-solid)]" />
                      )
                    }
                  >
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-semibold text-xs text-[var(--ink-primary)]">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-[var(--ink-muted)] truncate">
                        {item.description}
                      </span>
                    </div>
                    <span
                      onClick={(e) => {
                        e.stopPropagation()
                        copyShadcnCommand(item.name)
                      }}
                      className="p-1 rounded-md hover:bg-[var(--surface-subtle)] text-[10px] font-mono text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors"
                      title="Copy CLI Install Command"
                    >
                      <Terminal className="size-3" />
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          }
        )}
      </CommandList>
    </CommandDialog>
  )
}
