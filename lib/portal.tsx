'use client'

import * as React from 'react'
import { moduleSingleton } from './singleton'

interface PortalRegistry {
  targets: Map<string, HTMLElement>
}

const portalRegistry = moduleSingleton<PortalRegistry>('portal-registry', () => ({
  targets: new Map(),
}))

export function providePortalTarget(key: string, element: HTMLElement) {
  portalRegistry.targets.set(key, element)
}

export function usePortalTarget(key: string = 'default'): HTMLElement | undefined {
  const [target, setTarget] = React.useState<HTMLElement | undefined>(() => {
    return portalRegistry.targets.get(key) || (typeof document !== 'undefined' ? document.body : undefined)
  })

  React.useEffect(() => {
    const el = portalRegistry.targets.get(key) || document.body
    setTarget(el)
  }, [key])

  return target
}

export function PortalTarget({ id = 'default', className, ...props }: React.ComponentProps<'div'>) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      providePortalTarget(id, ref.current)
    }
  }, [id])

  return <div ref={ref} id={`portal-target-${id}`} className={className} {...props} />
}
