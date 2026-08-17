'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
} from '@/components/ui/dialog'
import { Kbd } from '@/components/ui/kbd'

export interface ShortcutGroup {
  category: string
  shortcuts: Array<{
    combo: string
    description: string
  }>
}

export interface KeyboardShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups?: ShortcutGroup[]
}

const DEFAULT_SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    category: 'Navigation & Search',
    shortcuts: [
      { combo: 'Mod+K', description: 'Open Global Command Palette' },
      { combo: 'Mod+P', description: 'Quick Search Projects & Docs' },
      { combo: 'Mod+B', description: 'Toggle Sidebar Navigation' },
      { combo: 'Mod+Shift+H', description: 'Navigate to Home / Dashboard' },
    ],
  },
  {
    category: 'Actions & Editing',
    shortcuts: [
      { combo: 'Mod+S', description: 'Save Changes' },
      { combo: 'Mod+Enter', description: 'Submit Form / Run Query' },
      { combo: 'Mod+Z', description: 'Undo Last Action' },
      { combo: 'Mod+Shift+Z', description: 'Redo Action' },
      { combo: 'Mod+D', description: 'Duplicate Row / Block' },
    ],
  },
  {
    category: 'System & Modals',
    shortcuts: [
      { combo: 'Escape', description: 'Close Modal / Cancel Operation' },
      { combo: '?', description: 'Show Keyboard Shortcuts Cheat Sheet' },
    ],
  },
]

/**
 * KeyboardShortcutsDialog
 * Modal displaying accessible keyboard shortcuts organized by category.
 */
export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
  groups = DEFAULT_SHORTCUT_GROUPS,
}: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Boost your productivity with quick keyboard navigation and actions.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
          {groups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                {group.category}
              </span>
              <div className="rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)]/30 divide-y divide-[var(--outline-muted)]">
                {group.shortcuts.map((sc, scIdx) => (
                  <div
                    key={scIdx}
                    className="flex items-center justify-between px-3.5 py-2.5 text-xs"
                  >
                    <span className="text-[var(--ink-primary)] font-medium">
                      {sc.description}
                    </span>
                    <Kbd combo={sc.combo} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
