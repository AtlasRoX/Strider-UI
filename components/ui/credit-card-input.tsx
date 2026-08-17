'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  Lock,
  ShieldCheck,
  RotateCw,
  Copy,
  Check,
  Zap,
} from 'lucide-react'
import { toast } from 'sonner'

export interface CardDetails {
  number: string
  name: string
  expiry: string
  cvc: string
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'generic'
}

export type CardTheme = 'midnight' | 'emerald' | 'violet' | 'rose' | 'amber'

export interface CreditCardInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: CardDetails
  onChange?: (details: CardDetails) => void
  showQuickFill?: boolean
  showThemeSelector?: boolean
}

const CARD_THEME_GRADIENTS: Record<CardTheme, { name: string; bg: string; border: string }> = {
  midnight: { name: 'Midnight Onyx', bg: 'bg-linear-to-tr from-slate-950 via-slate-900 to-indigo-950', border: 'border-white/20' },
  emerald: { name: 'Emerald Velvet', bg: 'bg-linear-to-tr from-emerald-950 via-slate-900 to-teal-900', border: 'border-emerald-500/30' },
  violet: { name: 'Cyber Violet', bg: 'bg-linear-to-tr from-violet-950 via-slate-900 to-purple-900', border: 'border-violet-500/30' },
  rose: { name: 'Sunset Rose', bg: 'bg-linear-to-tr from-rose-950 via-slate-900 to-amber-900', border: 'border-rose-500/30' },
  amber: { name: 'Gold Obsidian', bg: 'bg-linear-to-tr from-amber-950 via-stone-900 to-yellow-950', border: 'border-amber-500/30' },
}

