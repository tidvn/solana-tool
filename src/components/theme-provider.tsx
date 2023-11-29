

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ThemeProvider as DegenProvider } from 'degen'
import 'degen/styles'
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <DegenProvider>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </DegenProvider>)
}
