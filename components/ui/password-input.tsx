'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface PasswordInputProps extends InputProps {
  showStrength?: boolean
}

/** Check password strength score 0..4 */
function evaluateStrength(pwd: string): { score: number; label: string; color: string } {
  if (!pwd) return { score: 0, label: '', color: '' }
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  switch (score) {
    case 1:
      return { score: 1, label: 'Weak', color: 'bg-[var(--rose-solid)]' }
    case 2:
      return { score: 2, label: 'Fair', color: 'bg-[var(--amber-solid)]' }
    case 3:
      return { score: 3, label: 'Good', color: 'bg-[var(--blue-solid)]' }
    case 4:
      return { score: 4, label: 'Strong', color: 'bg-[var(--emerald-solid)]' }
    default:
      return { score: 0, label: '', color: '' }
  }
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ value, defaultValue, onChange, showStrength = false, suffix, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [internalVal, setInternalVal] = React.useState(defaultValue || '')
    const isControlled = value !== undefined
    const currentVal = String(isControlled ? value ?? '' : internalVal)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalVal(e.target.value)
      }
      onChange?.(e)
    }

    const strength = evaluateStrength(currentVal)

    const toggleButton = (
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShowPassword((prev) => !prev)}
        className="p-1 rounded-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    )

    return (
      <div className="flex flex-col gap-2 w-full">
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          data-slot="password-input"
          suffix={
            <div className="flex items-center gap-1">
              {toggleButton}
              {suffix}
            </div>
          }
          {...props}
        />

        {showStrength && currentVal.length > 0 && (
          <div className="flex flex-col gap-1 px-0.5">
            <div className="flex items-center gap-1.5 h-1 w-full">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    'h-full flex-1 rounded-full bg-[var(--surface-muted)] transition-all duration-300',
                    strength.score >= step && strength.color
                  )}
                />
              ))}
            </div>
            {strength.label && (
              <div className="flex justify-between items-center text-[10px] text-[var(--ink-secondary)]">
                <span>Password strength</span>
                <span className="font-medium">{strength.label}</span>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
