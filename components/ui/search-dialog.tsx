'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="size-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Quick Search</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="flex items-center gap-2 mt-2">
          <Input
            type="search"
            placeholder="Search anything..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            prefix={<Search className="size-4 text-[var(--ink-muted)]" />}
            clearable
            onClear={() => setSearchValue('')}
            autoFocus
          />
          <Button type="submit" variant="solid" theme="brand">
            Search
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
