'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Button,
  ButtonGroup,
  Badge,
  Alert,
  Avatar,
  AvatarGroup,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  PasswordInput,
  Textarea,
  Checkbox,
  Switch,
  RadioGroup,
  Radio,
  Slider,
  Select,
  MultiSelect,
  Combobox,
  DatePicker,
  TimePicker,
  Duration,
  FileUploader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  DataTable,
  EmptyState,
  Progress,
  Spinner,
  LoadingText,
  LoadingIndicator,
  Skeleton,
  Kbd,
  Separator,
  Tooltip,
  ThemeToggle,
  Logo,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  Sparkline,
  BarList,
  Gauge,
  MetricCard,
  Timeline,
  TimelineItem,
  SegmentedControl,
  ColorPicker,
  CodeBlock,
  Banner,
  TagInput,
  Heatmap,
  FunnelChart,
  Trend,
  Treemap,
  SignaturePad,
  PhoneInput,
  CurrencyInput,
  TransferList,
  MentionInput,
  Dock,
  SplitButton,
  Tour,
  FloatingActionMenu,
  ImageCompare,
  DiffViewer,
  Snippet,
  AudioPlayer,
  Captcha,
  Watermark,
  Countdown,
  AiPromptInput,
  MessageBubble,
  ModelSelector,
  LogViewer,
  PulseBadge,
  PipelineStep,
  JsonTree,
  FilterBuilder,
  FacetFilter,
  MetricCompare,
  TopList,
  CircularProgress,
  PricingTable,
  CreditCardInput,
  ActiveSessions,
  TwoFactorSetup,
  ScrollProgress,
  MasonryGrid,
  ContrastChecker,
  KbdShortcutList,
  KanbanBoard,
  RoadmapGantt,
  PivotTable,
  VirtualList,
  CronPicker,
  ApiKeyManager,
  WebhookTester,
  ServiceStatusGrid,
  CommentThread,
  AuditLogStream,
  NotificationPreferences,
  DocumentPreview,
  OmniSearch,
  Confetti,
  ScoreBadge,
} from '@/components/ui'
import { dialog } from '@/lib/dialog'
import {
  ArrowRight,
  Layers,
  CheckCircle,
  AlertCircle,
  FileText,
  Trash2,
  Share2,
  Copy,
  Settings,
  Mail,
  User,
  Search,
  ExternalLink,
  Type,
  BookOpen,
  Sliders,
  Code2,
  Check,
  Cpu,
  Zap,
  CheckCircle2,
  Boxes,
  Terminal,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Server,
  Gauge as GaugeIcon,
  GitCommit,
  GitPullRequest,
  Package,
  ShieldCheck,
  Bot,
  Palette,
  SlidersHorizontal,
  Bell,
  CheckCheck,
  Home,
  MessageSquare,
  Calendar,
  Mic,
  FileCode,
  Compass,
  HelpCircle,
  CreditCard,
  Lock,
  Plus,
  Eye,
  EyeOff,
  ShieldAlert,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart as RechartsPie,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { toast } from 'sonner'
import type { ThemeColor, ComponentVariant } from '@/lib/theme-types'
import { FONT_LIBRARY, listFonts } from '@/lib/fonts'

const THEMES: ThemeColor[] = ['brand', 'gray', 'blue', 'emerald', 'amber', 'rose', 'violet']
const VARIANTS: ComponentVariant[] = ['solid', 'outline', 'subtle', 'ghost']

const SAMPLE_USERS = [
  { id: '1', name: 'Eleanor Vance', email: 'eleanor@strider.dev', role: 'Lead Architect', status: 'Active', team: 'Core' },
  { id: '2', name: 'Marcus Thorne', email: 'marcus@strider.dev', role: 'Senior Engineer', status: 'Active', team: 'Platform' },
  { id: '3', name: 'Chloe Chen', email: 'chloe@strider.dev', role: 'UI/UX Designer', status: 'Away', team: 'Design' },
  { id: '4', name: 'Devon Patel', email: 'devon@strider.dev', role: 'DevOps Lead', status: 'Offline', team: 'Infrastructure' },
  { id: '5', name: 'Aria Sterling', email: 'aria@strider.dev', role: 'Product Manager', status: 'Active', team: 'Product' },
]

export default function ComponentsShowcasePage() {
  const [selectedTab, setSelectedTab] = React.useState('atoms')
  const [btnLoading, setBtnLoading] = React.useState(false)
  const [sliderVal, setSliderVal] = React.useState([45])
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeColor>('brand')
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>(['1'])
  const [dialogSize, setDialogSize] = React.useState<'sm' | 'md' | 'lg' | 'xl'>('md')
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [isTechStackOpen, setIsTechStackOpen] = React.useState(false)
  const [activeFontId, setActiveFontId] = React.useState<string>('google-sans')
  const [customFontText, setCustomFontText] = React.useState('Designing iconic user interfaces with precision, clarity, and typographic excellence.')
  const [customFontWeight, setCustomFontWeight] = React.useState<number>(500)
  const [customFontSize, setCustomFontSize] = React.useState<number[]>([22])

  // State for new interactive components
  const [segmentedTimeframe, setSegmentedTimeframe] = React.useState<'day' | 'week' | 'month' | 'year'>('week')
  const [segmentedView, setSegmentedView] = React.useState<'grid' | 'list' | 'analytics'>('analytics')
  const [pickerColor, setPickerColor] = React.useState('#3b82f6')
  const [demoTags, setDemoTags] = React.useState(['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Radix UI', 'Strider'])
  const [gaugeDemoValue, setGaugeDemoValue] = React.useState<number[]>([76])
  const [isTourOpen, setIsTourOpen] = React.useState(false)
  const [transferSelection, setTransferSelection] = React.useState<string[]>(['1', '2'])
  const [currencyValue, setCurrencyValue] = React.useState(14850)
  const [captchaVerified, setCaptchaVerified] = React.useState(false)
  const [showSecretKey, setShowSecretKey] = React.useState(false)
  const [aiPromptText, setAiPromptText] = React.useState('')
  const [aiIsStreaming, setAiIsStreaming] = React.useState(false)
  const [sampleLogs, setSampleLogs] = React.useState([
    { id: '1', timestamp: '14:28:01.402', level: 'info' as const, source: 'edge-gw-01', message: 'HTTP GET /api/v1/auth/session 200 OK (12ms)' },
    { id: '2', timestamp: '14:28:03.119', level: 'debug' as const, source: 'auth-vault', message: 'Token signature verified with key id #pub-rsa-819' },
    { id: '3', timestamp: '14:28:05.882', level: 'warn' as const, source: 'cache-redis', message: 'Connection latency spike detected on node eu-central-1 (82ms)' },
    { id: '4', timestamp: '14:28:09.301', level: 'error' as const, source: 'billing-svc', message: 'Webhook retry 2/5 failed: Stripe signature mismatch' },
    { id: '5', timestamp: '14:28:12.650', level: 'info' as const, source: 'cron-runner', message: 'Scheduled rollup table optimization completed' },
  ])
  const [facetCategories, setFacetCategories] = React.useState<string[]>(['engineering', 'design'])
  const [inputDemoState, setInputDemoState] = React.useState<'normal' | 'error' | 'disabled'>('normal')
  const [inputDemoSize, setInputDemoSize] = React.useState<'sm' | 'md' | 'lg'>('md')
  const [selectedCurrency, setSelectedCurrency] = React.useState<'USD' | 'EUR' | 'GBP' | 'JPY'>('USD')

  // Test Imperative Dialog Confirm
  const handleTestConfirm = async () => {
    const confirmed = await dialog.confirm({
      title: 'Deploy New Production Build?',
      message: 'This will publish version 2.4.0 to all active edge nodes worldwide.',
      confirmLabel: 'Deploy Now',
    })
    if (confirmed) {
      toast.success('Deployment initiated successfully!')
    } else {
      toast.info('Deployment cancelled.')
    }
  }

  // Test Imperative Dialog Danger
  const handleTestDanger = async () => {
    const confirmed = await dialog.danger({
      title: 'Permanent Database Purge',
      message: 'This action cannot be undone. All ephemeral cache data will be destroyed.',
      confirmLabel: 'Purge Database',
    })
    if (confirmed) {
      toast.error('Database records purged!')
    }
  }

  // Test Imperative Dialog Prompt
  const handleTestPrompt = async () => {
    const result = await dialog.prompt({
      title: 'Rename Project',
      message: 'Enter the new display name for this workspace.',
      fields: [
        {
          name: 'name',
          label: 'Workspace Name',
          type: 'text',
          placeholder: 'e.g. Acme Cloud Production',
          required: true,
        },
      ],
      confirmLabel: 'Save Changes',
    })
    if (result) {
      toast.success(`Project renamed to "${result.name}"`)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--ink-primary)] selection:bg-[var(--brand-solid)] selection:text-white pb-24">
      {/* Top Banner & Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--outline-base)] bg-[var(--surface-base)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo width={130} height={30} />
              <Badge size="sm" variant="subtle" theme="brand">
                v1.0 (React 19)
              </Badge>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              theme="brand"
              size="sm"
              onClick={() => setIsTechStackOpen(true)}
            >
              <Code2 className="size-3.5 mr-1.5" /> Tech Stack
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-6">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-solid)]">
            <Layers className="size-4" />
            <span>Strider UI Design System · Modular Framework</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Strider UI Component Design System
          </h1>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            An enterprise-grade component architecture built for modern SaaS platforms.
            Featuring unified two-axis color palettes, accessible form controls, imperative dialog services, and high-performance data grids.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)]/70 shadow-xs flex items-center gap-3">
            <div className="size-9 rounded-lg bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold text-sm">
              <Boxes className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[var(--ink-primary)]">100+ UI Components</span>
              <span className="text-[11px] text-[var(--ink-muted)]">Complete Enterprise Ecosystem</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)]/70 shadow-xs flex items-center gap-3">
            <div className="size-9 rounded-lg bg-[var(--emerald-subtle)] text-[var(--emerald-solid)] flex items-center justify-center font-bold text-sm">
              <BarChart3 className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[var(--ink-primary)]">Charts & Analytics</span>
              <span className="text-[11px] text-[var(--ink-muted)]">Sparklines, Gauges & Recharts</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)]/70 shadow-xs flex items-center gap-3">
            <div className="size-9 rounded-lg bg-[var(--violet-subtle)] text-[var(--violet-solid)] flex items-center justify-center font-bold text-sm">
              <Zap className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[var(--ink-primary)]">7 OKLCH Palettes</span>
              <span className="text-[11px] text-[var(--ink-muted)]">2-Axis Solid/Subtle</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)]/70 shadow-xs flex items-center gap-3">
            <div className="size-9 rounded-lg bg-[var(--amber-subtle)] text-[var(--amber-ink)] flex items-center justify-center font-bold text-sm">
              <CheckCircle2 className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[var(--ink-primary)]">100% Type-Safe</span>
              <span className="text-[11px] text-[var(--ink-muted)]">React 19 & Radix UI</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList variant="subtle" size="lg" className="w-full justify-start p-1.5 bg-[var(--surface-card)] border border-[var(--outline-base)] rounded-2xl shadow-xs h-auto flex-wrap gap-1.5">
              <TabsTrigger
                value="atoms"
                prefix={<Layers className="size-4 text-[var(--brand-solid)]" />}
              >
                Core Atoms
              </TabsTrigger>
              <TabsTrigger
                value="forms"
                prefix={<Sliders className="size-4 text-[var(--emerald-solid)]" />}
              >
                Form Controls & Inputs
              </TabsTrigger>
              <TabsTrigger
                value="overlays"
                prefix={<ShieldCheck className="size-4 text-[var(--violet-solid)]" />}
              >
                Overlays & Dialogs
              </TabsTrigger>
              <TabsTrigger
                value="data"
                prefix={<FileText className="size-4 text-[var(--blue-solid)]" />}
              >
                Data Display & Tables
              </TabsTrigger>
              <TabsTrigger
                value="charts"
                prefix={<BarChart3 className="size-4 text-[var(--amber-solid)]" />}
              >
                Charts & Graphs
              </TabsTrigger>
              <TabsTrigger
                value="enterprise"
                prefix={<Boxes className="size-4 text-[var(--brand-solid)]" />}
                badge={
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--brand-solid)] text-white">
                    New
                  </span>
                }
              >
                Enterprise & DevTools
              </TabsTrigger>
              <TabsTrigger
                value="tokens"
                prefix={<Palette className="size-4 text-[var(--rose-solid)]" />}
              >
                Theme Tokens
              </TabsTrigger>
              <TabsTrigger
                value="fonts"
                prefix={<Type className="size-4 text-[var(--ink-secondary)]" />}
              >
                Fonts & Typography
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: CORE ATOMS */}
            <TabsContent value="atoms" className="flex flex-col gap-8 mt-6">
              {/* 2-Axis Button Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle>2-Axis Button Matrix (Variant × Theme)</CardTitle>
                  <CardDescription>
                    Principle P4: Exactly two color axes with solid, outline, subtle, and ghost variants across 7 semantic themes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  {VARIANTS.map((v) => (
                    <div key={v} className="flex flex-col gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                        Variant: {v}
                      </span>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {THEMES.map((t) => (
                          <Button key={t} variant={v} theme={t} size="sm">
                            {t}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Separator />

                  {/* Button Extras & Groups */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                      Button States, Icons & Attached Groups
                    </span>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button variant="solid" theme="brand" loading>
                        Loading State
                      </Button>
                      <Button variant="subtle" theme="emerald" prefix={<CheckCircle className="size-4" />}>
                        Verified
                      </Button>
                      <Button variant="outline" theme="rose" suffix={<Trash2 className="size-4" />}>
                        Delete Item
                      </Button>

                      <ButtonGroup attached>
                        <Button variant="outline" theme="gray" size="sm">Years</Button>
                        <Button variant="solid" theme="brand" size="sm">Months</Button>
                        <Button variant="outline" theme="gray" size="sm">Days</Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges & Avatars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Badges & Status Tags</CardTitle>
                    <CardDescription>Pulsing live status dots, click-to-copy chips, and removable filter tags.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="solid" theme="brand">Brand Solid</Badge>
                      <Badge variant="subtle" theme="emerald" dot pulse>Live Pulse</Badge>
                      <Badge variant="subtle" theme="amber" dot pulse>Syncing...</Badge>
                      <Badge variant="subtle" theme="rose" dot>Offline</Badge>
                      <Badge variant="outline" theme="violet" removable onRemove={() => toast.info('Tag removed')}>
                        Removable Tag
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--outline-muted)]">
                      <span className="text-xs text-[var(--ink-secondary)] font-medium">Click-to-Copy:</span>
                      <Badge variant="outline" theme="brand" copyable size="sm">npm i @strider/ui</Badge>
                      <Badge variant="outline" theme="gray" copyable size="sm">v1.0.0-prod</Badge>
                      <Badge variant="subtle" theme="blue" copyable size="sm">#538687</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Avatars & AvatarGroup</CardTitle>
                    <CardDescription>Automatic initials extraction & deterministic color hashing.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar label="Eleanor Vance" size="lg" status="online" />
                      <Avatar label="Marcus Thorne" size="md" status="away" />
                      <Avatar label="Chloe Chen" size="sm" status="busy" />
                      <Avatar label="Devon Patel" size="xs" status="offline" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--ink-secondary)]">Group Stack:</span>
                      <AvatarGroup limit={3}>
                        <Avatar label="Eleanor Vance" />
                        <Avatar label="Marcus Thorne" />
                        <Avatar label="Chloe Chen" />
                        <Avatar label="Devon Patel" />
                        <Avatar label="Aria Sterling" />
                      </AvatarGroup>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts & Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Feedback</CardTitle>
                  <CardDescription>Content-driven row/banner layouts with actions.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Alert
                    theme="emerald"
                    title="Production Build Ready"
                    description="All static pages and assets have been optimized for high performance."
                    primaryAction={{ label: 'View Report', onClick: () => toast.info('View Report clicked') }}
                    dismissible
                  />
                  <Alert
                    theme="amber"
                    title="Storage quota at 85%"
                    description="Consider upgrading your team subscription to avoid disruption."
                    primaryAction={{ label: 'Upgrade Plan', onClick: () => toast.info('Upgrade Plan clicked') }}
                    dismissible
                  />
                  <Alert
                    theme="rose"
                    title="Webhook failure detected"
                    description="Endpoint https://api.partner.com returned status 503."
                    primaryAction={{ label: 'Retry', onClick: () => toast.info('Retry clicked') }}
                    dismissible
                  />
                </CardContent>
              </Card>

              {/* Progress, Spinners & Shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <Progress value={72} theme="brand" label="Uploading artifacts..." showValue />
                    <Progress value={90} theme="emerald" label="Test suite" showValue />
                    <LoadingIndicator theme="brand" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Spinners & Loading</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Spinner size="sm" theme="brand" />
                      <Spinner size="md" theme="emerald" />
                      <Spinner size="lg" theme="violet" />
                    </div>
                    <LoadingText text="Syncing workspace databases..." theme="brand" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Keyboard Shortcuts</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span>Command Palette</span>
                      <Kbd combo="Mod+K" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Save Changes</span>
                      <Kbd combo="Mod+S" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Quick Search</span>
                      <Kbd combo="Mod+Shift+F" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Segmented Controls & Banners */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Segmented Controls</CardTitle>
                    <CardDescription>Sliding active pill selector with keyboard navigation and icon support.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-[var(--ink-secondary)] font-medium">Timeframe Selector (sm, md, lg):</span>
                      <div className="flex flex-wrap items-center gap-3">
                        <SegmentedControl
                          size="sm"
                          value={segmentedTimeframe}
                          onChange={(val) => setSegmentedTimeframe(val as any)}
                          options={[
                            { value: 'day', label: 'Day' },
                            { value: 'week', label: 'Week' },
                            { value: 'month', label: 'Month' },
                            { value: 'year', label: 'Year' },
                          ]}
                        />
                        <SegmentedControl
                          size="md"
                          value={segmentedView}
                          onChange={(val) => setSegmentedView(val as any)}
                          options={[
                            { value: 'grid', label: 'Grid', icon: Boxes },
                            { value: 'list', label: 'List', icon: FileText },
                            { value: 'analytics', label: 'Metrics', icon: BarChart3 },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t border-[var(--outline-muted)]">
                      <span className="text-xs text-[var(--ink-secondary)] font-medium">Full Width Layout:</span>
                      <SegmentedControl
                        fullWidth
                        size="md"
                        value={segmentedTimeframe}
                        onChange={(val) => setSegmentedTimeframe(val as any)}
                        options={[
                          { value: 'day', label: 'Last 24 Hours' },
                          { value: 'week', label: 'Last 7 Days' },
                          { value: 'month', label: 'Last 30 Days' },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Announcement Banners</CardTitle>
                    <CardDescription>Full-width semantic announcement bars with action slots and dismiss handlers.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <Banner
                      theme="brand"
                      variant="subtle"
                      title="Strider UI v1.0 Released"
                      description="React 19, Tailwind v4 and 60+ components."
                      action={
                        <Button variant="solid" theme="brand" size="xs">
                          Changelog
                        </Button>
                      }
                    />
                    <Banner
                      theme="emerald"
                      variant="subtle"
                      title="Edge CDN Active"
                      description="Zero-latency global caching enabled."
                    />
                    <Banner
                      theme="violet"
                      variant="subtle"
                      icon={<Bot className="size-4" />}
                      title="AI Copilot Ready"
                      description="Automated component scaffolding powered by Antigravity."
                    />
                  </CardContent>
                </Card>
              </div>

              {/* SplitButtons, Countdowns & Navigation Dock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SplitButtons & Action Menus</CardTitle>
                    <CardDescription>Primary button action coupled with secondary dropdown options.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <SplitButton
                        label="Deploy Release"
                        theme="brand"
                        onClick={() => toast.success('Triggered main deploy')}
                        options={[
                          { label: 'Deploy to Staging', onClick: () => toast.info('Staging deploy') },
                          { label: 'Deploy with Dry-Run', onClick: () => toast.info('Dry run started') },
                          { label: 'Cancel Pipeline', onClick: () => toast.error('Cancelled'), destructive: true },
                        ]}
                      />
                      <SplitButton
                        label="Export Data"
                        theme="emerald"
                        variant="subtle"
                        onClick={() => toast.success('Exporting CSV...')}
                        options={[
                          { label: 'Export as JSON', onClick: () => toast.info('JSON exported') },
                          { label: 'Export as Parquet', onClick: () => toast.info('Parquet exported') },
                        ]}
                      />
                      <Button
                        variant="outline"
                        theme="brand"
                        size="sm"
                        onClick={() => setIsTourOpen(true)}
                        prefix={<Compass className="size-3.5" />}
                      >
                        Start Product Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deluxe Countdown Timers (`components/ui/countdown.tsx`)</CardTitle>
                    <CardDescription>Split digit flip clock with side notches, glow accents, and compact pill variants.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center sm:items-start gap-4">
                    <Countdown
                      targetDate={new Date(Date.now() + 86400000 * 3 + 3600000 * 5 + 1800000)}
                      theme="brand"
                      variant="flip"
                      size="md"
                    />

                    <div className="flex items-center gap-3 pt-2 border-t border-[var(--outline-base)]/40 w-full">
                      <span className="text-xs text-[var(--ink-secondary)]">Pill Variant:</span>
                      <Countdown
                        targetDate={new Date(Date.now() + 3600000 * 4 + 1200000)}
                        variant="pill"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Speed Dial & Navigation Dock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Floating Action Menu / Speed Dial (`components/ui/floating-action-menu.tsx`)</CardTitle>
                    <CardDescription>Expandable speed-dial action menu with rotation physics and tooltip labels.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center p-8 bg-[var(--surface-muted)]/30 rounded-xl border border-dashed border-[var(--outline-base)] min-h-[160px]">
                    <FloatingActionMenu
                      inline
                      theme="brand"
                      actions={[
                        { id: '1', label: 'Deploy Release', icon: Zap, onClick: () => toast.success('Deploying release...') },
                        { id: '2', label: 'Invite Engineer', icon: User, onClick: () => toast.info('Invite sent') },
                        { id: '3', label: 'Quick Settings', icon: Settings, onClick: () => toast.info('Settings open') },
                      ]}
                    />
                    <span className="text-[11px] text-[var(--ink-muted)] mt-4">Click plus button to trigger expandable stack</span>
                  </CardContent>
                </Card>

                {/* Floating Dock Showcase */}
                <Card>
                  <CardHeader>
                    <CardTitle>Application Dock (`components/ui/dock.tsx`)</CardTitle>
                    <CardDescription>macOS-style floating dock with proximity magnification and status badges.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <Dock
                      items={[
                        { id: 'home', label: 'Home Dashboard', icon: Home, active: true, onClick: () => toast.info('Home') },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3, onClick: () => toast.info('Analytics') },
                        { id: 'messages', label: 'Team Messages', icon: MessageSquare, badge: 3, onClick: () => toast.info('Messages') },
                        { id: 'calendar', label: 'Releases Calendar', icon: Calendar, onClick: () => toast.info('Calendar') },
                        { id: 'code', label: 'Repositories', icon: FileCode, onClick: () => toast.info('Repositories') },
                        { id: 'settings', label: 'Settings', icon: Settings, onClick: () => toast.info('Settings') },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Accessibility & Utility Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* WCAG Contrast Checker */}
                <Card>
                  <CardHeader>
                    <CardTitle>WCAG 2.2 Contrast Ratio Evaluator (`components/ui/contrast-checker.tsx`)</CardTitle>
                    <CardDescription>Real-time luminance contrast scoring with AA/AAA pass and fail badges.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <ContrastChecker
                      defaultForeground="#0f172a"
                      defaultBackground="#f8fafc"
                    />
                  </CardContent>
                </Card>

                {/* Keyboard Shortcut Cheat Sheet */}
                <Card>
                  <CardHeader>
                    <CardTitle>Keyboard Shortcut Directory (`components/ui/kbd-shortcut-list.tsx`)</CardTitle>
                    <CardDescription>Categorized hotkey index with stylized mechanical keycaps.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <KbdShortcutList
                      title="Strider IDE Global Keybindings"
                      groups={[
                        {
                          category: 'Navigation',
                          shortcuts: [
                            { id: '1', description: 'Quick Search Dialog', keys: ['⌘', 'K'] },
                            { id: '2', description: 'Switch Project Workspace', keys: ['⌘', 'P'] },
                            { id: '3', description: 'Toggle Sidebar Panel', keys: ['⌘', 'B'] },
                          ],
                        },
                        {
                          category: 'Code Actions',
                          shortcuts: [
                            { id: '4', description: 'Deploy Production Build', keys: ['⌘', 'Shift', 'D'] },
                            { id: '5', description: 'Format TypeScript Buffer', keys: ['⌥', 'Shift', 'F'] },
                            { id: '6', description: 'Open AI Assistant Drawer', keys: ['⌘', 'I'] },
                          ],
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Page Scroll Progress Indicator */}
              <ScrollProgress theme="brand" height={3} showPercentage />

              {/* Tour Component Container */}
              <Tour
                open={isTourOpen}
                onClose={() => setIsTourOpen(false)}
                onComplete={() => toast.success('Tour completed! Welcome to Strider UI.')}
                steps={[
                  { title: 'Welcome to Strider UI', description: 'Explore over 100+ enterprise React 19 and Radix UI components with 2-axis OKLCH color palettes.' },
                  { title: 'Interactive Analytics', description: 'Inspect Sparklines, Gauges, Heatmaps, and Recharts graph suites in the Charts tab.' },
                  { title: 'Imperative Services', description: 'Trigger promise-based dialogs, alerts, and toasts anywhere without state boilerplate.' },
                ]}
              />
            </TabsContent>

            {/* TAB 2: FORM CONTROLS & INPUTS */}
            <TabsContent value="forms" className="flex flex-col gap-8 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <CardTitle>P5 Uniform Labeling Contract Inputs</CardTitle>
                      <CardDescription>
                        All inputs accept label, description, error, and required props with automated ID & ARIA linkage.
                      </CardDescription>
                    </div>

                    {/* Interactive Customization Controls */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1 bg-[var(--surface-muted)] p-0.5 rounded-lg text-xs">
                        {(['normal', 'error', 'disabled'] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setInputDemoState(st)}
                            className={cn(
                              'px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-colors cursor-pointer',
                              inputDemoState === st
                                ? 'bg-[var(--surface-base)] text-[var(--brand-solid)] shadow-xs'
                                : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
                            )}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 bg-[var(--surface-muted)] p-0.5 rounded-lg text-xs">
                        {(['sm', 'md', 'lg'] as const).map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setInputDemoSize(sz)}
                            className={cn(
                              'px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-colors cursor-pointer',
                              inputDemoSize === sz
                                ? 'bg-[var(--surface-base)] text-[var(--brand-solid)] shadow-xs'
                                : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
                            )}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Project Identifier"
                    placeholder="e.g. strider-board-v2"
                    description="Unique subdomain for this tenant."
                    size={inputDemoSize}
                    disabled={inputDemoState === 'disabled'}
                    error={inputDemoState === 'error' ? 'Subdomain "strider-board-v2" is already allocated to another tenant.' : undefined}
                    required
                    clearable
                  />

                  <PasswordInput
                    label="Master API Key"
                    placeholder="Enter secret token..."
                    description="Used to authenticate headless CI runners."
                    size={inputDemoSize}
                    disabled={inputDemoState === 'disabled'}
                    error={inputDemoState === 'error' ? 'Invalid cryptographic token signature.' : undefined}
                    showStrength
                    required
                  />

                  <Textarea
                    label="Workspace Description"
                    placeholder="Write a brief overview..."
                    maxLength={200}
                    disabled={inputDemoState === 'disabled'}
                    error={inputDemoState === 'error' ? 'Description cannot exceed maximum character limit.' : undefined}
                    showCount
                    rows={3}
                  />

                  <div className="flex flex-col gap-4">
                    <DatePicker
                      label="Deployment Deadline"
                      description="Automated rollback if not verified by this date."
                      size={inputDemoSize}
                      disabled={inputDemoState === 'disabled'}
                      error={inputDemoState === 'error' ? 'Deadline date cannot be in the past.' : undefined}
                      required
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <TimePicker
                        label="Maintenance Time"
                        defaultValue="03:00"
                        size={inputDemoSize}
                        disabled={inputDemoState === 'disabled'}
                      />
                      <Duration
                        label="Session Timeout"
                        defaultValue={5400}
                        size={inputDemoSize}
                        disabled={inputDemoState === 'disabled'}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selection Family (P8 Split) */}
              <Card>
                <CardHeader>
                  <CardTitle>Selection Family (Principle P8 Split)</CardTitle>
                  <CardDescription>
                    Dedicated single Select, MultiSelect with removable pills, and searchable Combobox.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Select
                    label="Assigned Region"
                    description="Target edge hosting cluster."
                    options={[
                      { label: 'US East (N. Virginia)', value: 'us-east-1' },
                      { label: 'EU West (Frankfurt)', value: 'eu-west-1' },
                      { label: 'AP South (Singapore)', value: 'ap-south-1' },
                    ]}
                  />

                  <MultiSelect
                    label="Security Tags"
                    description="Multi-value selection with badges."
                    defaultValue={['soc2', 'hipaa']}
                    options={[
                      { label: 'SOC2 Type II', value: 'soc2' },
                      { label: 'HIPAA Compliant', value: 'hipaa' },
                      { label: 'PCI-DSS', value: 'pci' },
                      { label: 'GDPR Verified', value: 'gdpr' },
                    ]}
                  />

                  <Combobox
                    label="Assigned Lead"
                    description="Searchable autocomplete combobox."
                    placeholder="Choose engineer..."
                    options={SAMPLE_USERS.map((u) => ({
                      label: u.name,
                      value: u.id,
                      description: u.role,
                    }))}
                  />
                </CardContent>
              </Card>

              {/* Toggles & Choices */}
              <Card>
                <CardHeader>
                  <CardTitle>Toggles & Choices</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Checkboxes</span>
                    <Checkbox label="Enable automatic SSL renewals" theme="brand" defaultChecked />
                    <Checkbox label="Send daily telemetry digest" description="Delivered at 09:00 UTC." theme="emerald" />
                    <Checkbox label="Indeterminate deployment state" indeterminate theme="amber" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Switches</span>
                    <Switch label="Maintenance Mode" description="Disable public routes." size="sm" theme="amber" />
                    <Switch label="Two-Factor Enforcement" description="Require WebAuthn/TOTP." size="md" theme="brand" defaultChecked />
                    <Switch label="Debug Logging" size="lg" theme="violet" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Slider & Radio Cards</span>
                    <Slider
                      label="Max Memory Limit (GB)"
                      value={sliderVal}
                      onValueChange={setSliderVal}
                      showValue
                      formatValue={(v) => `${v} GB`}
                      theme="brand"
                      min={8}
                      max={128}
                    />

                    <RadioGroup defaultValue="card1" theme="brand">
                      <Radio value="card1" label="Standard Tier" description="Shared CPU, 8GB RAM" card />
                      <Radio value="card2" label="Performance Tier" description="Dedicated 8-Core, 32GB RAM" card />
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Controls: ColorPicker & TagInput */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Color Picker & Swatches</CardTitle>
                    <CardDescription>Hex color input with preset swatches, native color dropper, and copy action.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <ColorPicker
                        value={pickerColor}
                        onChange={setPickerColor}
                        size="md"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-[var(--outline-muted)]">
                      <span className="text-xs text-[var(--ink-secondary)]">Size variants:</span>
                      <ColorPicker defaultValue="#10b981" size="sm" showInput={false} />
                      <ColorPicker defaultValue="#8b5cf6" size="md" showInput={false} />
                      <ColorPicker defaultValue="#f59e0b" size="lg" showInput={false} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tag & Chip Input</CardTitle>
                    <CardDescription>Interactive tag creation with keyboard controls (Enter/Comma/Backspace) and badges.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <TagInput
                      value={demoTags}
                      onChange={setDemoTags}
                      theme="brand"
                      placeholder="Type a tag and press Enter..."
                    />
                    <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] pt-1">
                      <span>Total tags: {demoTags.length}</span>
                      <Button
                        variant="ghost"
                        theme="rose"
                        size="xs"
                        onClick={() => setDemoTags([])}
                      >
                        Clear all
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Form Controls: Phone & Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>International Phone Input (`components/ui/phone-input.tsx`)</CardTitle>
                    <CardDescription>Country dial codes, flag icons, search filtering, and auto-formatting.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <PhoneInput
                      label="Emergency Contact Number"
                      description="Include country code for SMS dispatch."
                      defaultCountry="US"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Currency & Monetary Input (`components/ui/currency-input.tsx`)</CardTitle>
                        <CardDescription>Formatted amounts with multi-currency symbols and decimals.</CardDescription>
                      </div>

                      {/* Currency Selector Pills */}
                      <div className="flex items-center gap-1 bg-[var(--surface-muted)] p-0.5 rounded-lg text-xs">
                        {(['USD', 'EUR', 'GBP', 'JPY'] as const).map((curr) => (
                          <button
                            key={curr}
                            type="button"
                            onClick={() => setSelectedCurrency(curr)}
                            className={cn(
                              'px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer',
                              selectedCurrency === curr
                                ? 'bg-[var(--surface-base)] text-[var(--brand-solid)] shadow-xs'
                                : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
                            )}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <CurrencyInput
                      label="Monthly Infrastructure Budget"
                      currency={selectedCurrency}
                      currencySymbol={
                        selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : '¥'
                      }
                      defaultValue={currencyValue}
                      onChange={setCurrencyValue}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Dual-Pane TransferList */}
              <Card>
                <CardHeader>
                  <CardTitle>TransferList / Dual-Pane Selector (`components/ui/transfer-list.tsx`)</CardTitle>
                  <CardDescription>Move items between available and selected panels with search filtering and bulk actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransferList
                    items={SAMPLE_USERS.map((u) => ({
                      id: u.id,
                      label: u.name,
                      description: `${u.role} · ${u.team}`,
                    }))}
                    value={transferSelection}
                    onChange={setTransferSelection}
                    leftTitle="Unassigned Engineers"
                    rightTitle="On-Call Incident Response Team"
                  />
                </CardContent>
              </Card>

              {/* MentionInput & SignaturePad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mention Textarea (`components/ui/mention-input.tsx`)</CardTitle>
                    <CardDescription>Autocomplete @user mentions and #tags with avatar cards.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MentionInput
                      label="Release Announcement Draft"
                      description="Type @ to trigger team member dropdown."
                      mentions={SAMPLE_USERS.map((u) => ({
                        id: u.id,
                        label: u.name,
                        detail: u.role,
                      }))}
                      defaultValue="Hey @Eleanor Vance, the production cluster is ready."
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Digital Signature Pad (`components/ui/signature-pad.tsx`)</CardTitle>
                    <CardDescription>HTML5 Canvas drawing with clear, touch support, and image export.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <SignaturePad
                      onEnd={(url) => toast.success('Signature captured!')}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Captcha Verification */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Captcha & Turnstile Badge (`components/ui/captcha.tsx`)</CardTitle>
                  <CardDescription>Interactive bot mitigation check with animated verification callback.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Captcha
                    onVerify={(token) => {
                      setCaptchaVerified(true)
                      toast.success(`Verified with token: ${token}`)
                    }}
                  />
                  {captchaVerified && (
                    <Badge variant="subtle" theme="emerald" size="md">
                      ✓ Challenge Passed
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {/* Advanced Query & Facet Filtering */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Multi-Condition Filter Builder (`components/ui/filter-builder.tsx`)</CardTitle>
                    <CardDescription>Visual SQL/API query filter with AND/OR logic branching.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FilterBuilder
                      fields={[
                        {
                          id: 'status',
                          label: 'Account Status',
                          type: 'select',
                          options: [
                            { label: 'Active (Healthy)', value: 'Active' },
                            { label: 'Pending Verification', value: 'Pending' },
                            { label: 'Suspended (Delinquent)', value: 'Suspended' },
                          ],
                        },
                        { id: 'role', label: 'User Role', type: 'text' },
                        { id: 'spend', label: 'Monthly Spend ($)', type: 'number' },
                        {
                          id: 'region',
                          label: 'Cloud Region',
                          type: 'select',
                          options: [
                            { label: 'us-east-1 (N. Virginia)', value: 'us-east-1' },
                            { label: 'us-west-2 (Oregon)', value: 'us-west-2' },
                            { label: 'eu-central-1 (Frankfurt)', value: 'eu-central-1' },
                            { label: 'ap-northeast-1 (Tokyo)', value: 'ap-northeast-1' },
                          ],
                        },
                      ]}
                      onChange={(rules, logic) => {
                        toast.info(`Updated filter query: ${rules.length} rules (${logic})`)
                      }}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Faceted Search Filter Popover (`components/ui/facet-filter.tsx`)</CardTitle>
                    <CardDescription>Multi-select facet filters with dynamic search and item counters.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center gap-4">
                    <FacetFilter
                      title="Department Team"
                      value={facetCategories}
                      onChange={setFacetCategories}
                      options={[
                        { value: 'engineering', label: 'Engineering & DevOps', count: 42 },
                        { value: 'design', label: 'Product Design', count: 14 },
                        { value: 'security', label: 'InfoSec & Compliance', count: 9 },
                        { value: 'finance', label: 'FinOps & Billing', count: 6 },
                        { value: 'marketing', label: 'Growth Marketing', count: 18 },
                      ]}
                    />

                    <FacetFilter
                      title="Cloud Provider"
                      options={[
                        { value: 'aws', label: 'Amazon Web Services', count: 128 },
                        { value: 'gcp', label: 'Google Cloud Platform', count: 64 },
                        { value: 'azure', label: 'Microsoft Azure', count: 32 },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* 3D Payment Card & 2FA Setup */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive 3D Credit Card Input (`components/ui/credit-card-input.tsx`)</CardTitle>
                    <CardDescription>Flips on CVC focus with automatic card brand detection (Visa/MC/Amex).</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <CreditCardInput />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Auth Pairing (`components/ui/two-factor-setup.tsx`)</CardTitle>
                    <CardDescription>Authenticator QR code pairing with OTP verification and emergency backup keys.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <TwoFactorSetup />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TAB 3: OVERLAYS & DIALOGS */}
            <TabsContent value="overlays" className="flex flex-col gap-8 mt-6">
              {/* Imperative Dialogs */}
              <Card>
                <CardHeader>
                  <CardTitle>Imperative Dialog Engine (`lib/dialog.tsx`)</CardTitle>
                  <CardDescription>
                    Call dialogs anywhere in your code via clean promise-based APIs without boilerplate state.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-3">
                  <Button variant="solid" theme="brand" onClick={handleTestConfirm}>
                    dialog.confirm()
                  </Button>
                  <Button variant="solid" theme="rose" onClick={handleTestDanger}>
                    dialog.danger()
                  </Button>
                  <Button variant="outline" theme="gray" onClick={handleTestPrompt}>
                    dialog.prompt()
                  </Button>
                </CardContent>
              </Card>

              {/* Modal Dialog & Sheet */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Modal Dialogs with Sizes</CardTitle>
                    <CardDescription>Multi-size modals with scrollable body sections.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                        <Button
                          key={s}
                          size="xs"
                          variant={dialogSize === s ? 'solid' : 'outline'}
                          theme={dialogSize === s ? 'brand' : 'gray'}
                          onClick={() => setDialogSize(s)}
                        >
                          Size: {s}
                        </Button>
                      ))}
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="solid" theme="brand">
                          Open {dialogSize.toUpperCase()} Dialog
                        </Button>
                      </DialogTrigger>
                      <DialogContent size={dialogSize}>
                        <DialogHeader>
                          <DialogTitle>Configure Cluster Nodes</DialogTitle>
                          <DialogDescription>
                            Review compute specifications and scale policies before provisioning.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogBody className="flex flex-col gap-3">
                          <Input label="Cluster Name" defaultValue="prod-edge-01" />
                          <Select
                            label="Node Size"
                            options={[
                              { label: 'c6g.2xlarge (8 vCPU, 16 GB)', value: 'c6g.2xlarge' },
                              { label: 'c6g.4xlarge (16 vCPU, 32 GB)', value: 'c6g.4xlarge' },
                            ]}
                          />
                          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                            Auto-scaling is configured to trigger at 75% sustained memory pressure over a 5-minute rolling window.
                          </p>
                        </DialogBody>
                        <DialogFooter>
                          <Button variant="ghost" theme="gray" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="solid" theme="brand" onClick={() => setIsDialogOpen(false)}>
                            Apply Configuration
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Slide-Over Sheet & Dropdown Menu</CardTitle>
                    <CardDescription>Panels with shortcuts and actions.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-3">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" theme="gray">
                          Open Right Sheet
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" size="md">
                        <SheetHeader>
                          <SheetTitle>Audit Log Stream</SheetTitle>
                          <SheetDescription>Real-time security telemetry feed.</SheetDescription>
                        </SheetHeader>
                        <SheetBody className="flex flex-col gap-3 text-xs">
                          {SAMPLE_USERS.map((u) => (
                            <div key={u.id} className="p-3 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-muted)]/40 flex flex-col gap-1">
                              <span className="font-semibold text-[var(--ink-primary)]">{u.name}</span>
                              <span className="text-[var(--ink-secondary)]">Action: Modified cluster permissions</span>
                              <span className="text-[10px] text-[var(--ink-muted)]">2 minutes ago</span>
                            </div>
                          ))}
                        </SheetBody>
                        <SheetFooter>
                          <Button variant="solid" theme="brand" size="sm">Export Logs</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" theme="gray">
                          Dropdown with Shortcuts
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                        <DropdownMenuItem prefix={<Copy className="size-3.5" />} shortcut="Mod+C">
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem prefix={<Share2 className="size-3.5" />} shortcut="Mod+Shift+S">
                          Share Project
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" prefix={<Trash2 className="size-3.5" />}>
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TAB 4: DATA DISPLAY & TABLES */}
            <TabsContent value="data" className="flex flex-col gap-8 mt-6">
              {/* Interactive DataTable */}
              <Card>
                <CardHeader>
                  <CardTitle>Interactive DataTable (`components/ui/data-table.tsx`)</CardTitle>
                  <CardDescription>
                    Type-safe grid with multi-row selection, sorting, pagination, and empty state fallbacks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={[
                      {
                        key: 'name',
                        header: 'Team Member',
                        sortable: true,
                        render: (row) => (
                          <div className="flex items-center gap-2.5">
                            <Avatar label={row.name} size="sm" />
                            <div className="flex flex-col">
                              <span className="font-semibold text-[var(--ink-primary)]">{row.name}</span>
                              <span className="text-[10px] text-[var(--ink-muted)]">{row.email}</span>
                            </div>
                          </div>
                        ),
                      },
                      { key: 'role', header: 'Role', sortable: true },
                      { key: 'team', header: 'Team' },
                      {
                        key: 'status',
                        header: 'Status',
                        render: (row) => (
                          <Badge
                            size="sm"
                            variant="subtle"
                            theme={row.status === 'Active' ? 'emerald' : row.status === 'Away' ? 'amber' : 'gray'}
                            dot
                          >
                            {row.status}
                          </Badge>
                        ),
                      },
                      {
                        key: 'actions',
                        header: '',
                        align: 'right',
                        render: (row) => (
                          <Button
                            size="xs"
                            variant="ghost"
                            theme="gray"
                            onClick={() => toast.info(`Viewing profile for ${row.name}`)}
                          >
                            View
                          </Button>
                        ),
                      },
                    ]}
                    data={SAMPLE_USERS}
                    selectable
                    selectedKeys={selectedUsers}
                    onSelectionChange={setSelectedUsers}
                    pagination={{
                      page: 1,
                      pageSize: 5,
                      total: 24,
                      onPageChange: (p) => toast.info(`Page changed to ${p}`),
                    }}
                  />
                </CardContent>
              </Card>

              {/* Empty States & Accordions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>EmptyState Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EmptyState
                      title="No deployment pipelines configured"
                      description="Create your first automated CI/CD workflow to continuously ship Next.js releases."
                      action={<Button size="sm" variant="solid" theme="brand">Create Pipeline</Button>}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accordion Disclosures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible defaultValue="item-1">
                      <AccordionItem value="item-1" variant="separated">
                        <AccordionTrigger>What makes Strider UI different from standard shadcn?</AccordionTrigger>
                        <AccordionContent>
                          Strider UI strictly enforces modular component architecture (Principles P1–P15): 2-axis CVA color themes, uniform P5 labeling contracts with automated ID/ARIA wiring, imperative dialog engines, and declarative data resources.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" variant="separated">
                        <AccordionTrigger>How are colors managed across dark mode?</AccordionTrigger>
                        <AccordionContent>
                          All colors are expressed via OKLCH design tokens mapped to 7 named themes (`brand`, `gray`, `blue`, `emerald`, `amber`, `rose`, `violet`) with both solid and subtle lightness curves.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Timeline & Developer CodeBlock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity & Audit Timeline</CardTitle>
                    <CardDescription>Visual timeline with semantic status nodes, connectors, and timestamps.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Timeline orientation="vertical">
                      <TimelineItem
                        status="completed"
                        theme="emerald"
                        title="Production Release v2.4.0 Deployed"
                        description="Automated CI/CD pipeline built and pushed Docker container to 12 global edge nodes."
                        timestamp="Just now"
                      />
                      <TimelineItem
                        status="completed"
                        theme="brand"
                        title="Security Audit & Penetration Tests Passed"
                        description="Automated SAST scan completed with 0 critical and 0 high severity findings."
                        timestamp="24 mins ago"
                      />
                      <TimelineItem
                        status="current"
                        theme="brand"
                        title="Database Migration & Re-indexing"
                        description="Applying schema migrations for multi-tenant partition tables."
                        timestamp="In progress"
                      />
                      <TimelineItem
                        status="upcoming"
                        theme="gray"
                        title="Cache Warming & DNS Route Switch"
                        description="Scheduled to run after database migration validation."
                        timestamp="Queued"
                      />
                    </Timeline>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>CodeBlock & Syntax Viewer</CardTitle>
                    <CardDescription>Code presentation container with line numbers, copy-to-clipboard, and header tags.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <CodeBlock
                      filename="app/api/metrics/route.ts"
                      language="typescript"
                      code={`import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const metrics = await db.analytics.aggregate({
    revenue: { sum: true },
    activeUsers: { count: true },
  })

  return NextResponse.json({
    status: 'ok',
    data: metrics,
    timestamp: Date.now(),
  })
}`}
                    />

                    <CodeBlock
                      filename="components/ui/button.tsx"
                      language="tsx"
                      collapsible
                      code={`export function Button({ variant = 'solid', theme = 'brand', ...props }) {
  return (
    <button className={cn(buttonVariants({ variant, theme }))} {...props} />
  )
}`}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* DiffViewer & Snippet Command Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>DiffViewer Code Comparator (`components/ui/diff-viewer.tsx`)</CardTitle>
                    <CardDescription>Code difference comparator with addition/deletion highlighting and line counts.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DiffViewer
                      filename="app/api/auth/route.ts"
                      oldCode={`export async function POST(req) {
  const session = await getSession(req)
  if (!session) return new Response('Unauthorized', { status: 401 })
  return Response.json({ user: session.user })
}`}
                      newCode={`export async function POST(req: Request) {
  const session = await auth.validateSession(req)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ user: session.user, token: session.token })
}`}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>CLI Command Snippet (`components/ui/snippet.tsx`)</CardTitle>
                    <CardDescription>Multi-package manager tabs with one-click terminal copy.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <Snippet
                      packageCommands={{
                        pnpm: 'pnpm add @strider/ui @radix-ui/react-popover lucide-react',
                        npm: 'npm install @strider/ui @radix-ui/react-popover lucide-react',
                        yarn: 'yarn add @strider/ui @radix-ui/react-popover lucide-react',
                        bun: 'bun add @strider/ui @radix-ui/react-popover lucide-react',
                      }}
                      defaultManager="pnpm"
                    />

                    <Snippet
                      command="npx @strider/cli init my-saas-platform --template=next-app"
                      showPrefix
                      prefix=">"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* AudioPlayer & Watermarked Security Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Audio Waveform Player (`components/ui/audio-player.tsx`)</CardTitle>
                    <CardDescription>Interactive waveform scrubber, play/pause controls, and volume toggle.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-4">
                    <AudioPlayer
                      title="AI Voice Agent Response"
                      artist="Session #409 · 0:38"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Watermark Security Overlay (`components/ui/watermark.tsx`)</CardTitle>
                    <CardDescription>Anti-leak repeat watermark pattern for sensitive records and export views.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Watermark text="STRIDER CONFIDENTIAL" subtext="RESTRICTED ENCLAVE" fontSize={13}>
                      <div
                        onCopy={(e) => {
                          e.preventDefault()
                          toast.error('Copying protected credentials is prohibited by security policy.')
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        className="p-5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)]/80 backdrop-blur-xs flex flex-col gap-3.5 select-none relative"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="size-4 text-rose-500" />
                            <span className="font-bold text-xs text-[var(--ink-primary)]">Enterprise Production Secret Key</span>
                          </div>
                          <Badge variant="subtle" theme="rose" size="sm">RESTRICTED</Badge>
                        </div>

                        {/* Credential row with masked middle and copy-protected styling */}
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-base)] border border-[var(--outline-base)] font-mono text-xs">
                          <span className="text-[var(--ink-primary)] font-semibold tracking-wider select-none">
                            {showSecretKey ? 'sk_live_9948a72b901f4c338e81' : 'sk_live_9948••••••••••••••••8e81'}
                          </span>
                          <Button
                            variant="ghost"
                            theme="gray"
                            size="xs"
                            onClick={() => setShowSecretKey(!showSecretKey)}
                            prefix={showSecretKey ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                          >
                            {showSecretKey ? 'Hide' : 'Reveal'}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] border-t border-[var(--outline-base)]/40 pt-2">
                          <span>Enclave: us-east-vault-01</span>
                          <span className="text-amber-500 font-semibold font-mono">Copying Disabled</span>
                        </div>
                      </div>
                    </Watermark>
                  </CardContent>
                </Card>
              </div>

              {/* Image Comparison Slider */}
              <Card>
                <CardHeader>
                  <CardTitle>Before / After Image Comparison (`components/ui/image-compare.tsx`)</CardTitle>
                  <CardDescription>Draggable split slider for comparing UI revisions and visual differences.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="max-w-xl w-full">
                    <ImageCompare
                      beforeImage="/images/logo-dark.png"
                      afterImage="/images/logo-light.png"
                      beforeLabel="Dark Theme"
                      afterLabel="Light Theme"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* AI Copilot & Conversational Interfaces */}
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>AI Copilot Prompt & Streaming Chat Bubble (`components/ui/ai-prompt-input.tsx` & `message-bubble.tsx`)</CardTitle>
                        <CardDescription>Multi-modal input with model picker, reasoning trace inspection, and token counter.</CardDescription>
                      </div>
                      <ModelSelector />
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    {/* Chat Bubble Thread Demo */}
                    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-[var(--surface-muted)]/40 border border-[var(--outline-base)]/40">
                      <MessageBubble
                        role="user"
                        userName="Alex Rivera"
                        content="Can you review the OKLCH theme contrast tokens and write a secure session manager component for our developer console?"
                        timestamp="14:32 PM"
                      />

                      <MessageBubble
                        role="assistant"
                        model="Strider AI"
                        reasoning="1. Analyzed OKLCH lightness curves across 7 themes (brand, gray, blue, emerald, amber, rose, violet).\n2. Evaluated WCAG 2.2 contrast compliance.\n3. Designed active session revocation with geolocation metadata and security device icons."
                        content="Here is the complete implementation architecture with 2-axis color contracts and full dark mode support. You can test the live token generator below."
                        timestamp="14:32 PM"
                        onFeedback={(f) => toast.success(`Feedback recorded: ${f}`)}
                        onRegenerate={() => toast.info('Regenerating response...')}
                      />
                    </div>

                    {/* AI Prompt Input Bar */}
                    <AiPromptInput
                      value={aiPromptText}
                      onChange={setAiPromptText}
                      isStreaming={aiIsStreaming}
                      onSubmit={(prompt) => {
                        toast.success(`AI Query Submitted: "${prompt.slice(0, 30)}..."`)
                        setAiIsStreaming(true)
                        setTimeout(() => setAiIsStreaming(false), 2000)
                      }}
                      onStop={() => {
                        setAiIsStreaming(false)
                        toast.info('Generation halted')
                      }}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* JSON Inspector & Security Sessions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* JSON Tree Viewer */}
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive JSON Object Inspector (`components/ui/json-tree.tsx`)</CardTitle>
                    <CardDescription>Collapsible data tree with syntax color highlighting and count badges.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <JsonTree
                      rootName="sessionPayload"
                      data={{
                        cluster: 'us-east-prod-04',
                        version: '2.4.0-rc3',
                        uptimeHours: 342.5,
                        healthy: true,
                        activePeers: ['node-1', 'node-2', 'node-3'],
                        security: {
                          tls: '1.3',
                          cipher: 'TLS_AES_256_GCM_SHA384',
                          strictTransportSecurity: true,
                          maxAge: 31536000,
                        },
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Active Sessions Device Manager */}
                <Card>
                  <CardHeader>
                    <CardTitle>Active Device Sessions (`components/ui/active-sessions.tsx`)</CardTitle>
                    <CardDescription>List active login sessions with IP location and revocation controls.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActiveSessions
                      sessions={[
                        {
                          id: 's1',
                          device: 'MacBook Pro 16"',
                          browser: 'Chrome 128.0',
                          os: 'mac',
                          ipAddress: '198.51.100.42',
                          location: 'San Francisco, CA, US',
                          lastActive: 'Active right now',
                          isCurrent: true,
                        },
                        {
                          id: 's2',
                          device: 'iPhone 16 Pro',
                          browser: 'Mobile Safari',
                          os: 'ios',
                          ipAddress: '198.51.100.89',
                          location: 'San Francisco, CA, US',
                          lastActive: '18 minutes ago',
                        },
                        {
                          id: 's3',
                          device: 'ThinkPad X1',
                          browser: 'Firefox 130',
                          os: 'linux',
                          ipAddress: '203.0.113.15',
                          location: 'Berlin, DE',
                          lastActive: '2 days ago',
                        },
                      ]}
                      onRevoke={(id) => toast.success(`Revoked session #${id}`)}
                      onRevokeAll={() => toast.info('All other sessions revoked')}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Masonry Staggered Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>Responsive Masonry Grid Layout (`components/ui/masonry-grid.tsx`)</CardTitle>
                  <CardDescription>Staggered column distribution for dynamic cards and widgets.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MasonryGrid columns={{ default: 1, sm: 2, md: 3 }} gap={16}>
                    <div className="p-4 rounded-2xl bg-[var(--brand-subtle)]/30 border border-[var(--outline-base)] flex flex-col gap-2">
                      <span className="font-bold text-xs text-[var(--brand-solid)]">Edge Ingress Proxy</span>
                      <p className="text-xs text-[var(--ink-secondary)]">
                        Zero-downtime rolling updates routing 2.4M requests/sec across 48 worldwide edge points of presence.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--emerald-subtle)]/30 border border-[var(--outline-base)] flex flex-col gap-2">
                      <span className="font-bold text-xs text-[var(--emerald-solid)]">PostgreSQL HA Enclave</span>
                      <p className="text-xs text-[var(--ink-secondary)]">
                        Multi-master active replication with automated sub-millisecond failover protocols.
                      </p>
                      <span className="text-[10px] font-mono text-[var(--ink-muted)]">Latency: 0.8ms p99</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--violet-subtle)]/30 border border-[var(--outline-base)] flex flex-col gap-2">
                      <span className="font-bold text-xs text-[var(--violet-solid)]">AI Vector Store Index</span>
                      <p className="text-xs text-[var(--ink-secondary)]">
                        HNSW graph indexing with 1536-dimensional cosine similarity embeddings.
                      </p>
                    </div>
                  </MasonryGrid>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: CHARTS & GRAPHS */}
            <TabsContent value="charts" className="flex flex-col gap-8 mt-6">

              {/* Section 1: KPI Metric Cards with Sparklines & Deltas */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[var(--ink-primary)]">Interactive KPI Metric Cards</h3>
                    <p className="text-xs text-[var(--ink-muted)]">Metric cards with embedded SVG sparklines, progress tracks, and delta badges.</p>
                  </div>
                  <SegmentedControl
                    size="sm"
                    value={segmentedTimeframe}
                    onChange={(val) => setSegmentedTimeframe(val as any)}
                    options={[
                      { value: 'day', label: '24h' },
                      { value: 'week', label: '7d' },
                      { value: 'month', label: '30d' },
                      { value: 'year', label: '1y' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Total Revenue"
                    value="$1,842,500"
                    change="+14.2%"
                    changeType="increase"
                    changePeriod="vs last period"
                    theme="brand"
                    icon={TrendingUp}
                    sparklineData={[120, 140, 135, 180, 165, 210, 195, 240, 260, 310]}
                    sparklineType="area"
                  />
                  <MetricCard
                    title="Active Sessions"
                    value="42,890"
                    change="+8.6%"
                    changeType="increase"
                    changePeriod="vs last period"
                    theme="emerald"
                    icon={Activity}
                    sparklineData={[40, 45, 48, 52, 61, 58, 68, 74, 82, 90]}
                    sparklineType="line"
                  />
                  <MetricCard
                    title="API Server Latency"
                    value="34ms"
                    change="-18.5%"
                    changeType="increase"
                    changePeriod="faster response"
                    theme="violet"
                    icon={Server}
                    sparklineData={[80, 75, 70, 65, 55, 48, 42, 38, 36, 34]}
                    sparklineType="bar"
                  />
                  <MetricCard
                    title="Storage Quota"
                    value="76.4 GB"
                    change="76%"
                    changeType="neutral"
                    changePeriod="of 100 GB cap"
                    theme="amber"
                    icon={Package}
                    progressValue={76}
                    targetValue="100 GB"
                  />
                </div>
              </div>

              {/* Section 2: Gauges & Sparklines Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Speedometer & Progress Gauges */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Gauges & Speedometers</CardTitle>
                        <CardDescription>Semicircular and circular SVG gauges with live animation.</CardDescription>
                      </div>
                      <Badge variant="subtle" theme="brand" size="sm">
                        Value: {gaugeDemoValue[0]}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center justify-items-center py-2">
                      <Gauge
                        value={gaugeDemoValue[0]}
                        theme="brand"
                        size={140}
                        label="System Health"
                        sublabel="Optimal"
                        type="semicircle"
                      />
                      <Gauge
                        value={gaugeDemoValue[0]}
                        theme="emerald"
                        size={120}
                        strokeWidth={10}
                        label="Test Coverage"
                        type="circle"
                      />
                      <Gauge
                        value={Math.round(gaugeDemoValue[0] * 0.85)}
                        theme="violet"
                        size={140}
                        label="Cache Hit"
                        sublabel="Redis 7.2"
                        type="semicircle"
                      />
                    </div>

                    <div className="flex flex-col gap-2 pt-3 border-t border-[var(--outline-base)]/40">
                      <div className="flex justify-between text-xs font-medium text-[var(--ink-secondary)]">
                        <span>Drag to adjust gauge value:</span>
                        <span className="font-mono">{gaugeDemoValue[0]}%</span>
                      </div>
                      <Slider
                        value={gaugeDemoValue}
                        onValueChange={setGaugeDemoValue}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* BarList Ranking Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ranking Bar Lists</CardTitle>
                    <CardDescription>Proportional horizontal rankings for traffic channels and top pages.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <Tabs defaultValue="pages">
                      <TabsList size="sm" variant="pills">
                        <TabsTrigger value="pages">Top Endpoints</TabsTrigger>
                        <TabsTrigger value="geo">Top Geographies</TabsTrigger>
                        <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
                      </TabsList>

                      <TabsContent value="pages" className="pt-3">
                        <BarList
                          theme="brand"
                          data={[
                            { name: '/api/v1/auth/session', subtitle: 'Identity & JWT tokens', value: 842100 },
                            { name: '/api/v1/dashboard/metrics', subtitle: 'Real-time telemetry stream', value: 621400 },
                            { name: '/api/v1/projects/query', subtitle: 'Graph index reader', value: 412900 },
                            { name: '/api/v1/billing/invoices', subtitle: 'Stripe webhook receiver', value: 198300 },
                            { name: '/api/v1/webhooks/deliver', subtitle: 'Event payload worker', value: 92400 },
                          ]}
                          valueFormatter={(v) => `${(v / 1000).toFixed(1)}k req`}
                        />
                      </TabsContent>

                      <TabsContent value="geo" className="pt-3">
                        <BarList
                          theme="emerald"
                          data={[
                            { name: 'United States', subtitle: 'North America (us-east-1)', value: 48200 },
                            { name: 'Germany', subtitle: 'EMEA Core (eu-central-1)', value: 24100 },
                            { name: 'United Kingdom', subtitle: 'London Gateway', value: 19400 },
                            { name: 'Japan', subtitle: 'Asia-Pacific (ap-northeast-1)', value: 14800 },
                            { name: 'Singapore', subtitle: 'Southeast Asia Regional', value: 9200 },
                          ]}
                          valueFormatter={(v) => `${v.toLocaleString()} users`}
                        />
                      </TabsContent>

                      <TabsContent value="sources" className="pt-3">
                        <BarList
                          theme="violet"
                          data={[
                            { name: 'Direct Traffic', subtitle: 'Direct browser visits', value: 42 },
                            { name: 'Organic Search', subtitle: 'Google & Search engines', value: 28 },
                            { name: 'GitHub Referral', subtitle: 'Open-source repo links', value: 18 },
                            { name: 'Social / X', subtitle: 'Community discussions', value: 12 },
                          ]}
                          valueFormatter={(v) => `${v}%`}
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Section 3: Recharts Visual Graph Suite */}
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink-primary)]">Interactive Visual Analytics Suite</h3>
                  <p className="text-xs text-[var(--ink-muted)]">Recharts visualizations styled with dynamic OKLCH design tokens.</p>
                </div>

                {/* Line & Bar Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Revenue vs Target</CardTitle>
                      <CardDescription>Line chart with curved bezier strokes and custom tooltips.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          revenue: { label: 'Actual Revenue', color: 'var(--brand-solid)' },
                          target: { label: 'Monthly Target', color: 'var(--violet-solid)' },
                        }}
                        className="h-56 w-full"
                      >
                        <LineChart data={[
                          { month: 'Jan', revenue: 280000, target: 300000 },
                          { month: 'Feb', revenue: 320000, target: 310000 },
                          { month: 'Mar', revenue: 295000, target: 320000 },
                          { month: 'Apr', revenue: 410000, target: 350000 },
                          { month: 'May', revenue: 380000, target: 370000 },
                          { month: 'Jun', revenue: 460000, target: 400000 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-muted)" />
                          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Line type="monotone" dataKey="revenue" stroke="var(--brand-solid)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--brand-solid)' }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="target" stroke="var(--violet-solid)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Team Activity & Code Output</CardTitle>
                      <CardDescription>Grouped bar chart comparing weekly commits and PR reviews.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          commits: { label: 'Commits', color: 'var(--brand-solid)' },
                          reviews: { label: 'PR Reviews', color: 'var(--emerald-solid)' },
                        }}
                        className="h-56 w-full"
                      >
                        <BarChart data={[
                          { week: 'W1', commits: 42, reviews: 18 },
                          { week: 'W2', commits: 58, reviews: 27 },
                          { week: 'W3', commits: 35, reviews: 22 },
                          { week: 'W4', commits: 71, reviews: 34 },
                          { week: 'W5', commits: 63, reviews: 29 },
                          { week: 'W6', commits: 88, reviews: 41 },
                        ]} barCategoryGap="30%">
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-muted)" vertical={false} />
                          <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar dataKey="commits" fill="var(--brand-solid)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                          <Bar dataKey="reviews" fill="var(--emerald-solid)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Area & Pie Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Channels (Stacked Area)</CardTitle>
                      <CardDescription>Multi-series traffic breakdown with gradient area fills.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          organic: { label: 'Organic', color: 'var(--brand-solid)' },
                          direct: { label: 'Direct', color: 'var(--violet-solid)' },
                          referral: { label: 'Referral', color: 'var(--emerald-solid)' },
                        }}
                        className="h-56 w-full"
                      >
                        <AreaChart data={[
                          { day: 'Mon', organic: 1200, direct: 800, referral: 400 },
                          { day: 'Tue', organic: 1500, direct: 900, referral: 600 },
                          { day: 'Wed', organic: 1100, direct: 750, referral: 350 },
                          { day: 'Thu', organic: 1800, direct: 1100, referral: 700 },
                          { day: 'Fri', organic: 2100, direct: 1300, referral: 900 },
                          { day: 'Sat', organic: 1600, direct: 950, referral: 500 },
                          { day: 'Sun', organic: 1350, direct: 820, referral: 420 },
                        ]}>
                          <defs>
                            <linearGradient id="organicGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--brand-solid)" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="var(--brand-solid)" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="directGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--violet-solid)" stopOpacity={0.25} />
                              <stop offset="95%" stopColor="var(--violet-solid)" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="referralGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--emerald-solid)" stopOpacity={0.25} />
                              <stop offset="95%" stopColor="var(--emerald-solid)" stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-muted)" vertical={false} />
                          <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Area type="monotone" dataKey="organic" stackId="1" stroke="var(--brand-solid)" strokeWidth={2} fill="url(#organicGrad)" />
                          <Area type="monotone" dataKey="direct" stackId="1" stroke="var(--violet-solid)" strokeWidth={2} fill="url(#directGrad)" />
                          <Area type="monotone" dataKey="referral" stackId="1" stroke="var(--emerald-solid)" strokeWidth={2} fill="url(#referralGrad)" />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Segments (Donut Chart)</CardTitle>
                      <CardDescription>Proportional customer tier distribution with center cutout.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                      <div className="w-full h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPie>
                            <Pie
                              data={[
                                { name: 'Enterprise', value: 48 },
                                { name: 'Growth SMB', value: 27 },
                                { name: 'Startup', value: 15 },
                                { name: 'Individual', value: 10 },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={90}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {['var(--brand-solid)', 'var(--violet-solid)', 'var(--emerald-solid)', 'var(--amber-solid)'].map((color, i) => (
                                <Cell key={i} fill={color} opacity={0.9} />
                              ))}
                            </Pie>
                            <RechartsTooltip
                              contentStyle={{ background: 'var(--surface-card)', border: '1px solid var(--outline-base)', borderRadius: 8, fontSize: 12 }}
                              formatter={(val: any, name: any) => [`${val}%`, name]}
                            />
                            <Legend
                              iconType="circle"
                              iconSize={8}
                              formatter={(value) => <span style={{ fontSize: 12, color: 'var(--ink-secondary)' }}>{value}</span>}
                            />
                          </RechartsPie>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Composed & Radial */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spend vs Efficiency (Composed Chart)</CardTitle>
                      <CardDescription>Bars for spend + line overlay for efficiency index.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          budget: { label: 'Planned Budget', color: 'var(--brand-subtle)' },
                          actual: { label: 'Actual Spend', color: 'var(--brand-solid)' },
                          efficiency: { label: 'Efficiency %', color: 'var(--amber-solid)' },
                        }}
                        className="h-56 w-full"
                      >
                        <ComposedChart data={[
                          { q: 'Q1', budget: 120000, actual: 105000, efficiency: 87 },
                          { q: 'Q2', budget: 150000, actual: 162000, efficiency: 108 },
                          { q: 'Q3', budget: 140000, actual: 131000, efficiency: 94 },
                          { q: 'Q4', budget: 200000, actual: 197000, efficiency: 98 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-muted)" vertical={false} />
                          <XAxis dataKey="q" tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} />
                          <YAxis yAxisId="left" tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: 'var(--ink-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar yAxisId="left" dataKey="budget" fill="var(--brand-subtle)" radius={[4, 4, 0, 0]} maxBarSize={32} />
                          <Bar yAxisId="left" dataKey="actual" fill="var(--brand-solid)" radius={[4, 4, 0, 0]} maxBarSize={32} />
                          <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="var(--amber-solid)" strokeWidth={2.5} dot={{ r: 4 }} />
                        </ComposedChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Milestone Completion (Radial Bar)</CardTitle>
                      <CardDescription>Multi-track concentric goal progress visualization.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                      <div className="w-full h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={100}
                            barSize={12}
                            data={[
                              { name: 'Revenue Target', value: 84, fill: 'var(--brand-solid)' },
                              { name: 'Active Users', value: 72, fill: 'var(--violet-solid)' },
                              { name: 'Retention', value: 91, fill: 'var(--emerald-solid)' },
                              { name: 'NPS Score', value: 63, fill: 'var(--amber-solid)' },
                            ]}
                            startAngle={90}
                            endAngle={-270}
                          >
                            <RadialBar
                              background={{ fill: 'var(--surface-muted)' }}
                              dataKey="value"
                              cornerRadius={6}
                              label={{ position: 'insideStart', fill: 'var(--ink-muted)', fontSize: 10 }}
                            />
                            <RechartsTooltip
                              contentStyle={{ background: 'var(--surface-card)', border: '1px solid var(--outline-base)', borderRadius: 8, fontSize: 12 }}
                              formatter={(val: any, name: any) => [`${val}%`, name]}
                            />
                            <Legend
                              iconSize={8}
                              iconType="circle"
                              formatter={(value) => <span style={{ fontSize: 12, color: 'var(--ink-secondary)' }}>{value}</span>}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Section 4: Activity Heatmap & Micro-Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Heatmap Card (2 cols on large) */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Activity Calendar Heatmap (`components/ui/heatmap.tsx`)</CardTitle>
                        <CardDescription>GitHub-style 16-week deployment and commit frequency matrix with tooltips.</CardDescription>
                      </div>
                      <Badge variant="subtle" theme="emerald" size="sm">
                        Live Activity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Heatmap
                      theme="emerald"
                      data={Array.from({ length: 112 }).map((_, i) => {
                        const d = new Date()
                        d.setDate(d.getDate() - (111 - i))
                        const dateStr = d.toISOString().split('T')[0]
                        const count = Math.random() > 0.3 ? Math.floor(Math.random() * 12) : 0
                        return { date: dateStr, count }
                      })}
                      onCellClick={(p) => toast.info(`${p.count} events on ${p.date}`)}
                    />
                  </CardContent>
                </Card>

                {/* Trend Micro-Indicators */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trend Micro-Badges (`components/ui/trend.tsx`)</CardTitle>
                    <CardDescription>Directional deltas for inline KPIs.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-muted)]/50 border border-[var(--outline-base)]">
                      <span className="text-xs font-medium text-[var(--ink-secondary)]">Conversion Rate</span>
                      <Trend value="+24.8%" direction="up" size="sm" />
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-muted)]/50 border border-[var(--outline-base)]">
                      <span className="text-xs font-medium text-[var(--ink-secondary)]">Error Rate (Inverted)</span>
                      <Trend value="-4.2%" direction="down" inverted size="sm" />
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-muted)]/50 border border-[var(--outline-base)]">
                      <span className="text-xs font-medium text-[var(--ink-secondary)]">Server Churn</span>
                      <Trend value="+12.1%" direction="up" theme="rose" size="sm" />
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-muted)]/50 border border-[var(--outline-base)]">
                      <span className="text-xs font-medium text-[var(--ink-secondary)]">Memory Baseline</span>
                      <Trend value="0.0%" direction="neutral" size="sm" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Section 5: FunnelChart & Treemap Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Conversion Funnel */}
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Funnel (`components/ui/funnel-chart.tsx`)</CardTitle>
                    <CardDescription>Multi-stage customer onboarding pipeline with drop-off percentages.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FunnelChart
                      theme="brand"
                      data={[
                        { name: 'Unique Visitors', value: 142000, description: 'Landing page hits' },
                        { name: 'Sign-up Started', value: 89400, description: 'Email verification form' },
                        { name: 'Workspace Created', value: 54100, description: 'Initial onboarding' },
                        { name: 'Production Deployed', value: 31200, description: 'First app published' },
                        { name: 'Paid Subscription', value: 18450, description: 'Pro/Enterprise tier' },
                      ]}
                      onStepClick={(step) => toast.info(`Selected: ${step.name} (${step.value.toLocaleString()})`)}
                    />
                  </CardContent>
                </Card>

                {/* Resource Treemap */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Allocation Treemap (`components/ui/treemap.tsx`)</CardTitle>
                    <CardDescription>Nested rectangular breakdown for cloud infrastructure spend.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Treemap
                      height={280}
                      valueFormatter={(v) => `$${v.toLocaleString()}`}
                      data={[
                        { name: 'Kubernetes Nodes', value: 4850, category: 'Compute', theme: 'brand' },
                        { name: 'Postgres Aurora', value: 3200, category: 'Database', theme: 'emerald' },
                        { name: 'Edge CDN Bandwidth', value: 2400, category: 'Networking', theme: 'violet' },
                        { name: 'Object Storage (S3)', value: 1850, category: 'Storage', theme: 'amber' },
                        { name: 'Redis Cache Cluster', value: 1200, category: 'In-Memory', theme: 'blue' },
                        { name: 'WAF & DDoS Shield', value: 950, category: 'Security', theme: 'rose' },
                      ]}
                      onNodeClick={(n) => toast.info(`${n.name}: $${n.value.toLocaleString()}`)}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Section 6: Live Telemetry, CI/CD Pipeline & Log Console */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink-primary)]">System Telemetry & CI/CD Observability</h3>
                  <p className="text-xs text-[var(--ink-muted)]">Live health beacons, DAG execution nodes, and streaming log consoles.</p>
                </div>

                {/* Live Pulse Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <PulseBadge status="operational" uptime="99.98%" />
                  <PulseBadge status="degraded" label="EU Cache Cluster Degraded" uptime="98.4%" />
                  <PulseBadge status="maintenance" label="Database Migration Scheduled" />
                  <PulseBadge status="outage" label="Legacy Gateway Offline" />
                </div>

                {/* CI/CD Pipeline Execution Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <PipelineStep
                    name="1. Lint & Static Analysis"
                    status="success"
                    duration="18s"
                    onViewLogs={() => toast.info('Lint passed: 0 warnings')}
                  />
                  <PipelineStep
                    name="2. Unit & Integration Tests"
                    status="success"
                    duration="1m 12s"
                    onViewLogs={() => toast.info('All 482 tests passed')}
                  />
                  <PipelineStep
                    name="3. Docker Multi-Arch Build"
                    status="running"
                    duration="42s"
                    active
                  />
                  <PipelineStep
                    name="4. Global Edge Deployment"
                    status="pending"
                    onSkip={() => toast.info('Step skipped')}
                  />
                </div>

                {/* Real-time Streaming Log Viewer */}
                <LogViewer
                  title="Edge Ingress Proxy Telemetry"
                  logs={sampleLogs}
                  onClear={() => {
                    setSampleLogs([])
                    toast.info('Logs cleared')
                  }}
                />
              </div>

              {/* Section 7: A/B Experimentation & Performance Leaderboards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* A/B Metric Benchmark */}
                <Card>
                  <CardHeader>
                    <CardTitle>A/B Experiment Benchmark (`components/ui/metric-compare.tsx`)</CardTitle>
                    <CardDescription>Side-by-side metric comparison with win/loss significance.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <MetricCompare
                      title="Checkout Conversion Rate"
                      baselineLabel="Control (v1.2)"
                      baselineValue="3.42%"
                      variantLabel="Smart One-Click (v2.0)"
                      variantValue="4.88%"
                      change="+42.7%"
                      direction="up"
                      isWinner
                      confidence="99.8% confidence"
                      sampleSize="48,500 users"
                    />

                    <MetricCompare
                      title="Average Page Latency"
                      baselineLabel="Baseline Edge"
                      baselineValue="64ms"
                      variantLabel="Turbo Compression"
                      variantValue="41ms"
                      change="-35.9%"
                      direction="down"
                      isWinner
                      confidence="99.2% confidence"
                      sampleSize="120k requests"
                    />
                  </CardContent>
                </Card>

                {/* Top Ranking Leaderboard */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top API Endpoints (`components/ui/top-list.tsx`)</CardTitle>
                    <CardDescription>Ranked traffic volume with positional status medals.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopList
                      items={[
                        { id: '1', title: '/api/v1/auth/tokens', subtitle: 'Authentication Enclave', value: '4.8M req', numericValue: 4800000, badge: 'High' },
                        { id: '2', title: '/api/v1/ai/completion', subtitle: 'LLM Inference Gateway', value: '3.2M req', numericValue: 3200000, badge: 'AI' },
                        { id: '3', title: '/api/v1/billing/charges', subtitle: 'Stripe Webhook Sync', value: '1.9M req', numericValue: 1900000 },
                        { id: '4', title: '/api/v1/projects/schema', subtitle: 'Configuration Store', value: '980k req', numericValue: 980000 },
                      ]}
                      onItemClick={(item, rank) => toast.info(`Rank #${rank}: ${item.title}`)}
                    />
                  </CardContent>
                </Card>

                {/* Circular Progress Gauges */}
                <Card>
                  <CardHeader>
                    <CardTitle>Circular Progress Gauges (`components/ui/circular-progress.tsx`)</CardTitle>
                    <CardDescription>Multi-color SVG circular percentage readouts.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center justify-around gap-4 py-4">
                    <CircularProgress value={88} theme="brand" size={105} sublabel="CPU LOAD" />
                    <CircularProgress value={94} theme="emerald" size={105} sublabel="UPTIME" />
                    <CircularProgress value={62} theme="violet" size={105} sublabel="RAM 64GB" />
                  </CardContent>
                </Card>
              </div>

              {/* Section 8: Tiered SaaS Pricing Matrix */}
              <Card>
                <CardHeader>
                  <div className="text-center max-w-xl mx-auto flex flex-col gap-1">
                    <CardTitle className="text-xl font-extrabold">Enterprise SaaS Pricing Matrix (`components/ui/pricing-table.tsx`)</CardTitle>
                    <CardDescription>
                      Interactive billing interval switch, feature comparison checklist, and popular tier highlight.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <PricingTable
                    plans={[
                      {
                        id: 'starter',
                        name: 'Developer Starter',
                        description: 'Essential toolkit for indie developers and experimental side projects.',
                        priceMonthly: 19,
                        priceAnnual: 15,
                        features: [
                          { text: 'Up to 3 Team Workspaces', included: true },
                          { text: '50,000 Edge API Requests/mo', included: true },
                          { text: 'Standard 7-Theme OKLCH Styles', included: true },
                          { text: 'Custom Domain SSL Certificates', included: false },
                          { text: 'Dedicated 24/7 SLA Support', included: false },
                        ],
                        onCtaClick: () => toast.info('Starter plan selected'),
                      },
                      {
                        id: 'pro',
                        name: 'Growth Scale Pro',
                        description: 'Comprehensive platform for scaling engineering teams and production SaaS.',
                        priceMonthly: 79,
                        priceAnnual: 59,
                        popular: true,
                        features: [
                          { text: 'Unlimited Team Workspaces', included: true, highlight: true },
                          { text: '2,500,000 Edge API Requests/mo', included: true },
                          { text: 'All 100+ Enterprise Components', included: true },
                          { text: 'Custom Domain SSL Certificates', included: true },
                          { text: 'Advanced Role-Based Access (RBAC)', included: true },
                        ],
                        onCtaClick: () => toast.success('Pro plan trial started!'),
                      },
                      {
                        id: 'enterprise',
                        name: 'Global Enterprise',
                        description: 'Dedicated cloud enclaves, HIPAA/SOC2 compliance, and priority infrastructure.',
                        priceMonthly: 299,
                        priceAnnual: 239,
                        features: [
                          { text: 'Unlimited Everything & Enclaves', included: true },
                          { text: '99.99% Guaranteed SLA Uptime', included: true },
                          { text: 'Single Sign-On (SAML / Okta)', included: true },
                          { text: 'Audit Logging & SIEM Export', included: true },
                          { text: 'Dedicated Solutions Architect', included: true, highlight: true },
                        ],
                        onCtaClick: () => toast.info('Enterprise inquiry opened'),
                      },
                    ]}
                  />
                </CardContent>
              </Card>

            </TabsContent>


            {/* TAB 5: THEME TOKENS */}
            <TabsContent value="tokens" className="flex flex-col gap-8 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>OKLCH 7-Theme Color Palette</CardTitle>
                  <CardDescription>
                    Self-contained theme palette tokens configured in Tailwind CSS v4 `@theme inline`.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                  {THEMES.map((t) => (
                    <div key={t} className="flex flex-col gap-2 p-3 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)]">
                      <div
                        className="h-16 w-full rounded-lg shadow-inner flex items-center justify-center font-bold text-xs text-white"
                        style={{ backgroundColor: `var(--${t}-solid)` }}
                      >
                        {t}
                      </div>
                      <div className="flex flex-col text-[11px] gap-0.5">
                        <span className="font-semibold text-[var(--ink-primary)] capitalize">{t}</span>
                        <span className="text-[10px] text-[var(--ink-muted)]">`--${t}-solid`</span>
                        <div
                          className="h-6 w-full rounded-md mt-1 flex items-center justify-center text-[10px] font-medium"
                          style={{
                            backgroundColor: `var(--${t}-subtle)`,
                            color: `var(--${t}-ink)`,
                          }}
                        >
                          subtle
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Theme Mode & Toggler Showcase */}
              <Card>
                <CardHeader>
                  <CardTitle>Theme Mode & Toggler Controls</CardTitle>
                  <CardDescription>
                    Multiple presentation styles for toggling between Light, Dark, and System appearance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[var(--ink-primary)]">1-Click Instant Toggle</span>
                      <span className="text-xs text-[var(--ink-secondary)]">Direct click with smooth icon rotation and tooltip.</span>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <ThemeToggle variant="toggle" />
                      <span className="text-xs text-[var(--ink-muted)] font-mono">variant=&quot;toggle&quot; (default)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[var(--ink-primary)]">Segmented Control</span>
                      <span className="text-xs text-[var(--ink-secondary)]">Tri-state segmented pill selector for explicit choice.</span>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <ThemeToggle variant="segmented" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[var(--ink-primary)]">Dropdown Menu</span>
                      <span className="text-xs text-[var(--ink-secondary)]">Compact icon trigger opening a styled options menu.</span>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <ThemeToggle variant="dropdown" />
                      <span className="text-xs text-[var(--ink-muted)] font-mono">variant=&quot;dropdown&quot;</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Typography System</CardTitle>
                  <CardDescription>
                    Google Sans is configured as the application-wide default typeface with optical sizing and variable weight support.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)]/40">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-[var(--brand-solid)] text-white flex items-center justify-center font-bold text-lg">
                        G
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[var(--ink-primary)]">Google Sans</span>
                        <span className="text-xs text-[var(--ink-secondary)]">Variable Weight (400..700) · Optical Sizing Auto</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      theme="brand"
                      size="xs"
                      onClick={() => setSelectedTab('fonts')}
                    >
                      View Font Guide & Playground <ArrowRight className="size-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 6: FONTS & TYPOGRAPHY INSTRUCTION */}
            <TabsContent value="fonts" className="flex flex-col gap-8 mt-6">
              {/* Header Card */}
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-xl bg-[var(--brand-solid)] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                        <Type className="size-6" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">Iconic Font Library & Typography</CardTitle>
                          <Badge size="sm" variant="solid" theme="brand">
                            {listFonts().length} Curated Typefaces
                          </Badge>
                        </div>
                        <CardDescription>
                          A high-performance digital typography engine with variable weight support and instant previewing.
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge size="sm" variant="subtle" theme="brand">
                        Default UI Font Active
                      </Badge>
                      <Badge size="sm" variant="subtle" theme="gray">
                        Variable Typography Engine
                      </Badge>
                      <Badge size="sm" variant="subtle" theme="emerald">
                        Extensible Registry
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Interactive Multi-Font Playground */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="size-4 text-[var(--brand-solid)]" />
                      <CardTitle>Interactive Multi-Font Playground</CardTitle>
                    </div>
                    <Badge size="sm" variant="outline" theme="brand">
                      Active: {FONT_LIBRARY[activeFontId]?.name || 'Google Sans'}
                    </Badge>
                  </div>
                  <CardDescription>
                    Switch between iconic typefaces, test custom phrases, and adjust variable weights in real-time.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  {/* Font Family Selector Buttons */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                      Select Typeface
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                      {listFonts().map((f) => {
                        const isSelected = activeFontId === f.id
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => {
                              setActiveFontId(f.id)
                              if (!f.weights.includes(customFontWeight)) {
                                setCustomFontWeight(f.weights[0] || 400)
                              }
                            }}
                            className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                              isSelected
                                ? 'border-[var(--brand-solid)] bg-[var(--brand-subtle)]/40 shadow-sm ring-1 ring-[var(--brand-solid)]'
                                : 'border-[var(--outline-base)] bg-[var(--surface-card)] hover:bg-[var(--surface-muted)]'
                            }`}
                          >
                            <span className="text-[10px] text-[var(--ink-muted)]">{f.provider}</span>
                            <span
                              className="text-xs font-bold truncate w-full text-[var(--ink-primary)]"
                              style={{ fontFamily: `var(${f.variable})` }}
                            >
                              {f.name}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Controls Column */}
                    <div className="flex flex-col gap-4 p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)]/30">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[var(--ink-primary)]">Custom Sample Text</label>
                        <Input
                          value={customFontText}
                          onChange={(e) => setCustomFontText(e.target.value)}
                          placeholder="Type something to preview..."
                          size="sm"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-[var(--ink-primary)]">Font Weight</label>
                          <span className="text-xs font-mono text-[var(--brand-ink)] font-bold">{customFontWeight}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(FONT_LIBRARY[activeFontId]?.weights || [400, 500, 600, 700]).map((w) => (
                            <Button
                              key={w}
                              size="xs"
                              variant={customFontWeight === w ? 'solid' : 'outline'}
                              theme={customFontWeight === w ? 'brand' : 'gray'}
                              onClick={() => setCustomFontWeight(w)}
                            >
                              {w}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-[var(--ink-primary)]">Font Size</label>
                          <span className="text-xs font-mono text-[var(--brand-ink)] font-bold">{customFontSize[0]}px</span>
                        </div>
                        <Slider
                          value={customFontSize}
                          onValueChange={setCustomFontSize}
                          min={14}
                          max={48}
                          step={1}
                        />
                      </div>
                    </div>

                    {/* Live Preview Canvas */}
                    <div className="lg:col-span-2 flex flex-col justify-between p-6 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] min-h-[220px]">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-[var(--ink-muted)] tracking-wider">
                            Live Canvas ({FONT_LIBRARY[activeFontId]?.name || 'Google Sans'})
                          </span>
                          <Badge size="sm" variant="subtle" theme="brand">
                            {FONT_LIBRARY[activeFontId]?.category.toUpperCase()}
                          </Badge>
                        </div>
                        <p
                          className="text-[var(--ink-primary)] transition-all leading-tight mt-2"
                          style={{
                            fontFamily: `var(${FONT_LIBRARY[activeFontId]?.variable || '--font-google-sans'})`,
                            fontWeight: customFontWeight,
                            fontSize: `${customFontSize[0]}px`,
                          }}
                        >
                          {customFontText || 'The quick brown fox jumps over the lazy dog.'}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[var(--outline-base)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--ink-muted)]">
                        <code className="font-mono text-[11px] bg-[var(--surface-muted)] px-2.5 py-1 rounded text-[var(--ink-secondary)]">
                          font-family: var({FONT_LIBRARY[activeFontId]?.variable || '--font-google-sans'}); font-weight: {customFontWeight};
                        </code>
                        <div className="flex items-center gap-2">
                          <Badge size="sm" variant="subtle" theme="gray">
                            class: .{activeFontId}
                          </Badge>
                          <Button
                            size="xs"
                            variant="ghost"
                            theme="gray"
                            onClick={() => {
                              navigator.clipboard.writeText(`font-family: var(${FONT_LIBRARY[activeFontId]?.variable});`)
                              toast.success(`Copied CSS rule for ${FONT_LIBRARY[activeFontId]?.name}!`)
                            }}
                          >
                            <Copy className="size-3 mr-1" /> Copy CSS
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 8 Iconic Fonts Catalog Grid */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[var(--ink-primary)]">Curated Typeface Collection</h2>
                  <span className="text-xs text-[var(--ink-secondary)]">Click &apos;Test in Playground&apos; to inspect any font</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {listFonts().map((f) => (
                    <div
                      key={f.id}
                      className="flex flex-col justify-between p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] hover:border-[var(--brand-outline)] transition-all gap-4"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <Badge
                            size="sm"
                            variant={f.isDefault ? 'solid' : 'subtle'}
                            theme={
                              f.provider === 'Apple'
                                ? 'gray'
                                : f.provider === 'Vercel'
                                ? 'violet'
                                : f.provider === 'JetBrains'
                                ? 'emerald'
                                : 'brand'
                            }
                          >
                            {f.provider}
                          </Badge>
                          <span className="text-[10px] uppercase font-bold text-[var(--ink-muted)]">
                            {f.category}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <h3
                            className="text-lg font-bold text-[var(--ink-primary)]"
                            style={{ fontFamily: `var(${f.variable})` }}
                          >
                            {f.name}
                          </h3>
                          <p className="text-[11px] text-[var(--ink-secondary)] line-clamp-2 mt-1 leading-snug">
                            {f.description}
                          </p>
                        </div>

                        {/* Live Glyph Sample */}
                        <div
                          className="p-3 rounded-lg bg-[var(--surface-muted)]/50 border border-[var(--outline-base)] text-base font-semibold text-[var(--ink-primary)] truncate"
                          style={{ fontFamily: `var(${f.variable})` }}
                        >
                          Aa Bb Gg 123 &amp; % $ #
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {f.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-medium bg-[var(--surface-muted)] text-[var(--ink-secondary)] px-1.5 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button
                        size="xs"
                        variant={activeFontId === f.id ? 'solid' : 'outline'}
                        theme={activeFontId === f.id ? 'brand' : 'gray'}
                        onClick={() => {
                          setActiveFontId(f.id)
                          if (!f.weights.includes(customFontWeight)) {
                            setCustomFontWeight(f.weights[0] || 400)
                          }
                          toast.success(`Active font switched to ${f.name}`)
                        }}
                      >
                        {activeFontId === f.id ? (
                          <>
                            <Check className="size-3 mr-1" /> Active in Playground
                          </>
                        ) : (
                          'Test in Playground'
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography Scale Specimen */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Typography Scale & Hierarchy ({FONT_LIBRARY[activeFontId]?.name || 'Google Sans'})</CardTitle>
                    <Badge size="sm" variant="subtle" theme="brand">
                      Dynamic Specimen
                    </Badge>
                  </div>
                  <CardDescription>
                    Enterprise hierarchy scale rendered live in the active font family.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col divide-y divide-[var(--outline-base)]">
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-xs font-mono text-[var(--ink-muted)] w-36">Display (32px / 700)</span>
                    <span
                      className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] flex-1"
                      style={{ fontFamily: `var(${FONT_LIBRARY[activeFontId]?.variable})`, fontWeight: 700 }}
                    >
                      Cloud Scale Architecture
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-xs font-mono text-[var(--ink-muted)] w-36">H1 Title (24px / 700)</span>
                    <span
                      className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)] flex-1"
                      style={{ fontFamily: `var(${FONT_LIBRARY[activeFontId]?.variable})`, fontWeight: 700 }}
                    >
                      Unified Design Systems &amp; UI Primitives
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-xs font-mono text-[var(--ink-muted)] w-36">H2 Section (20px / 600)</span>
                    <span
                      className="text-lg sm:text-xl font-semibold text-[var(--ink-primary)] flex-1"
                      style={{ fontFamily: `var(${FONT_LIBRARY[activeFontId]?.variable})`, fontWeight: 600 }}
                    >
                      Declarative Resource Hooks &amp; State Management
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-xs font-mono text-[var(--ink-muted)] w-36">H3 Card (16px / 600)</span>
                    <span
                      className="text-base font-semibold text-[var(--ink-primary)] flex-1"
                      style={{ fontFamily: `var(${FONT_LIBRARY[activeFontId]?.variable})`, fontWeight: 600 }}
                    >
                      Two-Axis Color Palette Matrix (Variant × Theme)
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-xs font-mono text-[var(--ink-muted)] w-36">Body Large (15px / 500)</span>
                    <span
                      className="text-[15px] font-medium text-[var(--ink-secondary)] flex-1"
                      style={{ fontFamily: `var(${FONT_LIBRARY[activeFontId]?.variable})`, fontWeight: 500 }}
                    >
                      All components adhere to strict semantic contrast guidelines and automated accessibility ARIA contracts.
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-xs font-mono text-[var(--ink-muted)] w-36">Body (14px / 400)</span>
                    <span
                      className="text-sm font-normal text-[var(--ink-secondary)] flex-1"
                      style={{ fontFamily: `var(${FONT_LIBRARY[activeFontId]?.variable})`, fontWeight: 400 }}
                    >
                      Standard text rendering for body paragraphs, descriptions, input values, and data table records.
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-xs font-mono text-[var(--ink-muted)] w-36">Caption (12px / 400)</span>
                    <span
                      className="text-xs font-normal text-[var(--ink-muted)] flex-1"
                      style={{ fontFamily: `var(${FONT_LIBRARY[activeFontId]?.variable})`, fontWeight: 400 }}
                    >
                      Secondary helper text, timestamps, input captions, and subtle metadata tags.
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Developer Implementation Guide & Instructions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-4 text-[var(--brand-solid)]" />
                    <CardTitle>Developer Guide: Iconic Font Integration &amp; Extensibility</CardTitle>
                  </div>
                  <CardDescription>
                    Follow these four simple steps to embed, configure, and switch fonts in the Strider UI Font Library.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  {/* Step 1 */}
                  <div className="flex flex-col gap-2 p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)]/20">
                    <div className="flex items-center gap-2">
                      <Badge size="sm" variant="solid" theme="brand">Step 1</Badge>
                      <span className="font-bold text-sm text-[var(--ink-primary)]">HTML Head Embed (`app/layout.tsx`)</span>
                    </div>
                    <p className="text-xs text-[var(--ink-secondary)]">
                      All Google &amp; Open-Source web fonts are loaded in a single consolidated stylesheet. Apple SF Pro uses the native zero-latency system stack:
                    </p>
                    <pre className="p-3 rounded-lg bg-[var(--surface-card)] border border-[var(--outline-base)] font-mono text-xs overflow-x-auto text-[var(--ink-primary)]">
{`<!-- app/layout.tsx <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Outfit:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
  rel="stylesheet"
/>`}
                    </pre>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col gap-2 p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)]/20">
                    <div className="flex items-center gap-2">
                      <Badge size="sm" variant="solid" theme="brand">Step 2</Badge>
                      <span className="font-bold text-sm text-[var(--ink-primary)]">CSS Variables &amp; Tailwind v4 Theme (`app/globals.css`)</span>
                    </div>
                    <p className="text-xs text-[var(--ink-secondary)]">
                      CSS variables for each font are declared in <code className="font-mono text-[var(--brand-ink)]">:root</code> and mapped into Tailwind CSS v4 <code className="font-mono text-[var(--brand-ink)]">@theme inline</code>:
                    </p>
                    <pre className="p-3 rounded-lg bg-[var(--surface-card)] border border-[var(--outline-base)] font-mono text-xs overflow-x-auto text-[var(--ink-primary)]">
{`:root {
  --font-google-sans: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-sf-pro: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'SF Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-geist: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-geist-mono: 'Geist Mono', ui-monospace, monospace;
  --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-outfit: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-jetbrains-mono: 'JetBrains Mono', ui-monospace, monospace;
  --font-plus-jakarta-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  --font-sans: var(--font-google-sans);
  --font-mono: var(--font-geist-mono);
}`}
                    </pre>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col gap-2 p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)]/20">
                    <div className="flex items-center gap-2">
                      <Badge size="sm" variant="solid" theme="brand">Step 3</Badge>
                      <span className="font-bold text-sm text-[var(--ink-primary)]">Central Font Registry (`lib/fonts.ts`)</span>
                    </div>
                    <p className="text-xs text-[var(--ink-secondary)]">
                      Access all font metadata programmatically using <code className="font-mono text-[var(--brand-ink)]">FONT_LIBRARY</code>, <code className="font-mono text-[var(--brand-ink)]">getFont(id)</code>, or <code className="font-mono text-[var(--brand-ink)]">listFonts()</code>:
                    </p>
                    <pre className="p-3 rounded-lg bg-[var(--surface-card)] border border-[var(--outline-base)] font-mono text-xs overflow-x-auto text-[var(--ink-primary)]">
{`import { listFonts, getFont } from '@/lib/fonts'

const fonts = listFonts()
const appleFont = getFont('sf-pro')`}
                    </pre>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col gap-2 p-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)]/20">
                    <div className="flex items-center gap-2">
                      <Badge size="sm" variant="solid" theme="brand">Step 4</Badge>
                      <span className="font-bold text-sm text-[var(--ink-primary)]">CSS Utility Classes in Components</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                      {[
                        '.google-sans',
                        '.sf-pro',
                        '.geist',
                        '.geist-mono',
                        '.inter',
                        '.outfit',
                        '.jetbrains-mono',
                        '.plus-jakarta-sans',
                      ].map((cls) => (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(cls)
                            toast.success(`Copied "${cls}" to clipboard!`)
                          }}
                          className="p-2.5 rounded-lg bg-[var(--surface-card)] border border-[var(--outline-base)] font-mono text-xs text-left flex items-center justify-between group hover:border-[var(--brand-solid)] hover:shadow-xs transition-all cursor-pointer"
                        >
                          <span className="text-[var(--brand-solid)] font-bold">{cls}</span>
                          <Copy className="size-3 text-[var(--ink-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 8: ENTERPRISE SUITE & DEVTOOLS (20 NEW COMPONENTS) */}
            <TabsContent value="enterprise" className="flex flex-col gap-8 mt-6">
              {/* Section Header */}
              <div className="flex flex-col gap-1 pb-2 border-b border-[var(--outline-base)]">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-solid)] uppercase tracking-wider">
                  <Boxes className="size-4" /> Enterprise & Developer Ecosystem
                </div>
                <h2 className="text-xl font-extrabold text-[var(--ink-primary)]">
                  20 Enterprise Workflow & Observability Components
                </h2>
                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                  Engineered for cloud management, security compliance, project planning, and interactive workflows.
                </p>
              </div>

              {/* 1. Universal Spotlight & Compliance Score */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OmniSearch />
                <div className="flex flex-col gap-6">
                  <ScoreBadge
                    score={96}
                    tier="diamond"
                    title="SOC2 & ISO 27001 Security Score"
                    subtitle="Evaluated against 42 automated cryptographic and authentication criteria"
                  />
                  <Confetti />
                </div>
              </div>

              {/* 2. Project Execution & Sprint Planning */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold text-[var(--ink-primary)] uppercase tracking-wider">
                  Workflow Execution & Milestone Tracking
                </h3>
                <KanbanBoard />
                <RoadmapGantt />
              </div>

              {/* 3. Observability & Developer Tools */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ApiKeyManager />
                <CronPicker />
                <WebhookTester />
              </div>

              {/* 4. Infrastructure Health & Audit Trail */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ServiceStatusGrid />
                <AuditLogStream />
              </div>

              {/* 5. Data Analytics & High-Throughput Windowing */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PivotTable />
                <VirtualList containerHeight={340} />
              </div>

              {/* 6. Collaboration & Settings Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CommentThread />
                <NotificationPreferences />
              </div>

              {/* 7. Document & Contract Preview */}
              <DocumentPreview />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Tech Stack Dialog */}
      <Dialog open={isTechStackOpen} onOpenChange={setIsTechStackOpen}>
        <DialogContent size="lg">
          <DialogHeader>
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-lg bg-[var(--brand-solid)] text-white flex items-center justify-center font-bold shadow-sm">
                <Code2 className="size-5" />
              </div>
              <div>
                <DialogTitle>Strider UI Tech Stack</DialogTitle>
                <DialogDescription>
                  Enterprise full-stack component architecture built for modern SaaS platforms.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <DialogBody className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 1. Core Framework */}
              <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-solid)] uppercase tracking-wider">
                  <Cpu className="size-4" /> Core Framework
                </div>
                <div className="font-semibold text-sm text-[var(--ink-primary)]">Next.js 16 & React 19</div>
                <p className="text-xs text-[var(--ink-secondary)]">
                  App Router, Turbopack, React 19 Server & Client Components with strict TypeScript.
                </p>
              </div>

              {/* 2. Styling & Design Tokens */}
              <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-solid)] uppercase tracking-wider">
                  <Zap className="size-4" /> Styling & Tokens
                </div>
                <div className="font-semibold text-sm text-[var(--ink-primary)]">Tailwind CSS v4 & OKLCH</div>
                <p className="text-xs text-[var(--ink-secondary)]">
                  CSS-first <code className="text-[11px] bg-[var(--surface-base)] px-1 rounded">@theme inline</code> with 2-axis CVA (Theme × Variant) color tokens.
                </p>
              </div>

              {/* 3. Primitives & Icons */}
              <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-solid)] uppercase tracking-wider">
                  <Boxes className="size-4" /> UI Primitives
                </div>
                <div className="font-semibold text-sm text-[var(--ink-primary)]">Radix UI & Lucide</div>
                <p className="text-xs text-[var(--ink-secondary)]">
                  WAI-ARIA compliant accessible headless primitives paired with crisp Lucide vector icons.
                </p>
              </div>

              {/* 4. Typography Engine */}
              <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-solid)] uppercase tracking-wider">
                  <Type className="size-4" /> Typography
                </div>
                <div className="font-semibold text-sm text-[var(--ink-primary)]">Google Sans + Font Library</div>
                <p className="text-xs text-[var(--ink-secondary)]">
                  Google Sans default UI font backed by an extensible registry of 8 iconic typefaces.
                </p>
              </div>

              {/* 5. Dialogs & Overlays */}
              <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-solid)] uppercase tracking-wider">
                  <Layers className="size-4" /> Overlay Services
                </div>
                <div className="font-semibold text-sm text-[var(--ink-primary)]">Imperative Dialogs & Sonner</div>
                <p className="text-xs text-[var(--ink-secondary)]">
                  Promise-based <code className="text-[11px] bg-[var(--surface-base)] px-1 rounded">dialog.confirm()</code>, danger modals, Vaul drawers, and Sonner toasts.
                </p>
              </div>

              {/* 6. AI Feedback & Debugging */}
              <div className="p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-solid)] uppercase tracking-wider">
                  <Terminal className="size-4" /> AI Tooling
                </div>
                <div className="font-semibold text-sm text-[var(--ink-primary)]">Agentation & TypeScript 5.7</div>
                <p className="text-xs text-[var(--ink-secondary)]">
                  Point-and-click visual feedback toolbar with DOM and fiber extraction for AI agents.
                </p>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              variant="solid"
              theme="brand"
              size="sm"
              onClick={() => setIsTechStackOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
