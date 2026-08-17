'use client'

import * as React from 'react'

export interface OptionGroup<T = any> {
  label?: string
  options: T[]
}

export interface UseFilteredGroupsOptions<T> {
  groups: OptionGroup<T>[]
  query: string
  open?: boolean
  matches?: (item: T, query: string) => boolean
  alwaysMatch?: (item: T) => boolean
  filterable?: boolean
}

/**
 * useFilteredGroups
 * Shared selection filtering engine used by Select, MultiSelect, and Combobox.
 */
export function useFilteredGroups<T = any>({
  groups,
  query,
  open = true,
  matches,
  alwaysMatch,
  filterable = true,
}: UseFilteredGroupsOptions<T>): OptionGroup<T>[] {
  return React.useMemo(() => {
    const cleanQuery = query.trim().toLowerCase()

    if (!filterable || !cleanQuery || !open) {
      return groups
    }

    const defaultMatches = (item: any, q: string) => {
      const label = typeof item === 'object' && item !== null ? String(item.label || item.value || '') : String(item)
      return label.toLowerCase().includes(q)
    }

    const matchFn = matches || defaultMatches

    return groups
      .map((group) => {
        const filteredOptions = group.options.filter((item) => {
          if (alwaysMatch && alwaysMatch(item)) return true
          return matchFn(item, cleanQuery)
        })

        return {
          ...group,
          options: filteredOptions,
        }
      })
      .filter((group) => group.options.length > 0)
  }, [groups, query, open, matches, alwaysMatch, filterable])
}
