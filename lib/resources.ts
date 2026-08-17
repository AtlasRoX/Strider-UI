'use client'

import * as React from 'react'

export interface ResourceOptions<T, P = any> {
  auto?: boolean
  initialData?: T
  params?: P
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  transform?: (raw: any) => T
}

export interface ResourceReturn<T, P = any> {
  data: T | undefined
  loading: boolean
  error: Error | null
  fetch: (params?: P) => Promise<T | undefined>
  reload: () => Promise<T | undefined>
  mutate: (newData: T | ((current: T | undefined) => T)) => void
  reset: () => void
}

/**
 * useResource
 * Declarative async data-fetching hook mirroring Frappe-UI's createResource for React 19 / Next.js.
 */
export function useResource<T, P = any>(
  fetcher: (params?: P) => Promise<T>,
  options: ResourceOptions<T, P> = {}
): ResourceReturn<T, P> {
  const {
    auto = true,
    initialData,
    params: initialParams,
    onSuccess,
    onError,
    transform,
  } = options

  const [data, setData] = React.useState<T | undefined>(initialData)
  const [loading, setLoading] = React.useState<boolean>(auto)
  const [error, setError] = React.useState<Error | null>(null)
  const lastParamsRef = React.useRef<P | undefined>(initialParams)

  const executeFetch = React.useCallback(
    async (params?: P): Promise<T | undefined> => {
      setLoading(true)
      setError(null)
      lastParamsRef.current = params ?? lastParamsRef.current

      try {
        const raw = await fetcher(lastParamsRef.current)
        const transformed = transform ? transform(raw) : raw
        setData(transformed)
        setLoading(false)
        onSuccess?.(transformed)
        return transformed
      } catch (err: any) {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        setError(errorObj)
        setLoading(false)
        onError?.(errorObj)
        return undefined
      }
    },
    [fetcher, onSuccess, onError, transform]
  )

  React.useEffect(() => {
    if (auto) {
      executeFetch(initialParams)
    }
  }, [auto, executeFetch, initialParams])

  const reload = React.useCallback(async () => {
    return executeFetch(lastParamsRef.current)
  }, [executeFetch])

  const mutate = React.useCallback(
    (newData: T | ((current: T | undefined) => T)) => {
      setData((prev) => (typeof newData === 'function' ? (newData as any)(prev) : newData))
    },
    []
  )

  const reset = React.useCallback(() => {
    setData(initialData)
    setError(null)
    setLoading(false)
  }, [initialData])

  return {
    data,
    loading,
    error,
    fetch: executeFetch,
    reload,
    mutate,
    reset,
  }
}

/** Aliases for Frappe-UI API naming parity */
export const useCall = useResource
export const createResource = useResource

export interface ListResourceOptions<T> {
  auto?: boolean
  initialPage?: number
  pageSize?: number
  initialFilter?: Record<string, any>
  initialSearch?: string
  initialSort?: { key: string; order: 'asc' | 'desc' }
}

export interface ListResourceReturn<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  loading: boolean
  error: Error | null
  search: string
  filter: Record<string, any>
  sort: { key: string; order: 'asc' | 'desc' } | undefined
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  setSearch: (search: string) => void
  setFilter: (filter: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => void
  setSort: (key: string, order?: 'asc' | 'desc') => void
  reload: () => Promise<void>
  mutate: (updater: (current: T[]) => T[]) => void
}

/**
 * useListResource / useList / createListResource
 * Paginated, filterable, and searchable list data manager.
 */
export function useListResource<T>(
  fetcher: (params: {
    page: number
    pageSize: number
    search?: string
    filter?: Record<string, any>
    sort?: { key: string; order: 'asc' | 'desc' }
  }) => Promise<{ data: T[]; total: number }>,
  options: ListResourceOptions<T> = {}
): ListResourceReturn<T> {
  const {
    auto = true,
    initialPage = 1,
    pageSize = 10,
    initialFilter = {},
    initialSearch = '',
    initialSort,
  } = options

  const [page, setPage] = React.useState(initialPage)
  const [search, setSearch] = React.useState(initialSearch)
  const [filter, setFilterState] = React.useState<Record<string, any>>(initialFilter)
  const [sort, setSortState] = React.useState(initialSort)
  const [data, setData] = React.useState<T[]>([])
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(auto)
  const [error, setError] = React.useState<Error | null>(null)

  const loadData = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetcher({
        page,
        pageSize,
        search: search || undefined,
        filter: Object.keys(filter).length > 0 ? filter : undefined,
        sort,
      })
      setData(res.data)
      setTotal(res.total)
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setLoading(false)
    }
  }, [fetcher, page, pageSize, search, filter, sort])

  React.useEffect(() => {
    if (auto) {
      loadData()
    }
  }, [auto, loadData])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const nextPage = React.useCallback(() => {
    setPage((p) => Math.min(totalPages, p + 1))
  }, [totalPages])

  const prevPage = React.useCallback(() => {
    setPage((p) => Math.max(1, p - 1))
  }, [])

  const setFilter = React.useCallback(
    (newFilter: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => {
      setFilterState(newFilter)
      setPage(1)
    },
    []
  )

  const setSort = React.useCallback((key: string, order: 'asc' | 'desc' = 'asc') => {
    setSortState((prev) => {
      if (prev?.key === key && !order) {
        return { key, order: prev.order === 'asc' ? 'desc' : 'asc' }
      }
      return { key, order }
    })
    setPage(1)
  }, [])

  const mutate = React.useCallback((updater: (current: T[]) => T[]) => {
    setData((prev) => updater(prev))
  }, [])

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
    loading,
    error,
    search,
    filter,
    sort,
    setPage,
    nextPage,
    prevPage,
    setSearch,
    setFilter,
    setSort,
    reload: loadData,
    mutate,
  }
}

