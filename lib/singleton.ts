/**
 * moduleSingleton
 * Ensures a single shared instance of runtime state (dialog stack, cache, portal targets)
 * across bundle boundaries, symlinks, and Next.js hot module reloading (HMR).
 */
export function moduleSingleton<T>(key: string, factory: () => T): T {
  const globalKey = `__strider_ui_singleton_${key}__` as const
  const g = globalThis as unknown as Record<string, T>

  if (!g[globalKey]) {
    g[globalKey] = factory()
  }

  return g[globalKey]
}
