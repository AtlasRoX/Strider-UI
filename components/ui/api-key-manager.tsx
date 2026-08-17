'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Key,
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  Trash2,
  ShieldAlert,
  Clock,
  Lock,
} from 'lucide-react'
import { toast } from 'sonner'

export interface ApiKeyItem {
  id: string
  name: string
  keyMasked: string
  keyFull: string
  scopes: string[]
  createdDate: string
  lastUsed: string
}

export interface ApiKeyManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  keys?: ApiKeyItem[]
  onCreateKey?: (name: string, scopes: string[]) => void
  onRevokeKey?: (keyId: string) => void
}

const DEFAULT_API_KEYS: ApiKeyItem[] = [
  {
    id: 'key-1',
    name: 'Production Edge Ingestion',
    keyMasked: 'str_live_••••••••••••4FA2',
    keyFull: 'str_live_9a8f27b1c4e680124FA2',
    scopes: ['write:events', 'read:metrics'],
    createdDate: 'Oct 12, 2026',
    lastUsed: '2 minutes ago',
  },
  {
    id: 'key-2',
    name: 'Stripe Billing Webhook Worker',
    keyMasked: 'str_live_••••••••••••88BC',
    keyFull: 'str_live_5d3e11f0a9c7224488BC',
    scopes: ['read:billing', 'write:invoices'],
    createdDate: 'Sep 28, 2026',
    lastUsed: '1 hour ago',
  },
  {
    id: 'key-3',
    name: 'Headless CI/CD Deployment Bot',
    keyMasked: 'str_test_••••••••••••109E',
    keyFull: 'str_test_7f8a42b9d0e13355109E',
    scopes: ['admin:deploy', 'read:logs'],
    createdDate: 'Aug 14, 2026',
    lastUsed: 'Yesterday',
  },
]

export function ApiKeyManager({
  keys: controlledKeys,
  onCreateKey,
  onRevokeKey,
  className,
  ...props
}: ApiKeyManagerProps) {
  const [keys, setKeys] = React.useState<ApiKeyItem[]>(controlledKeys || DEFAULT_API_KEYS)
  const [revealedKeys, setRevealedKeys] = React.useState<Record<string, boolean>>({})
  const [copiedKeyId, setCopiedKeyId] = React.useState<string | null>(null)
  const [isCreating, setIsCreating] = React.useState(false)
  const [newKeyName, setNewKeyName] = React.useState('')

  const activeKeys = controlledKeys || keys

  const toggleReveal = (id: string) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCopy = async (keyItem: ApiKeyItem) => {
    try {
      await navigator.clipboard.writeText(keyItem.keyFull)
      setCopiedKeyId(keyItem.id)
      toast.success(`Copied secret key "${keyItem.name}" to clipboard`)
      setTimeout(() => setCopiedKeyId(null), 2000)
    } catch {
      toast.error('Failed to copy key')
    }
  }

  const handleCreate = () => {
    if (!newKeyName.trim()) return
    const randomHex = Math.random().toString(36).substring(2, 12).toUpperCase()
    const newKey: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      keyMasked: `str_live_••••••••••••${randomHex.slice(-4)}`,
      keyFull: `str_live_${Math.random().toString(36).substring(2, 14)}${randomHex}`,
      scopes: ['read:all', 'write:events'],
      createdDate: 'Just now',
      lastUsed: 'Never',
    }

    const updated = [newKey, ...activeKeys]
    setKeys(updated)
    onCreateKey?.(newKey.name, newKey.scopes)
    setNewKeyName('')
    setIsCreating(false)
    toast.success(`API Key "${newKey.name}" generated successfully`)
  }

  const handleRevoke = (id: string) => {
    const keyToDelete = activeKeys.find((k) => k.id === id)
    const updated = activeKeys.filter((k) => k.id !== id)
    setKeys(updated)
    onRevokeKey?.(id)
    toast.info(`Revoked token "${keyToDelete?.name}"`)
  }

  return (
    <div
      data-slot="api-key-manager"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <Key className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">Secret API Key Vault</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Manage machine-to-machine authentication tokens
            </span>
          </div>
        </div>

        <Button
          variant="solid"
          theme="brand"
          size="xs"
          onClick={() => setIsCreating(!isCreating)}
          prefix={<Plus className="size-3" />}
        >
          Generate New Key
        </Button>
      </div>

      {/* Create Key Inline Modal Drawer */}
      {isCreating && (
        <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-[var(--surface-base)] border border-[var(--brand-solid)] shadow-xs animate-in fade-in-0 duration-150 text-xs">
          <span className="font-bold text-[var(--ink-primary)]">Generate Secret Token</span>
          <input
            type="text"
            autoFocus
            placeholder="e.g. Analytics Exporter Worker"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreate()
              if (e.key === 'Escape') setIsCreating(false)
            }}
            className="w-full px-3 py-2 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] text-xs text-[var(--ink-primary)] outline-hidden focus:border-[var(--brand-solid)]"
          />
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              variant="ghost"
              theme="gray"
              size="xs"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              theme="brand"
              size="xs"
              disabled={!newKeyName.trim()}
              onClick={handleCreate}
            >
              Create Token
            </Button>
          </div>
        </div>
      )}

      {/* API Key Rows */}
      <div className="flex flex-col gap-2.5">
        {activeKeys.map((k) => {
          const isRevealed = Boolean(revealedKeys[k.id])
          const isCopied = copiedKeyId === k.id

          return (
            <div
              key={k.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[var(--surface-muted)]/40 border border-[var(--outline-base)] text-xs hover:border-[var(--brand-solid)]/40 transition-colors"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--ink-primary)] truncate">{k.name}</span>
                  <span className="text-[10px] text-[var(--ink-muted)] font-mono flex items-center gap-1">
                    <Clock className="size-2.5" /> used {k.lastUsed}
                  </span>
                </div>

                {/* Secret Key string with reveal/copy */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[var(--ink-secondary)] bg-[var(--surface-base)] px-2 py-0.5 rounded-md border border-[var(--outline-base)]">
                    {isRevealed ? k.keyFull : k.keyMasked}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleReveal(k.id)}
                    className="size-6 rounded hover:bg-[var(--surface-base)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
                    title={isRevealed ? 'Hide key' : 'Reveal key'}
                  >
                    {isRevealed ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(k)}
                    className="size-6 rounded hover:bg-[var(--surface-base)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
                    title="Copy full key"
                  >
                    {isCopied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                  </button>
                </div>

                {/* Scopes */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {k.scopes.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] px-1.5 py-0.5 rounded-md bg-[var(--brand-subtle)] text-[var(--brand-solid)] font-mono font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Revoke Action */}
              <button
                type="button"
                onClick={() => handleRevoke(k.id)}
                className="size-7 rounded-lg hover:bg-rose-500/10 flex items-center justify-center text-[var(--ink-muted)] hover:text-rose-500 transition-colors cursor-pointer self-end sm:self-center"
                title="Revoke API key"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
