'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast font-sans rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-lg',
          description: 'text-[var(--ink-secondary)] text-xs',
          actionButton:
            'bg-[var(--brand-solid)] text-white hover:opacity-90 font-medium text-xs rounded-lg px-3 py-1.5',
          cancelButton:
            'bg-[var(--surface-muted)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] font-medium text-xs rounded-lg px-3 py-1.5',
          success: 'text-[var(--emerald-ink)] border-[var(--emerald-outline)]',
          error: 'text-[var(--rose-ink)] border-[var(--rose-outline)]',
          warning: 'text-[var(--amber-ink)] border-[var(--amber-outline)]',
          info: 'text-[var(--blue-ink)] border-[var(--blue-outline)]',
        },
      }}
      style={
        {
          '--normal-bg': 'var(--surface-card)',
          '--normal-text': 'var(--ink-primary)',
          '--normal-border': 'var(--outline-base)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
