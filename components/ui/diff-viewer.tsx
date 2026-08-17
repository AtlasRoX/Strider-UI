'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DiffLine {
  type: 'add' | 'delete' | 'normal'
  content: string
  oldLineNumber?: number
  newLineNumber?: number
}

export interface DiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  oldCode?: string
  newCode?: string
  diffLines?: DiffLine[]
  filename?: string
  viewMode?: 'unified' | 'split'
}

export function DiffViewer({
  oldCode,
  newCode,
  diffLines: customDiff,
  filename,
  viewMode = 'unified',
  className,
  ...props
}: DiffViewerProps) {
  // Generate simple diff lines if oldCode & newCode provided
  const lines = React.useMemo<DiffLine[]>(() => {
    if (customDiff) return customDiff
    if (!oldCode && !newCode) return []

    const oldLines = (oldCode || '').split('\n')
    const newLines = (newCode || '').split('\n')
    const result: DiffLine[] = []

    let oIdx = 0
    let nIdx = 0

    while (oIdx < oldLines.length || nIdx < newLines.length) {
      if (oIdx < oldLines.length && nIdx < newLines.length) {
        if (oldLines[oIdx] === newLines[nIdx]) {
          result.push({
            type: 'normal',
            content: oldLines[oIdx],
            oldLineNumber: oIdx + 1,
            newLineNumber: nIdx + 1,
          })
          oIdx++
          nIdx++
        } else {
          result.push({
            type: 'delete',
            content: oldLines[oIdx],
            oldLineNumber: oIdx + 1,
          })
          result.push({
            type: 'add',
            content: newLines[nIdx],
            newLineNumber: nIdx + 1,
          })
          oIdx++
          nIdx++
        }
      } else if (oIdx < oldLines.length) {
        result.push({
          type: 'delete',
          content: oldLines[oIdx],
          oldLineNumber: oIdx + 1,
        })
        oIdx++
      } else {
        result.push({
          type: 'add',
          content: newLines[nIdx],
          newLineNumber: nIdx + 1,
        })
        nIdx++
      }
    }

    return result
  }, [oldCode, newCode, customDiff])

  return (
    <div
      data-slot="diff-viewer"
      className={cn(
        'rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)] overflow-hidden font-mono text-xs shadow-2xs',
        className
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--surface-base)] border-b border-[var(--outline-base)] text-xs text-[var(--ink-secondary)]">
          <span className="font-sans font-medium">{filename}</span>
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="text-emerald-500 font-bold">
              +{lines.filter((l) => l.type === 'add').length}
            </span>
            <span className="text-rose-500 font-bold">
              -{lines.filter((l) => l.type === 'delete').length}
            </span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto p-2">
        {lines.map((line, idx) => {
          const isAdd = line.type === 'add'
          const isDelete = line.type === 'delete'

          return (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-3 px-2 py-0.5 rounded-xs leading-relaxed transition-colors',
                isAdd
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                  : isDelete
                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 line-through opacity-80'
                  : 'text-[var(--ink-primary)]'
              )}
            >
              {/* Line Numbers */}
              <div className="flex items-center gap-2 select-none text-[10px] text-[var(--ink-muted)] w-12 shrink-0 font-mono">
                <span className="w-5 text-right">{line.oldLineNumber ?? ' '}</span>
                <span className="w-5 text-right">{line.newLineNumber ?? ' '}</span>
              </div>

              {/* Symbol */}
              <span className="w-3 select-none font-bold shrink-0">
                {isAdd ? '+' : isDelete ? '-' : ' '}
              </span>

              {/* Line Content */}
              <span className="whitespace-pre font-mono flex-1">
                {line.content || ' '}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
