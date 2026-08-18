/**
 * Strider UI — Automated Registry Builder
 * Usage: tsx scripts/build-registry.ts
 * 
 * Scans components/ui/*.tsx, parses dependencies, and regenerates registry.json
 */

import * as fs from 'fs'
import * as path from 'path'

const KNOWN_EXTERNAL_DEPENDENCIES = [
  '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog',
  '@radix-ui/react-aspect-ratio',
  '@radix-ui/react-avatar',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu',
  '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-label',
  '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popover',
  '@radix-ui/react-progress',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-select',
  '@radix-ui/react-separator',
  '@radix-ui/react-slider',
  '@radix-ui/react-slot',
  '@radix-ui/react-switch',
  '@radix-ui/react-tabs',
  '@radix-ui/react-toast',
  '@radix-ui/react-toggle',
  '@radix-ui/react-toggle-group',
  '@radix-ui/react-tooltip',
  'lucide-react',
  'recharts',
  'sonner',
  'vaul',
  'cmdk',
  'zod',
  'input-otp',
  'embla-carousel-react',
  'react-resizable-panels',
  'date-fns',
  'react-day-picker',
  'agentation',
]

function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function extractDescription(content: string, fallback: string): string {
  const jsdocMatch = content.match(/\/\*\*\s*\n\s*\*\s*(\w+)\s*\n\s*\*\s*([^\n*]+)/)
  if (jsdocMatch && jsdocMatch[2]) {
    return jsdocMatch[2].trim()
  }
  return fallback
}

async function run() {
  const rootDir = path.resolve(__dirname, '..')
  const uiDir = path.join(rootDir, 'components', 'ui')
  const registryJsonPath = path.join(rootDir, 'registry.json')

  const files = fs.readdirSync(uiDir).filter((f) => f.endsWith('.tsx'))
  const items: any[] = []

  for (const file of files) {
    const slug = file.replace('.tsx', '')
    if (slug === 'use-mobile' || slug === 'provider') continue

    const filePath = path.join(uiDir, file)
    const content = fs.readFileSync(filePath, 'utf8')

    // Find external dependencies
    const dependencies: string[] = []
    for (const dep of KNOWN_EXTERNAL_DEPENDENCIES) {
      if (content.includes(`from '${dep}'`) || content.includes(`from "${dep}"`)) {
        dependencies.push(dep)
      }
    }

    // Find registry dependencies (other UI components)
    const registryDependencies: string[] = []
    const internalMatches = content.matchAll(/from ['"]@\/components\/ui\/([^'"]+)['"]/g)
    for (const match of internalMatches) {
      const depSlug = match[1]
      if (depSlug !== slug && !registryDependencies.includes(depSlug)) {
        registryDependencies.push(depSlug)
      }
    }

    const title = toTitleCase(slug)
    const description = extractDescription(
      content,
      `${title} component for Strider UI design system.`
    )

    items.push({
      name: slug,
      type: 'registry:ui',
      title,
      description,
      dependencies: dependencies.sort(),
      registryDependencies: registryDependencies.sort(),
      files: [
        {
          path: `components/ui/${file}`,
          type: 'registry:ui',
          target: `components/ui/${file}`,
        },
      ],
    })
  }

  items.sort((a, b) => a.name.localeCompare(b.name))

  const registry = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'strider-ui',
    homepage: 'https://strider-ui.dev',
    items,
  }

  fs.writeFileSync(registryJsonPath, JSON.stringify(registry, null, 2) + '\n')
  console.log(`\x1b[32m✔ Successfully built registry.json with ${items.length} components!\x1b[0m\n`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
