'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check, Copy, Pipette } from 'lucide-react'
import { toast } from 'sonner'

export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  presets?: string[]
  showInput?: boolean
  showPresets?: boolean
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const DEFAULT_PRESETS = [
  '#09090b', '#71717a', '#ef4444', '#f97316', '#f59e0b',
  '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7',
  '#ec4899', '#f43f5e', '#14b8a6', '#84cc16', '#eab308'
]

export function ColorPicker({
  value: controlledValue,
  defaultValue = '#3b82f6',
  onChange,
  presets = DEFAULT_PRESETS,
  showInput = true,
  showPresets = true,
  disabled = false,
  className,
  size = 'md',
}: ColorPickerProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    controlledValue ?? defaultValue
  )

  const isControlled = controlledValue !== undefined
  const currentColor = isControlled ? controlledValue : internalValue

  const handleColorChange = (newColor: string) => {
    if (disabled) return
    if (!isControlled) {
      setInternalValue(newColor)
    }
    onChange?.(newColor)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(currentColor)
    toast.success(`Copied ${currentColor} to clipboard`)
  }

  const triggerSizes = {
    sm: 'size-7',
    md: 'size-9',
    lg: 'size-11',
  }[size]

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label="Choose color"
            className={cn(
              'relative rounded-lg border border-[var(--outline-base)] p-1 shadow-2xs transition-all hover:scale-105 active:scale-95 outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)] cursor-pointer',
              triggerSizes,
              disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
            )}
          >
            <span
              className="block size-full rounded-md border border-black/10 dark:border-white/10"
              style={{ backgroundColor: currentColor }}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 flex flex-col gap-3" align="start">
          {/* Native Color Input Area */}
          <div className="flex items-center gap-2">
            <div className="relative size-10 shrink-0 rounded-md overflow-hidden border border-[var(--outline-base)] shadow-2xs">
              <input
                type="color"
                value={currentColor.startsWith('#') ? currentColor : '#3b82f6'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute -top-2 -left-2 size-16 cursor-pointer opacity-0"
              />
              <span
                className="block size-full"
                style={{ backgroundColor: currentColor }}
              />
            </div>
            {showInput && (
              <Input
                value={currentColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-9 font-mono text-xs uppercase"
                placeholder="#000000"
              />
            )}
            <Button
              variant="outline"
              size="sm"
              className="size-9 p-0 shrink-0"
              onClick={handleCopy}
              title="Copy hex code"
            >
              <Copy className="size-3.5" />
            </Button>
          </div>

          {/* Preset Swatches */}
          {showPresets && presets.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--outline-base)]/50">
              <span className="text-[11px] font-medium text-[var(--ink-muted)]">
                Preset Palette
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {presets.map((preset) => {
                  const isSelected = preset.toLowerCase() === currentColor.toLowerCase()
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleColorChange(preset)}
                      className={cn(
                        'size-7 rounded-md border border-black/10 dark:border-white/10 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-2xs',
                        isSelected ? 'ring-2 ring-[var(--brand-solid)] ring-offset-1' : ''
                      )}
                      style={{ backgroundColor: preset }}
                      title={preset}
                    >
                      {isSelected && (
                        <Check className="size-3.5 text-white drop-shadow-md stroke-[3]" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {showInput && (
        <span className="text-xs font-mono text-[var(--ink-secondary)] select-all uppercase">
          {currentColor}
        </span>
      )}
    </div>
  )
}
