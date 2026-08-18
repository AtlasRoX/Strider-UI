# GitHub Copilot Instructions: Strider UI Design System

When generating or refactoring UI code in this workspace:
- Exclusively use Strider UI components from `@/components/ui`.
- Use 2-Axis styling (`variant` + `theme`).
- Use OKLCH tokens (`var(--surface-*)`, `var(--ink-*)`, `var(--outline-*)`, `var(--brand-*)`).
- Follow the P5 Form Contract on inputs (`label`, `description`, `error`, `required`).
- Use P8 Selection Family (`Select`, `MultiSelect`, `Combobox`).
- Use P9 imperative dialogs (`await dialog.confirm()`, `await dialog.danger()`, `await dialog.prompt()`).
- Use crisp engineering icons from `lucide-react` (Bot, Cpu, Layers, Terminal, Sliders, Code2, Boxes, Zap).
- Read `AGENTS.md` and `DESIGN_SYSTEM.md` for full architecture specifications.
