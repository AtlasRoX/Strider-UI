'use client'

import * as React from 'react'
import { ShieldCheck, Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CookieConsentProps {
  title?: string
  description?: string
  acceptLabel?: string
  declineLabel?: string
  manageLabel?: string
  privacyPolicyUrl?: string
  onAccept?: () => void
  onDecline?: () => void
  position?: 'bottom-fixed' | 'floating-bottom-right'
  storageKey?: string
  className?: string
}

/**
 * CookieConsent
 * Production-ready GDPR/CCPA cookie consent notification banner.
 */
export function CookieConsent({
  title = 'We value your privacy',
  description = 'We use essential cookies to ensure security, analyze traffic, and enhance your user experience. By clicking "Accept All", you consent to our use of cookies.',
  acceptLabel = 'Accept All',
  declineLabel = 'Essential Only',
  manageLabel,
  privacyPolicyUrl = '/privacy',
  onAccept,
  onDecline,
  position = 'floating-bottom-right',
  storageKey = 'strider_cookie_consent',
  className,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) {
        setIsVisible(true)
      }
    } catch {
      setIsVisible(true)
    }
  }, [storageKey])

  const handleAccept = () => {
    try {
      localStorage.setItem(storageKey, 'accepted')
    } catch {}
    setIsVisible(false)
    onAccept?.()
  }

  const handleDecline = () => {
    try {
      localStorage.setItem(storageKey, 'declined')
    } catch {}
    setIsVisible(false)
    onDecline?.()
  }

  if (!isVisible) return null

  return (
    <div
      data-slot="cookie-consent"
      className={cn(
        'z-50 animate-in fade-in-50 slide-in-from-bottom-5 duration-300',
        position === 'floating-bottom-right'
          ? 'fixed bottom-5 right-5 max-w-md w-full px-4 sm:px-0'
          : 'fixed bottom-0 left-0 right-0 border-t border-[var(--outline-base)] bg-[var(--surface-card)]/95 backdrop-blur-md p-4 shadow-xl',
        className
      )}
    >
      <div
        className={cn(
          'rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] p-5 shadow-2xl flex flex-col gap-3.5',
          position === 'bottom-fixed' && 'max-w-7xl mx-auto border-none p-0 shadow-none sm:flex-row sm:items-center sm:justify-between'
        )}
      >
        <div className="flex items-start gap-3">
          <div className="size-9 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center shrink-0">
            <Cookie className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold text-[var(--ink-primary)] flex items-center gap-1.5">
              <span>{title}</span>
              <ShieldCheck className="size-3.5 text-emerald-500" />
            </h4>
            <p className="text-[11px] leading-relaxed text-[var(--ink-secondary)]">
              {description}{' '}
              {privacyPolicyUrl && (
                <a
                  href={privacyPolicyUrl}
                  className="text-[var(--brand-solid)] underline underline-offset-2 hover:opacity-80 font-medium"
                >
                  Privacy Policy
                </a>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
          <Button
            variant="ghost"
            theme="gray"
            size="xs"
            onClick={handleDecline}
          >
            {declineLabel}
          </Button>
          <Button
            variant="solid"
            theme="brand"
            size="xs"
            onClick={handleAccept}
          >
            {acceptLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
