/**
 * Strider UI — Component Generator CLI
 * Usage: tsx scripts/scaffold-component.ts <component-name> [--type=atom|form|overlay|chart]
 */

import * as fs from 'fs'
import * as path from 'path'

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
    .replace(/[\s-_]+/g, '')
}

function generateAtomComponent(name: string, slug: string): string {
  return `'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ThemeColor, ComponentVariant } from '@/lib/theme-types'

const ${slug.replace(/-/g, '_')}Variants = cva(
  'inline-flex items-center justify-center font-medium transition-all select-none',
  {
    variants: {
      variant: {
        solid: 'text-white border-transparent',
        outline: 'border bg-transparent',
        subtle: 'border-transparent',
        ghost: 'bg-transparent text-[var(--ink-primary)]',
      },
      theme: {
        brand: '',
        gray: '',
        blue: '',
        emerald: '',
        amber: '',
        rose: '',
        violet: '',
      },
      size: {
        sm: 'text-xs px-2 py-1 rounded-md',
        md: 'text-sm px-3 py-1.5 rounded-lg',
        lg: 'text-base px-4 py-2 rounded-xl',
      },
    },
    compoundVariants: [
      // Solid
      { variant: 'solid', theme: 'brand', className: 'bg-[var(--brand-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'gray', className: 'bg-[var(--gray-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'blue', className: 'bg-[var(--blue-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'emerald', className: 'bg-[var(--emerald-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'amber', className: 'bg-[var(--amber-solid)] text-[var(--ink-primary)] shadow-xs' },
      { variant: 'solid', theme: 'rose', className: 'bg-[var(--rose-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'violet', className: 'bg-[var(--violet-solid)] text-white shadow-xs' },

      // Outline
      { variant: 'outline', theme: 'brand', className: 'border-[var(--brand-outline)] text-[var(--brand-solid)]' },
      { variant: 'outline', theme: 'gray', className: 'border-[var(--outline-base)] text-[var(--ink-secondary)]' },
      { variant: 'outline', theme: 'blue', className: 'border-[var(--blue-outline)] text-[var(--blue-solid)]' },
      { variant: 'outline', theme: 'emerald', className: 'border-[var(--emerald-outline)] text-[var(--emerald-solid)]' },
      { variant: 'outline', theme: 'amber', className: 'border-[var(--amber-outline)] text-[var(--amber-ink)]' },
      { variant: 'outline', theme: 'rose', className: 'border-[var(--rose-outline)] text-[var(--rose-solid)]' },
      { variant: 'outline', theme: 'violet', className: 'border-[var(--violet-outline)] text-[var(--violet-solid)]' },

      // Subtle
      { variant: 'subtle', theme: 'brand', className: 'bg-[var(--brand-subtle)] text-[var(--brand-ink)]' },
      { variant: 'subtle', theme: 'gray', className: 'bg-[var(--gray-subtle)] text-[var(--gray-ink)]' },
      { variant: 'subtle', theme: 'blue', className: 'bg-[var(--blue-subtle)] text-[var(--blue-ink)]' },
      { variant: 'subtle', theme: 'emerald', className: 'bg-[var(--emerald-subtle)] text-[var(--emerald-ink)]' },
      { variant: 'subtle', theme: 'amber', className: 'bg-[var(--amber-subtle)] text-[var(--amber-ink)]' },
      { variant: 'subtle', theme: 'rose', className: 'bg-[var(--rose-subtle)] text-[var(--rose-ink)]' },
      { variant: 'subtle', theme: 'violet', className: 'bg-[var(--violet-subtle)] text-[var(--violet-ink)]' },
    ],
    defaultVariants: {
      variant: 'subtle',
      theme: 'brand',
      size: 'md',
    },
  }
)

export interface ${name}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof ${slug.replace(/-/g, '_')}Variants>, 'variant' | 'theme'> {
  variant?: ComponentVariant
  theme?: ThemeColor
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export function ${name}({
  className,
  variant = 'subtle',
  theme = 'brand',
  size = 'md',
  prefix,
  suffix,
  children,
  ...props
}: ${name}Props) {
  return (
    <div
      data-slot="${slug}"
      data-variant={variant}
      data-theme={theme}
      className={cn(${slug.replace(/-/g, '_')}Variants({ variant, theme, size }), className)}
      {...props}
    >
      {prefix && <span className="mr-1.5 shrink-0">{prefix}</span>}
      {children}
      {suffix && <span className="ml-1.5 shrink-0">{suffix}</span>}
    </div>
  )
}
`
}

