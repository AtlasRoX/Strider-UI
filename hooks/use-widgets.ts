"use client"

import { useState, useCallback } from "react"

export interface Widget {
  id: string
  type: string
  title: string
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export function useWidgets(initialWidgets: Widget[] = []) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets)

  const addWidget = useCallback((widget: Omit<Widget, "id">) => {
    const newWidget = {
      ...widget,
      id: `widget-${Date.now()}`,
    }
    setWidgets((prev) => [...prev, newWidget])
    return newWidget
  }, [])

  const removeWidget = useCallback((id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const updateWidget = useCallback((id: string, updates: Partial<Widget>) => {
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)))
  }, [])

  const moveWidget = useCallback(
    (id: string, position: { x: number; y: number }) => {
      updateWidget(id, { position })
    },
    [updateWidget],
  )

  const resizeWidget = useCallback(
    (id: string, size: { width: number; height: number }) => {
      updateWidget(id, { size })
    },
    [updateWidget],
  )

  return {
    widgets,
    addWidget,
    removeWidget,
    updateWidget,
    moveWidget,
    resizeWidget,
  }
}