export const useList = useListResource
export const createListResource = useListResource

export interface DocumentResourceOptions<T> {
  auto?: boolean
  initialDoc?: T
}

export interface DocumentResourceReturn<T> {
  doc: T | undefined
  loading: boolean
  isSaving: boolean
  error: Error | null
  update: (fields: Partial<T>) => Promise<T | undefined>
  delete: () => Promise<boolean>
  reload: () => Promise<void>
  mutate: (updater: (doc: T | undefined) => T) => void
}

/**
 * useDocumentResource / useDoc / createDocumentResource
 * Single entity manager with optimistic updates and deletion.
 */
export function useDocumentResource<T extends Record<string, any>>(
  docId: string,
  handlers: {
    get: (id: string) => Promise<T>
    update?: (id: string, fields: Partial<T>) => Promise<T>
    delete?: (id: string) => Promise<boolean>
  },
  options: DocumentResourceOptions<T> = {}
): DocumentResourceReturn<T> {
  const { auto = true, initialDoc } = options
  const [doc, setDoc] = React.useState<T | undefined>(initialDoc)
  const [loading, setLoading] = React.useState(auto)
  const [isSaving, setIsSaving] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const loadDoc = React.useCallback(async () => {
    if (!docId) return
    setLoading(true)
    setError(null)
    try {
      const data = await handlers.get(docId)
      setDoc(data)
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setLoading(false)
    }
  }, [docId, handlers])

  React.useEffect(() => {
    if (auto && docId) {
      loadDoc()
    }
  }, [auto, docId, loadDoc])

  const update = React.useCallback(
    async (fields: Partial<T>): Promise<T | undefined> => {
      if (!handlers.update) return undefined
      setIsSaving(true)
      setError(null)
      // Optimistic update
      setDoc((prev) => (prev ? { ...prev, ...fields } : undefined))

      try {
        const saved = await handlers.update(docId, fields)
        setDoc(saved)
        return saved
      } catch (err: any) {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        setError(errorObj)
        // Rollback on error by reloading
        loadDoc()
        return undefined
      } finally {
        setIsSaving(false)
      }
    },
    [docId, handlers, loadDoc]
  )

  const deleteDoc = React.useCallback(async (): Promise<boolean> => {
    if (!handlers.delete) return false
    setIsSaving(true)
    setError(null)
    try {
      const success = await handlers.delete(docId)
      if (success) {
        setDoc(undefined)
      }
      return success
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)))
      return false
    } finally {
      setIsSaving(false)
    }
  }, [docId, handlers])

  const mutate = React.useCallback((updater: (doc: T | undefined) => T) => {
    setDoc((prev) => updater(prev))
  }, [])

  return {
    doc,
    loading,
    isSaving,
    error,
    update,
    delete: deleteDoc,
    reload: loadDoc,
    mutate,
  }
}

export const useDoc = useDocumentResource
export const createDocumentResource = useDocumentResource

/**
 * useNewDoc
 * Create and submit a new document entity.
 */
export function useNewDoc<T extends Record<string, any>>(
  creator: (data: Partial<T>) => Promise<T>
) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const create = React.useCallback(
    async (data: Partial<T>): Promise<T | undefined> => {
      setLoading(true)
      setError(null)
      try {
        const res = await creator(data)
        setLoading(false)
        return res
      } catch (err: any) {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        setError(errorObj)
        setLoading(false)
        return undefined
      }
    },
    [creator]
  )

  return { create, loading, error }
}

/**
 * useAction
 * Mutation execution helper with loading, error, and status.
 */
export function useAction<P = any, R = any>(
  action: (params: P) => Promise<R>
) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [data, setData] = React.useState<R | undefined>(undefined)

  const execute = React.useCallback(
    async (params: P): Promise<R | undefined> => {
      setLoading(true)
      setError(null)
      try {
        const res = await action(params)
        setData(res)
        setLoading(false)
        return res
      } catch (err: any) {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        setError(errorObj)
        setLoading(false)
        return undefined
      }
    },
    [action]
  )

  return { execute, loading, error, data }
}
