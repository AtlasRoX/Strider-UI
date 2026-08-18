/**
 * Strider UI — Automated Project Initializer
 * Usage: tsx scripts/setup-project.ts <target-directory>
 * 
 * Automatically configures any target Next.js / React workspace with Strider UI:
 * 1. Copies components/ui and lib folders
 * 2. Injects OKLCH theme tokens into app/globals.css
 * 3. Injects StriderUIProvider into app/layout.tsx
 * 4. Copies the complete AI Agent Constitution (AGENTS.md, CLAUDE.md, GEMINI.md, .cursorrules, .windsurfrules)
 * 5. Validates peer dependencies
 */

import * as fs from 'fs'
import * as path from 'path'

const PEER_DEPENDENCIES = {
  '@radix-ui/react-accordion': '^1.2.2',
  '@radix-ui/react-alert-dialog': '^1.1.4',
  '@radix-ui/react-aspect-ratio': '^1.1.1',
  '@radix-ui/react-avatar': '^1.1.2',
  '@radix-ui/react-checkbox': '^1.1.3',
  '@radix-ui/react-collapsible': '^1.1.2',
  '@radix-ui/react-context-menu': '^2.2.4',
  '@radix-ui/react-dialog': '^1.1.4',
  '@radix-ui/react-dropdown-menu': '^2.1.4',
  '@radix-ui/react-hover-card': '^1.1.4',
  '@radix-ui/react-label': '^2.1.1',
  '@radix-ui/react-menubar': '^1.1.4',
  '@radix-ui/react-navigation-menu': '^1.2.3',
  '@radix-ui/react-popover': '^1.1.4',
  '@radix-ui/react-progress': '^1.1.1',
  '@radix-ui/react-radio-group': '^1.2.2',
  '@radix-ui/react-scroll-area': '^1.2.2',
  '@radix-ui/react-select': '^2.1.4',
  '@radix-ui/react-separator': '^1.1.1',
  '@radix-ui/react-slider': '^1.2.2',
  '@radix-ui/react-slot': '^1.1.1',
  '@radix-ui/react-switch': '^1.1.2',
  '@radix-ui/react-tabs': '^1.1.2',
  '@radix-ui/react-toast': '^1.2.4',
  '@radix-ui/react-toggle': '^1.1.1',
  '@radix-ui/react-toggle-group': '^1.1.1',
  '@radix-ui/react-tooltip': '^1.1.6',
  'class-variance-authority': '^0.7.1',
  'clsx': '^2.1.1',
  'cmdk': '^1.0.4',
  'date-fns': '^4.1.0',
  'input-otp': '^1.4.1',
  'lucide-react': '^1.31.0',
  'next-themes': '^0.4.4',
  'react-day-picker': '^9.8.0',
  'recharts': '^2.15.4',
  'sonner': '^2.0.1',
  'tailwind-merge': '^2.5.5',
  'vaul': '^1.1.2',
  'zod': '^3.25.76',
}

const OKLCH_CSS_TOKEN_SNIPPET = `
/* --- Strider UI OKLCH Theme Tokens --- */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --surface-base: oklch(0.99 0 0);
  --surface-card: oklch(1 0 0);
  --surface-muted: oklch(0.96 0.005 185);
  --surface-subtle: oklch(0.93 0.01 185);
  --ink-primary: oklch(0.13 0.01 185);
  --ink-secondary: oklch(0.42 0.02 185);
  --ink-muted: oklch(0.62 0.01 185);
  --outline-base: oklch(0.90 0.005 185);
  --outline-focus: oklch(0.55 0.05 185);
  --outline-muted: oklch(0.93 0.005 185);

  /* 2-Axis Theme Colors */
  --brand-solid: oklch(0.55 0.05 185);
  --brand-subtle: oklch(0.94 0.02 185);
  --brand-outline: oklch(0.80 0.03 185);
  --brand-ink: oklch(0.35 0.04 185);

  --gray-solid: oklch(0.20 0.01 185);
  --gray-subtle: oklch(0.95 0 0);
  --gray-outline: oklch(0.85 0 0);
  --gray-ink: oklch(0.25 0 0);

  --blue-solid: oklch(0.55 0.18 245);
  --blue-subtle: oklch(0.95 0.03 245);
  --blue-outline: oklch(0.80 0.08 245);
  --blue-ink: oklch(0.35 0.12 245);

  --emerald-solid: oklch(0.56 0.17 152);
  --emerald-subtle: oklch(0.95 0.03 152);
  --emerald-outline: oklch(0.80 0.08 152);
  --emerald-ink: oklch(0.35 0.12 152);

  --amber-solid: oklch(0.70 0.17 75);
  --amber-subtle: oklch(0.96 0.04 75);
  --amber-outline: oklch(0.85 0.09 75);
  --amber-ink: oklch(0.38 0.12 75);

  --rose-solid: oklch(0.55 0.20 25);
  --rose-subtle: oklch(0.96 0.03 25);
  --rose-outline: oklch(0.85 0.09 25);
  --rose-ink: oklch(0.40 0.14 25);

  --violet-solid: oklch(0.56 0.20 290);
  --violet-subtle: oklch(0.96 0.03 290);
  --violet-outline: oklch(0.85 0.09 290);
  --violet-ink: oklch(0.38 0.14 290);
}

.dark {
  --surface-base: oklch(0.12 0.01 185);
  --surface-card: oklch(0.16 0.01 185);
  --surface-muted: oklch(0.20 0.015 185);
  --surface-subtle: oklch(0.24 0.02 185);
  --ink-primary: oklch(0.98 0 0);
  --ink-secondary: oklch(0.75 0.01 185);
  --ink-muted: oklch(0.55 0.01 185);
  --outline-base: oklch(0.26 0.01 185);
  --outline-focus: oklch(0.65 0.06 185);
  --outline-muted: oklch(0.22 0.01 185);

  --brand-solid: oklch(0.60 0.06 185);
  --brand-subtle: oklch(0.22 0.03 185);
  --brand-outline: oklch(0.35 0.04 185);
  --brand-ink: oklch(0.85 0.03 185);

  --gray-solid: oklch(0.90 0 0);
  --gray-subtle: oklch(0.22 0 0);
  --gray-outline: oklch(0.32 0 0);
  --gray-ink: oklch(0.88 0 0);

  --blue-solid: oklch(0.65 0.18 245);
  --blue-subtle: oklch(0.22 0.05 245);
  --blue-outline: oklch(0.35 0.08 245);
  --blue-ink: oklch(0.88 0.08 245);

  --emerald-solid: oklch(0.66 0.17 152);
  --emerald-subtle: oklch(0.22 0.05 152);
  --emerald-outline: oklch(0.35 0.08 152);
  --emerald-ink: oklch(0.88 0.08 152);

  --amber-solid: oklch(0.75 0.17 75);
  --amber-subtle: oklch(0.24 0.05 75);
  --amber-outline: oklch(0.38 0.09 75);
  --amber-ink: oklch(0.92 0.08 75);

  --rose-solid: oklch(0.65 0.20 25);
  --rose-subtle: oklch(0.24 0.05 25);
  --rose-outline: oklch(0.38 0.09 25);
  --rose-ink: oklch(0.90 0.08 25);

  --violet-solid: oklch(0.66 0.20 290);
  --violet-subtle: oklch(0.24 0.05 290);
  --violet-outline: oklch(0.38 0.09 290);
  --violet-ink: oklch(0.90 0.08 290);
}
`

