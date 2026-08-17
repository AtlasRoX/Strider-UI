'use client'

import * as React from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserMenuProps {
  user?: {
    email?: string
    name?: string
    avatar?: string
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const userName = user?.name || 'User'
  const userEmail = user?.email || ''

  const handleSignOut = () => {
    router.push('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-[var(--outline-focus)]/30 transition-all outline-none"
          aria-label="User account menu"
        >
          <Avatar
            src={user?.avatar}
            label={userName}
            size="sm"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-xs text-[var(--ink-primary)]">{userName}</span>
            {userEmail && (
              <span className="text-[11px] font-normal text-[var(--ink-secondary)] truncate">
                {userEmail}
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild prefix={<User className="size-3.5" />}>
          <Link href="/dashboard/profile">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild prefix={<Settings className="size-3.5" />}>
          <Link href="/dashboard/settings">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          prefix={<LogOut className="size-3.5" />}
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
