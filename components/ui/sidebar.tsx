'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { PanelLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

import { useIsMobile } from './use-mobile'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16.5rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '4rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

export type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  return context
}

export interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp !== undefined ? openProp : _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      if (typeof document !== 'undefined') {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      }
    },
    [setOpenProp, open],
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const state = open ? 'expanded' : 'collapsed'

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          data-state={state}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper relative flex w-full min-h-full flex-1 overflow-hidden',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

export interface SidebarProps extends React.ComponentProps<'div'> {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'icon',
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <aside
        data-slot="sidebar"
        className={cn(
          'bg-[var(--surface-card)] text-[var(--ink-primary)] border-r border-[var(--outline-base)] flex h-full w-[var(--sidebar-width,16.5rem)] shrink-0 flex-col select-none z-20',
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-[var(--surface-card)] text-[var(--ink-primary)] w-[var(--sidebar-width-mobile,18rem)] p-0 [&>button]:hidden border-r border-[var(--outline-base)]"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Sidebar</SheetTitle>
            <SheetDescription>Main navigation and platform switcher.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  const isCollapsed = state === 'collapsed'

  return (
    <aside
      data-slot="sidebar"
      data-state={state}
      data-collapsible={isCollapsed ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      className={cn(
        'group peer text-[var(--ink-primary)] bg-[var(--surface-card)] relative z-20 flex h-full shrink-0 flex-col border-r border-[var(--outline-base)] transition-[width] duration-200 ease-in-out select-none',
        isCollapsed
          ? collapsible === 'icon'
            ? 'w-[var(--sidebar-width-icon,4rem)]'
            : 'w-0 overflow-hidden border-r-0'
          : 'w-[var(--sidebar-width,16.5rem)]',
        variant === 'floating' && 'm-2 rounded-2xl border shadow-sm',
        variant === 'inset' && 'bg-[var(--surface-muted)]',
        className,
      )}
      {...props}
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        className="flex h-full w-full flex-col overflow-hidden"
      >
        {children}
      </div>
    </aside>
  )
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="outline"
      theme="gray"
      size="icon-sm"
      className={cn('size-8 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] shadow-2xs shrink-0', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar (⌘B)"
      {...props}
    >
      {state === 'collapsed' ? (
        <PanelLeftOpen className="size-4 text-[var(--brand-solid)]" />
      ) : (
        <PanelLeftClose className="size-4 text-[var(--ink-secondary)]" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 -right-2 z-30 hidden w-4 cursor-ew-resize opacity-0 transition-opacity hover:opacity-100 sm:flex items-center justify-center',
        'after:h-full after:w-[2px] after:bg-[var(--brand-solid)] after:rounded-full',
        className,
      )}
      {...props}
    />
  )
}

export function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'relative flex flex-1 flex-col min-w-0 w-full bg-[var(--surface-base)] overflow-y-auto',
        className,
      )}
      {...props}
    />
  )
}

export function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('h-8 w-full text-xs shadow-none', className)}
      {...props}
    />
  )
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-3 shrink-0 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:items-center', className)}
      {...props}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-3 shrink-0 mt-auto group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:items-center', className)}
      {...props}
    />
  )
}

export function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('my-1 bg-[var(--outline-base)]/60', className)}
      {...props}
    />
  )
}

export function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto overflow-x-hidden p-2 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:items-center',
        className,
      )}
      {...props}
    />
  )
}

export function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-1.5 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:items-center', className)}
      {...props}
    />
  )
}

export function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)] flex h-7 shrink-0 items-center px-2 font-mono transition-opacity duration-150',
        'group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:h-0 group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

export function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'absolute top-2 right-2 flex size-5 items-center justify-center rounded-lg text-[var(--ink-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink-primary)] transition-colors',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-xs flex flex-col gap-0.5 group-data-[collapsible=icon]:items-center', className)}
      {...props}
    />
  )
}

export function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1 list-none m-0 p-0 group-data-[collapsible=icon]:items-center', className)}
      {...props}
    />
  )
}

export function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative flex items-center justify-center w-full list-none m-0 p-0', className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2.5 overflow-hidden rounded-xl px-2.5 py-2 text-left text-xs font-medium outline-hidden ring-[var(--outline-focus)] transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'text-[var(--ink-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink-primary)] data-[active=true]:bg-[var(--brand-subtle)] data-[active=true]:font-bold data-[active=true]:text-[var(--brand-ink)]',
        outline:
          'bg-[var(--surface-card)] border border-[var(--outline-base)] text-[var(--ink-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink-primary)] data-[active=true]:border-[var(--brand-solid)] data-[active=true]:bg-[var(--brand-subtle)] data-[active=true]:text-[var(--brand-ink)]',
      },
      size: {
        default: 'h-9',
        sm: 'h-7.5 text-xs',
        lg: 'h-11 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface SidebarMenuButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
}

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : 'button'
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive ? 'true' : undefined}
      className={cn(
        sidebarMenuButtonVariants({ variant, size }),
        isCollapsed && 'size-10 p-0 justify-center mx-auto [&>svg]:size-4.5',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )

  if (!tooltip) {
    return button
  }

  const tooltipProps = typeof tooltip === 'string' ? { children: tooltip } : tooltip

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={!isCollapsed || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  )
}

export function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        'absolute top-2 right-2 flex size-5 items-center justify-center rounded-md text-[var(--ink-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink-primary)] transition-colors',
        'group-data-[collapsible=icon]:hidden',
        showOnHover && 'opacity-0 group-hover/menu-item:opacity-100 transition-opacity',
        className,
      )}
      {...props}
    />
  )
}

export function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-bold font-mono bg-[var(--brand-subtle)] text-[var(--brand-ink)] group-data-[collapsible=icon]:hidden shrink-0 select-none transition-opacity',
        className,
      )}
      {...props}
    />
  )
}

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean
}) {
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-xl px-2.5', className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md shrink-0" />}
      <Skeleton className="h-3.5 w-3/4 rounded-sm" />
    </div>
  )
}

export function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'mx-4 flex min-w-0 flex-col gap-1 border-l border-[var(--outline-base)] pl-3 py-1',
        'group-data-[collapsible=icon]:hidden list-none',
        className,
      )}
      {...props}
    />
  )
}

export function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('relative list-none m-0 p-0', className)}
      {...props}
    />
  )
}

export function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive ? 'true' : undefined}
      className={cn(
        'flex h-7 min-w-0 items-center gap-2 rounded-lg px-2 text-xs font-medium text-[var(--ink-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink-primary)] transition-colors',
        'data-[active=true]:bg-[var(--brand-subtle)] data-[active=true]:font-bold data-[active=true]:text-[var(--brand-ink)]',
        className,
      )}
      {...props}
    />
  )
}
