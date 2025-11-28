"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// <CHANGE> Simplified type definition and ensured proper props
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
