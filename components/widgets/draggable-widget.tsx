"use client"

import type React from "react"

import { useState, useRef } from "react"
import { GripVertical, X, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DraggableWidgetProps {
  id: string
  title: string
  children: React.ReactNode
  onRemove?: (id: string) => void
  className?: string
  defaultExpanded?: boolean
}

export function DraggableWidget({
  id,
  title,
  children,
  onRemove,
  className,
  defaultExpanded = true,
}: DraggableWidgetProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const dragRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={dragRef}
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden transition-micro",
        "hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing flex-shrink-0" />
          <span className="text-sm font-medium truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setExpanded(!expanded)}>
            {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(id)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      {expanded && <div className="p-4">{children}</div>}
    </div>
  )
}
