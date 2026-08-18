/**
 * Strider UI — Mock Data Fixture Engine
 * Provides rich, realistic enterprise SaaS data for prototyping and readymade page templates.
 */

export interface MockUser {
  id: string
  name: string
  email: string
  role: string
  team: string
  status: 'Active' | 'Away' | 'Offline'
  avatar?: string
  lastActive: string
}

export interface MockAuditLog {
  id: string
  timestamp: string
  actor: { name: string; email: string; avatar?: string }
  action: string
  resource: string
  status: 'success' | 'warning' | 'danger'
  ipAddress: string
  location: string
}

export interface MockTask {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: { name: string; avatar?: string }
  column: 'backlog' | 'in_progress' | 'review' | 'done'
  dueDate?: string
  tags: string[]
}

export const MOCK_USERS: MockUser[] = [
  { id: 'usr-1', name: 'Eleanor Vance', email: 'eleanor.vance@strider.dev', role: 'Staff Architect', team: 'Core Platform', status: 'Active', lastActive: '2 min ago' },
  { id: 'usr-2', name: 'Marcus Thorne', email: 'marcus.thorne@strider.dev', role: 'Lead DevOps', team: 'Infrastructure', status: 'Active', lastActive: '5 min ago' },
  { id: 'usr-3', name: 'Chloe Chen', email: 'chloe.chen@strider.dev', role: 'Design Lead', team: 'Product Design', status: 'Away', lastActive: '45 min ago' },
  { id: 'usr-4', name: 'Devon Patel', email: 'devon.patel@strider.dev', role: 'Security Analyst', team: 'Infosec', status: 'Active', lastActive: '12 min ago' },
  { id: 'usr-5', name: 'Aria Sterling', email: 'aria.sterling@strider.dev', role: 'Product Manager', team: 'Enterprise', status: 'Active', lastActive: '1 hour ago' },
  { id: 'usr-6', name: 'Lucas Meyer', email: 'lucas.meyer@strider.dev', role: 'Frontend Engineer', team: 'UI Ecosystem', status: 'Offline', lastActive: '1 day ago' },
  { id: 'usr-7', name: 'Sofia Rodriguez', email: 'sofia.rodriguez@strider.dev', role: 'Backend Engineer', team: 'Billing & APIs', status: 'Active', lastActive: '3 min ago' },
]

export const MOCK_AUDIT_LOGS: MockAuditLog[] = [
  {
    id: 'aud-101',
    timestamp: '14:32:10',
    actor: { name: 'Eleanor Vance', email: 'eleanor.vance@strider.dev' },
    action: 'api_key.rotated',
    resource: 'Production API Gateway #pk_live_9942',
    status: 'success',
    ipAddress: '192.168.1.42',
    location: 'San Francisco, US',
  },
  {
    id: 'aud-102',
    timestamp: '14:28:45',
    actor: { name: 'Devon Patel', email: 'devon.patel@strider.dev' },
    action: 'security.2fa_enforced',
    resource: 'Organization Global Policy',
    status: 'success',
    ipAddress: '10.0.4.12',
    location: 'London, UK',
  },
  {
    id: 'aud-103',
    timestamp: '14:15:22',
    actor: { name: 'Marcus Thorne', email: 'marcus.thorne@strider.dev' },
    action: 'deployment.failed',
    resource: 'Edge Node Cluster (Frankfurt eu-west-1)',
    status: 'danger',
    ipAddress: '172.16.8.99',
    location: 'Frankfurt, DE',
  },
  {
    id: 'aud-104',
    timestamp: '13:58:04',
    actor: { name: 'System Automations', email: 'bot@strider.dev' },
    action: 'backup.snapshot_created',
    resource: 'PostgreSQL Cluster Primary #pg-900',
    status: 'success',
    ipAddress: '127.0.0.1',
    location: 'Cloud Internal',
  },
]

export const MOCK_TASKS: MockTask[] = [
  {
    id: 'tsk-1',
    title: 'Migrate Edge Proxy to HTTP/3 & QUIC',
    description: 'Upgrade Envoy routing layer to reduce initial TTFB latency by 35%.',
    priority: 'urgent',
    assignee: { name: 'Marcus Thorne' },
    column: 'in_progress',
    dueDate: 'Tomorrow',
    tags: ['Network', 'Performance'],
  },
  {
    id: 'tsk-2',
    title: 'Implement Multi-region Database Replication',
    description: 'Setup bi-directional read replicas in Singapore and Frankfurt.',
    priority: 'high',
    assignee: { name: 'Eleanor Vance' },
    column: 'in_progress',
    dueDate: 'Aug 24',
    tags: ['Database', 'High-Availability'],
  },
  {
    id: 'tsk-3',
    title: 'Audit OKLCH Contrast Ratios for Dark Mode',
    description: 'Verify all subtle and outline badges comply with WCAG AAA.',
    priority: 'medium',
    assignee: { name: 'Chloe Chen' },
    column: 'review',
    dueDate: 'Aug 22',
    tags: ['Design System', 'A11y'],
  },
  {
    id: 'tsk-4',
    title: 'Automate SOC2 Compliance Evidence Logging',
    description: 'Stream all AWS CloudTrail and Auth0 events into AuditLogStream.',
    priority: 'high',
    assignee: { name: 'Devon Patel' },
    column: 'done',
    dueDate: 'Completed',
    tags: ['Security', 'Compliance'],
  },
  {
    id: 'tsk-5',
    title: 'Add AutoForm Schema Generator to Strider UI',
    description: 'Infer P5-compliant inputs directly from Zod schema objects.',
    priority: 'urgent',
    assignee: { name: 'Eleanor Vance' },
    column: 'done',
    dueDate: 'Completed',
    tags: ['Components', 'DX'],
  },
]

export const MOCK_CHART_SERIES = [
  { month: 'Jan', revenue: 45000, requests: 120000, latency: 45 },
  { month: 'Feb', revenue: 52000, requests: 145000, latency: 42 },
  { month: 'Mar', revenue: 61000, requests: 190000, latency: 38 },
  { month: 'Apr', revenue: 78000, requests: 240000, latency: 35 },
  { month: 'May', revenue: 94000, requests: 310000, latency: 32 },
  { month: 'Jun', revenue: 112000, requests: 420000, latency: 28 },
  { month: 'Jul', revenue: 135000, requests: 560000, latency: 25 },
  { month: 'Aug', revenue: 148250, requests: 680000, latency: 22 },
]

export const MOCK_SERVICES = [
  { name: 'Global API Gateway', region: 'us-east-1 (N. Virginia)', status: 'operational' as const, latency: '14ms', uptime: '99.99%' },
  { name: 'Auth & 2FA Vault', region: 'eu-central-1 (Frankfurt)', status: 'operational' as const, latency: '22ms', uptime: '100%' },
  { name: 'Postgres Distributed Cluster', region: 'us-west-2 (Oregon)', status: 'operational' as const, latency: '18ms', uptime: '99.95%' },
  { name: 'Real-time Webhook Dispatcher', region: 'ap-southeast-1 (Singapore)', status: 'operational' as const, latency: '35ms', uptime: '99.98%' },
  { name: 'AI Inference Edge Nodes', region: 'Multi-region (Edge)', status: 'operational' as const, latency: '8ms', uptime: '99.99%' },
]
