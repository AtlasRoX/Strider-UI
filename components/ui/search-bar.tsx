"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export function SearchBar({ placeholder = "Search...", className, value, onChange }: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10 h-10 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