function generateFormComponent(name: string, slug: string): string {
  return `'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useInputLabeling } from '@/lib/use-input-labeling'

export interface ${name}Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean
  required?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export function ${name}({
  id: customId,
  label,
  description,
  error,
  required,
  prefix,
  suffix,
  className,
  disabled,
  ...props
}: ${name}Props) {
  const { id, labelProps, descriptionProps, errorProps, isInvalid } = useInputLabeling({
    id: customId,
    error,
    required,
  })

  return (
    <div data-slot="${slug}-wrapper" className="flex flex-col gap-1.5 select-none w-full">
      {label && (
        <label
          {...labelProps}
          className="text-xs font-semibold text-[var(--ink-primary)] flex items-center gap-1"
        >
          {label}
          {required && <span className="text-[var(--rose-solid)]" aria-hidden="true">*</span>}
        </label>
      )}

      <div
        className={cn(
          'relative flex items-center rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] px-3 py-2 text-sm text-[var(--ink-primary)] transition-all shadow-xs',
          'focus-within:border-[var(--outline-focus)] focus-within:ring-2 focus-within:ring-[var(--brand-solid)]/20',
          isInvalid && 'border-[var(--rose-solid)] focus-within:ring-[var(--rose-solid)]/20',
          disabled && 'opacity-50 pointer-events-none bg-[var(--surface-muted)]',
          className
        )}
      >
        {prefix && <span className="mr-2 text-[var(--ink-muted)] shrink-0">{prefix}</span>}
        <input
          id={id}
          disabled={disabled}
          aria-invalid={isInvalid}
          data-slot="${slug}"
          className="w-full bg-transparent outline-none placeholder:text-[var(--ink-muted)]"
          {...props}
        />
        {suffix && <span className="ml-2 text-[var(--ink-muted)] shrink-0">{suffix}</span>}
      </div>

      {description && !isInvalid && (
        <span {...descriptionProps} className="text-[11px] text-[var(--ink-muted)]">
          {description}
        </span>
      )}

      {typeof error === 'string' && (
        <span {...errorProps} className="text-[11px] font-medium text-[var(--rose-solid)]">
          {error}
        </span>
      )}
    </div>
  )
}
`
}

async function run() {
  const rawName = process.argv[2]
  if (!rawName) {
    console.error(`\x1b[31mError: Component name is required.\x1b[0m`)
    console.log(`Usage: pnpm new:component <name> [--type=atom|form]`)
    process.exit(1)
  }

  const typeArg = process.argv.find((a) => a.startsWith('--type='))
  const type = typeArg ? typeArg.split('=')[1] : 'atom'

  const pascalName = toPascalCase(rawName)
  const kebabSlug = toKebabCase(rawName)

  const componentsDir = path.resolve(__dirname, '..', 'components', 'ui')
  const targetFile = path.join(componentsDir, `${kebabSlug}.tsx`)

  if (fs.existsSync(targetFile)) {
    console.error(`\x1b[31mError: Component file already exists: ${targetFile}\x1b[0m`)
    process.exit(1)
  }

  const content =
    type === 'form'
      ? generateFormComponent(pascalName, kebabSlug)
      : generateAtomComponent(pascalName, kebabSlug)

  fs.writeFileSync(targetFile, content)
  console.log(`\x1b[32m✔ Created component:\x1b[0m components/ui/${kebabSlug}.tsx`)

  // Register in index.ts
  const indexPath = path.join(componentsDir, 'index.ts')
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8')
    const exportLine = `export * from "./${kebabSlug}"`
    if (!indexContent.includes(exportLine)) {
      fs.appendFileSync(indexPath, `${exportLine}\n`)
      console.log(`\x1b[32m✔ Exported from:\x1b[0m components/ui/index.ts`)
    }
  }

  console.log(`\n🎉 Component \x1b[36m${pascalName}\x1b[0m is ready to use:`)
  console.log(`\x1b[33mimport { ${pascalName} } from '@/components/ui'\x1b[0m\n`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
