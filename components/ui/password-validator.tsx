"use client"

import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordRequirement {
  label: string
  met: boolean
}

interface PasswordValidatorProps {
  password: string
  className?: string
}

export function PasswordValidator({ password, className }: PasswordValidatorProps) {
  const requirements: PasswordRequirement[] = [
    {
      label: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Contains lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      label: "Contains a number",
      met: /\d/.test(password),
    },
    {
      label: "Contains special character (!@#$%^&*)",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ]

  const allMet = requirements.every((req) => req.met)
  const strength = requirements.filter((req) => req.met).length

  return (
    <div className={cn("space-y-3", className)}>
      {/* Strength meter */}
      <div className="space-y-1.5">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                strength >= level
                  ? strength <= 2
                    ? "bg-destructive"
                    : strength <= 3
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  : "bg-muted",
              )}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {strength === 0 && "Enter a password"}
          {strength === 1 && "Very weak"}
          {strength === 2 && "Weak"}
          {strength === 3 && "Fair"}
          {strength === 4 && "Good"}
          {strength === 5 && "Strong"}
        </p>
      </div>

      {/* Requirements list */}
      <ul className="space-y-1.5">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-2 text-xs transition-colors",
              req.met ? "text-green-600" : "text-muted-foreground",
            )}
          >
            {req.met ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain an uppercase letter")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain a lowercase letter")
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain a number")
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain a special character")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
