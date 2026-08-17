'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Bot, ChevronDown, Check, Zap, Brain, Cpu } from 'lucide-react'

export interface ModelOption {
  id: string
  name: string
  provider: 'Anthropic' | 'OpenAI' | 'Google' | 'DeepSeek' | 'Meta' | string
  description?: string
  contextWindow?: string
  speed?: 'Fast' | 'Moderate' | 'Slow' | string
  intelligence?: 'High' | 'Very High' | 'Frontier' | string
  badge?: string
  disabled?: boolean
}

export interface ModelSelectorProps {
  models?: ModelOption[]
  value?: string
  defaultValue?: string
  onChange?: (model: ModelOption) => void
  className?: string
}

export const DEFAULT_MODELS: ModelOption[] = [
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Industry-leading coding, reasoning, and multimodal understanding',
    contextWindow: '200k',
    speed: 'Fast',
    intelligence: 'Frontier',
    badge: 'Popular',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'High-speed flagship omni-model for general tasks',
    contextWindow: '128k',
    speed: 'Fast',
    intelligence: 'Frontier',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    description: 'Breakthrough 2M token context for long document analysis',
    contextWindow: '2M',
    speed: 'Moderate',
    intelligence: 'Frontier',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    description: 'Open-weight reasoning model specialized for math and algorithms',
    contextWindow: '64k',
    speed: 'Moderate',
    intelligence: 'High',
    badge: 'Open',
  },
]

export function ModelSelector({
  models = DEFAULT_MODELS,
  value: controlledValue,
  defaultValue = 'gpt-4o',
  onChange,
  className,
}: ModelSelectorProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const activeId = controlledValue !== undefined ? controlledValue : internalValue

  const activeModel = models.find((m) => m.id === activeId) || models[0]

  const handleSelect = (model: ModelOption) => {
    if (controlledValue === undefined) setInternalValue(model.id)
    onChange?.(model)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-slot="model-selector"
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] hover:bg-[var(--surface-muted)] text-xs font-semibold text-[var(--ink-primary)] shadow-xs transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)] select-none',
            className
          )}
        >
          <Bot className="size-3.5 text-[var(--brand-solid)]" />
          <span>{activeModel.name}</span>
          <Badge variant="subtle" theme="brand" size="sm">
            {activeModel.provider}
          </Badge>
          <ChevronDown className="size-3 text-[var(--ink-muted)] ml-0.5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={6} className="w-80 p-1.5 z-50">
        <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)] font-mono">
          Available AI Models
        </div>
        <DropdownMenuSeparator />

        <div className="flex flex-col gap-1">
          {models.map((model) => {
            const isSelected = model.id === activeId
            return (
              <DropdownMenuItem
                key={model.id}
                onSelect={() => handleSelect(model)}
                className={cn(
                  'flex items-start justify-between gap-3 p-2.5 rounded-lg cursor-pointer transition-colors',
                  isSelected ? 'bg-[var(--surface-muted)]' : ''
                )}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[var(--ink-primary)]">
                      {model.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 text-[var(--ink-secondary)] font-medium">
                      {model.provider}
                    </span>
                    {model.badge && (
                      <Badge variant="solid" theme="brand" size="sm">
                        {model.badge}
                      </Badge>
                    )}
                  </div>
                  {model.description && (
                    <p className="text-[11px] text-[var(--ink-muted)] line-clamp-1">
                      {model.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-[10px] text-[var(--ink-muted)] pt-0.5 font-mono">
                    <span>Context: {model.contextWindow}</span>
                    <span>Speed: {model.speed}</span>
                  </div>
                </div>

                {isSelected && (
                  <Check className="size-4 text-[var(--brand-solid)] shrink-0 mt-1" />
                )}
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
