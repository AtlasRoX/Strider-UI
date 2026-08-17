/**
 * Strider UI Font Library Registry
 * Central registry and manager for application typography and iconic web fonts.
 */

export interface FontConfig {
  id: string
  name: string
  provider: 'Google' | 'Apple' | 'Vercel' | 'JetBrains' | 'Open Source'
  fontFamily: string
  variable: string
  weights: number[]
  opticalSizing?: boolean
  variationSettings?: string
  isDefault?: boolean
  category: 'sans' | 'mono' | 'display'
  description: string
  tags: string[]
}

export const FONT_LIBRARY: Record<string, FontConfig> = {
  'google-sans': {
    id: 'google-sans',
    name: 'Google Sans',
    provider: 'Google',
    fontFamily: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    variable: '--font-google-sans',
    weights: [400, 500, 600, 700],
    opticalSizing: true,
    variationSettings: '"GRAD" 0',
    isDefault: true,
    category: 'sans',
    description: 'Modern, high-legibility geometric sans-serif designed by Google for Material 3 & Android.',
    tags: ['Google', 'Default', 'Geometric', 'Clean', 'Material'],
  },
  'sf-pro': {
    id: 'sf-pro',
    name: 'SF Pro (Apple)',
    provider: 'Apple',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    variable: '--font-sf-pro',
    weights: [300, 400, 500, 600, 700, 800],
    isDefault: false,
    category: 'sans',
    description: 'Apple Human Interface Guidelines system typeface. Flawless native Apple feel with zero latency.',
    tags: ['Apple', 'iOS', 'macOS', 'Native', 'System'],
  },
  'geist': {
    id: 'geist',
    name: 'Geist Sans',
    provider: 'Vercel',
    fontFamily: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    variable: '--font-geist',
    weights: [300, 400, 500, 600, 700, 800, 900],
    isDefault: false,
    category: 'sans',
    description: 'Vercel precision typeface crafted for developer tools, high-density data, and Next.js interfaces.',
    tags: ['Vercel', 'Next.js', 'Minimalist', 'Developer', 'Modern'],
  },
  'geist-mono': {
    id: 'geist-mono',
    name: 'Geist Mono',
    provider: 'Vercel',
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    variable: '--font-geist-mono',
    weights: [400, 500, 600, 700],
    isDefault: false,
    category: 'mono',
    description: 'Sleek, modernist monospace engineered for code blocks, terminal outputs, and numerical tables.',
    tags: ['Vercel', 'Code', 'Terminal', 'Monospace'],
  },
  'inter': {
    id: 'inter',
    name: 'Inter',
    provider: 'Open Source',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    variable: '--font-inter',
    weights: [300, 400, 500, 600, 700, 800, 900],
    opticalSizing: true,
    isDefault: false,
    category: 'sans',
    description: 'The golden standard of modern SaaS UI typography crafted by Rasmus Andersson for ultra-sharp screen readability.',
    tags: ['Figma', 'Linear', 'SaaS', 'Standard', 'Precision'],
  },
  'outfit': {
    id: 'outfit',
    name: 'Outfit',
    provider: 'Google',
    fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    variable: '--font-outfit',
    weights: [300, 400, 500, 600, 700, 800, 900],
    isDefault: false,
    category: 'display',
    description: 'Vibrant, contemporary geometric typeface inspired by luxury brand design and modern fintech.',
    tags: ['Display', 'Fintech', 'Branding', 'Bold', 'Geometric'],
  },
  'jetbrains-mono': {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    provider: 'JetBrains',
    fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    variable: '--font-jetbrains-mono',
    weights: [400, 500, 600, 700, 800],
    isDefault: false,
    category: 'mono',
    description: 'The premier programmer typeface crafted by JetBrains with increased x-height and code ligatures.',
    tags: ['JetBrains', 'IDE', 'Code', 'Ligatures', 'Monospace'],
  },
  'plus-jakarta-sans': {
    id: 'plus-jakarta-sans',
    name: 'Plus Jakarta Sans',
    provider: 'Open Source',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    variable: '--font-plus-jakarta-sans',
    weights: [400, 500, 600, 700, 800],
    isDefault: false,
    category: 'sans',
    description: 'Fresh, versatile geometric sans-serif tailored for modern consumer web apps and clean dashboards.',
    tags: ['SaaS', 'Consumer', 'Grotesque', 'Contemporary'],
  },
}

export const DEFAULT_FONT = FONT_LIBRARY['google-sans']

/**
 * Helper to get registered font configuration
 */
export function getFont(id: string): FontConfig | undefined {
  return FONT_LIBRARY[id]
}

/**
 * Helper to list all registered fonts
 */
export function listFonts(): FontConfig[] {
  return Object.values(FONT_LIBRARY)
}
