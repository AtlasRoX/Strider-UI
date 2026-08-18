# GEMINI & ANTIGRAVITY WORKSPACE KERNEL: STRIDER UI

> **CRITICAL INSTRUCTION**:
> This codebase uses the **Strider UI Design System**. All user interface generation, modification, and styling must strictly comply with Strider UI architecture.

## 🧭 Mandatory 3-Phase Agent Workflow

When given any UI task:
1. **Analyze Strider UI**: Scan `@/components/ui/index.ts` and `app/globals.css` to identify all reusable components and OKLCH design tokens.
2. **Formulate Strider UI Plan**: Explicitly map every view, table, form, modal, and metric to existing Strider UI primitives before writing code.
3. **Execute with 100% Compliance**: Write code exclusively importing from `@/components/ui` and `@/lib/dialog`.

## 🚨 Non-Negotiable Rules

1. **Component Imports**: ALL UI components must be imported from `@/components/ui`. Never install or import third-party component libraries.
2. **Two-Axis Styling (P4)**: Only use `variant` ('solid'|'outline'|'subtle'|'ghost'|'link') and `theme` ('brand'|'gray'|'blue'|'emerald'|'amber'|'rose'|'violet').
   - NEVER use semantic intents like `intent="danger"` or `color="primary"`.
   - NEVER use arbitrary Tailwind colors (`bg-blue-600`, `text-red-500`). Use OKLCH CSS variables (`var(--surface-*)`, `var(--ink-*)`, `var(--outline-*)`).
3. **P5 Uniform Form Contract**: Provide `label`, `description`, `error`, `required`, `prefix`, and `suffix` directly to input components (`Input`, `Select`, `Switch`, `Textarea`, `DatePicker`).
4. **P8 Selection Family**: Use `Select` for single value, `MultiSelect` for multiple tags, and `Combobox` for searchable autocompletes.
5. **P9 Imperative Dialogs**: For alerts, confirmations, and prompts, use `await dialog.confirm()`, `await dialog.danger()`, or `await dialog.prompt()` from `@/lib/dialog`.
6. **Icons (P11)**: Use `lucide-react` engineering icons (`Bot`, `Cpu`, `Layers`, `Terminal`, `Sliders`, `Code2`, `Boxes`, `Zap`, `Star`). NEVER use glitter stars or magic wands.
7. **Accessibility**: All interactive elements require keyboard navigation and proper ARIA labels.

See [AGENTS.md](file:///a:/StriderBoard/AGENTS.md) and [DESIGN_SYSTEM.md](file:///a:/StriderBoard/DESIGN_SYSTEM.md) for complete details.