export function CreditCardInput({
  value,
  onChange,
  showQuickFill = true,
  showThemeSelector = true,
  className,
  ...props
}: CreditCardInputProps) {
  const [number, setNumber] = React.useState(value?.number || '')
  const [name, setName] = React.useState(value?.name || '')
  const [expiry, setExpiry] = React.useState(value?.expiry || '')
  const [cvc, setCvc] = React.useState(value?.cvc || '')
  const [isFlipped, setIsFlipped] = React.useState(false)
  const [cardTheme, setCardTheme] = React.useState<CardTheme>('midnight')
  const [copied, setCopied] = React.useState(false)

  // Detect card brand from first digits
  const detectBrand = (num: string): CardDetails['brand'] => {
    const clean = num.replace(/\s/g, '')
    if (/^4/.test(clean)) return 'visa'
    if (/^5[1-5]/.test(clean)) return 'mastercard'
    if (/^3[47]/.test(clean)) return 'amex'
    if (/^6(?:011|5)/.test(clean)) return 'discover'
    return 'generic'
  }

  const brand = detectBrand(number)

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16)
    val = val.replace(/(.{4})/g, '$1 ').trim()
    setNumber(val)
    emitChange({ number: val })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (val.length >= 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`
    }
    setExpiry(val)
    emitChange({ expiry: val })
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4)
    setCvc(val)
    emitChange({ cvc: val })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toUpperCase())
    emitChange({ name: e.target.value.toUpperCase() })
  }

  const emitChange = (partial: Partial<CardDetails>) => {
    const updated: CardDetails = {
      number,
      name,
      expiry,
      cvc,
      brand,
      ...partial,
    }
    onChange?.(updated)
  }

  const handleQuickFill = (cardType: 'visa' | 'mastercard' | 'amex') => {
    if (cardType === 'visa') {
      setNumber('4242 4242 4242 4242')
      setName('ALEX RIVERA')
      setExpiry('12/28')
      setCvc('789')
      emitChange({ number: '4242 4242 4242 4242', name: 'ALEX RIVERA', expiry: '12/28', cvc: '789', brand: 'visa' })
      toast.info('Filled Test Visa Card (4242)')
    } else if (cardType === 'mastercard') {
      setNumber('5555 5555 5555 4444')
      setName('SARAH CHEN')
      setExpiry('08/29')
      setCvc('321')
      emitChange({ number: '5555 5555 5555 4444', name: 'SARAH CHEN', expiry: '08/29', cvc: '321', brand: 'mastercard' })
      toast.info('Filled Test Mastercard (5555)')
    } else if (cardType === 'amex') {
      setNumber('3782 822468 91001')
      setName('MARCUS THORNE')
      setExpiry('11/27')
      setCvc('8842')
      emitChange({ number: '3782 822468 91001', name: 'MARCUS THORNE', expiry: '11/27', cvc: '8842', brand: 'amex' })
      toast.info('Filled Test American Express (3782)')
    }
  }

  const handleCopyCard = async () => {
    try {
      await navigator.clipboard.writeText(`${number.replace(/\s/g, '')} ${expiry} ${cvc}`)
      setCopied(true)
      toast.success('Card details copied')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy card details')
    }
  }

  return (
    <div
      data-slot="credit-card-input"
      className={cn('flex flex-col items-center gap-5 w-full max-w-md select-none', className)}
      {...props}
    >
      {/* 3D Flip Card Container */}
      <div className="w-full [perspective:1000px] h-52">
        <div
          className={cn(
            'relative size-full rounded-3xl p-6 text-white shadow-xl transition-all duration-500 [transform-style:preserve-3d]',
            isFlipped ? '[transform:rotateY(180deg)]' : '',
            CARD_THEME_GRADIENTS[cardTheme].bg,
            CARD_THEME_GRADIENTS[cardTheme].border,
            'border'
          )}
        >
          {/* Card Front */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between [backface-visibility:hidden]">
            {/* Top Row: Chip + Brand */}
            <div className="flex items-center justify-between">
              <div className="w-11 h-8 rounded-md bg-linear-to-r from-amber-200 to-yellow-400 shadow-inner border border-amber-300/40 flex items-center justify-center">
                <div className="w-8 h-5 border-t border-b border-amber-500/40 opacity-70" />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="subtle" theme="brand" size="sm" className="bg-white/10 text-white border-white/20">
                  {brand.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Card Number */}
            <div className="font-mono text-xl tracking-[0.2em] font-extrabold text-white/95 truncate">
              {number || '•••• •••• •••• ••••'}
            </div>

            {/* Bottom Row: Name + Expiry */}
            <div className="flex items-end justify-between font-mono text-xs text-white/80">
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] uppercase tracking-wider text-white/50">Card Holder</span>
                <span className="font-bold tracking-wider truncate max-w-[200px]">
                  {name || 'YOUR NAME'}
                </span>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[8px] uppercase tracking-wider text-white/50">Expires</span>
                <span className="font-bold tracking-wider">{expiry || 'MM/YY'}</span>
              </div>
            </div>
          </div>

          {/* Card Back (for CVC) */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="w-full h-10 bg-black/80 -mx-6 mt-2" />

            <div className="flex flex-col gap-1 items-end pr-4">
              <span className="text-[9px] uppercase tracking-widest text-white/60 font-mono">CVV / CVC</span>
              <div className="h-8 w-20 rounded bg-white text-slate-900 flex items-center justify-center font-mono font-bold text-sm tracking-widest shadow-inner">
                {cvc || '•••'}
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-white/60 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-3 text-emerald-400" />
                <span>256-Bit Encrypted Token</span>
              </div>
              <span>PCI-DSS Level 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar: Theme Swatches + Flip Toggle */}
      <div className="flex items-center justify-between w-full pt-1 px-1">
        {showThemeSelector && (
          <div className="flex items-center gap-1.5">
            {(Object.keys(CARD_THEME_GRADIENTS) as CardTheme[]).map((thm) => (
              <button
                key={thm}
                type="button"
                onClick={() => setCardTheme(thm)}
                className={cn(
                  'size-5 rounded-full border transition-all cursor-pointer shadow-xs',
                  thm === 'midnight' && 'bg-slate-900',
                  thm === 'emerald' && 'bg-emerald-800',
                  thm === 'violet' && 'bg-violet-800',
                  thm === 'rose' && 'bg-rose-800',
                  thm === 'amber' && 'bg-amber-800',
                  cardTheme === thm ? 'ring-2 ring-[var(--brand-solid)] scale-110 border-white' : 'border-black/20'
                )}
                title={CARD_THEME_GRADIENTS[thm].name}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[var(--brand-solid)] hover:underline cursor-pointer"
          >
            <RotateCw className="size-3" /> {isFlipped ? 'Show Front' : 'Flip to CVC'}
          </button>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="flex flex-col gap-3 w-full text-xs">
        {/* Card Number */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[var(--ink-primary)]">Card Number</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--ink-muted)]" />
            <input
              type="text"
              value={number}
              onChange={handleNumberChange}
              onFocus={() => setIsFlipped(false)}
              placeholder="4242 •••• •••• 4242"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] text-[var(--ink-primary)] font-mono outline-hidden focus:ring-2 focus:ring-[var(--brand-solid)]"
            />
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[var(--ink-primary)]">Cardholder Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onFocus={() => setIsFlipped(false)}
            placeholder="JOHN DOE"
            className="w-full px-3 py-2 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] text-[var(--ink-primary)] uppercase outline-hidden focus:ring-2 focus:ring-[var(--brand-solid)]"
          />
        </div>

        {/* Expiry + CVC Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[var(--ink-primary)]">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              onFocus={() => setIsFlipped(false)}
              placeholder="MM/YY"
              className="w-full px-3 py-2 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] text-[var(--ink-primary)] font-mono outline-hidden focus:ring-2 focus:ring-[var(--brand-solid)]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[var(--ink-primary)]">CVC Code</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[var(--ink-muted)]" />
              <input
                type="text"
                value={cvc}
                onChange={handleCvcChange}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                placeholder="123"
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] text-[var(--ink-primary)] font-mono outline-hidden focus:ring-2 focus:ring-[var(--brand-solid)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Fill Test Badges */}
      {showQuickFill && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--outline-base)]/40 w-full text-xs">
          <span className="text-[11px] text-[var(--ink-muted)]">Quick Test:</span>
          <button
            type="button"
            onClick={() => handleQuickFill('visa')}
            className="px-2 py-0.5 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] hover:bg-[var(--surface-muted)] text-[10px] font-bold text-[var(--brand-solid)] cursor-pointer"
          >
            Visa (4242)
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('mastercard')}
            className="px-2 py-0.5 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] hover:bg-[var(--surface-muted)] text-[10px] font-bold text-amber-500 cursor-pointer"
          >
            Mastercard (5555)
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('amex')}
            className="px-2 py-0.5 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] hover:bg-[var(--surface-muted)] text-[10px] font-bold text-emerald-500 cursor-pointer"
          >
            Amex (3782)
          </button>
        </div>
      )}
    </div>
  )
}