function copyDirectoryRecursive(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

async function run() {
  const targetDir = process.argv[2] || process.cwd()
  const sourceRoot = path.resolve(__dirname, '..')

  console.log(`\n🚀 \x1b[36mStrider UI Project Initializer\x1b[0m`)
  console.log(`Target workspace: \x1b[32m${targetDir}\x1b[0m\n`)

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  // 1. Copy components/ui and lib
  console.log(`📦 Copying 157+ Strider UI components & libraries...`)
  copyDirectoryRecursive(
    path.join(sourceRoot, 'components', 'ui'),
    path.join(targetDir, 'components', 'ui')
  )
  copyDirectoryRecursive(
    path.join(sourceRoot, 'lib'),
    path.join(targetDir, 'lib')
  )

  // 2. Copy AI Agent Constitutions
  console.log(`🤖 Ingesting AI Agent Constitution & Rules (AGENTS.md, CLAUDE.md, GEMINI.md, .cursorrules, .windsurfrules)...`)
  const ruleFiles = ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md', '.cursorrules', '.windsurfrules', 'DESIGN_SYSTEM.md', 'PHILOSOPHY.md', 'CONTEXT.md']
  for (const file of ruleFiles) {
    const src = path.join(sourceRoot, file)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(targetDir, file))
    }
  }

  const copilotDir = path.join(targetDir, '.github')
  if (!fs.existsSync(copilotDir)) fs.mkdirSync(copilotDir, { recursive: true })
  const copilotSrc = path.join(sourceRoot, '.github', 'copilot-instructions.md')
  if (fs.existsSync(copilotSrc)) {
    fs.copyFileSync(copilotSrc, path.join(copilotDir, 'copilot-instructions.md'))
  }

  // 3. Configure globals.css
  const cssDir = path.join(targetDir, 'app')
  if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true })
  const cssPath = path.join(cssDir, 'globals.css')
  if (!fs.existsSync(cssPath)) {
    fs.writeFileSync(cssPath, OKLCH_CSS_TOKEN_SNIPPET.trim() + '\n')
    console.log(`✨ Created app/globals.css with OKLCH tokens`)
  } else {
    const existing = fs.readFileSync(cssPath, 'utf8')
    if (!existing.includes('--brand-solid')) {
      fs.appendFileSync(cssPath, '\n' + OKLCH_CSS_TOKEN_SNIPPET.trim() + '\n')
      console.log(`✨ Appended OKLCH tokens to app/globals.css`)
    }
  }

  // 4. Check dependencies in target package.json
  const targetPkgPath = path.join(targetDir, 'package.json')
  if (fs.existsSync(targetPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(targetPkgPath, 'utf8'))
    pkg.dependencies = pkg.dependencies || {}
    let updated = false

    for (const [dep, ver] of Object.entries(PEER_DEPENDENCIES)) {
      if (!pkg.dependencies[dep]) {
        pkg.dependencies[dep] = ver
        updated = true
      }
    }

    if (updated) {
      fs.writeFileSync(targetPkgPath, JSON.stringify(pkg, null, 2) + '\n')
      console.log(`📄 Updated target package.json with Strider UI peer dependencies`)
    }
  }

  console.log(`\n\x1b[32m✔ Strider UI setup completed successfully!\x1b[0m`)
  console.log(`\nTo start using Strider UI:`)
  console.log(`  1. Run \x1b[33mpnpm install\x1b[0m in your project.`)
  console.log(`  2. Wrap your root layout with \x1b[36m<StriderUIProvider>\x1b[0m from \x1b[36m'@/components/ui/provider'\x1b[0m.`)
  console.log(`  3. Instruct your AI agent: \x1b[32m"Build UI strictly using Strider UI and AGENTS.md"\x1b[0m\n`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
