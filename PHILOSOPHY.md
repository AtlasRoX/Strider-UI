# Strider UI — Design Philosophy

This document serves as the generative rulebook governing API design, component architecture, styling conventions, and accessibility across `Strider UI`. Every principle is **generative**: applying it produces the right architectural decisions across all current and future components.

---

## Core Principles (P1 – P15)

### P1. Name behaviors, not interactions
**Rule:** Event and callback prop names describe what happened to the component's state or what intent was signaled, not the physical DOM event that produced it.
- **Prefer:** `onChange`, `onOpenChange`, `onSelect`, `onSubmit`, `onDismiss`.
- **Avoid:** `onToggle`, `onClickOutside`, `onKeydownEnter`.
- *Exception:* When the raw DOM event is the exact behavior (e.g. `onClick` on a base `Button`).

```tsx
// Bad
<Switch onToggle={(val) => ...} />
<Dialog onClickOutside={() => ...} />

// Good
<Switch onChange={(checked) => ...} />
<Dialog onDismiss={() => ...} />
<Dialog onOpenChange={(open) => ...} />
```

---

### P2. Controlled + Uncontrolled Dual-Mode State
**Rule:** Any state a component lets the caller observe and modify must follow the standard React controlled/uncontrolled contract:
- Primary values: `value` / `defaultValue` / `onChange`
- Boolean toggles: `checked` / `defaultChecked` / `onChange`
- Overlays & Menus: `open` / `defaultOpen` / `onOpenChange`
- Search queries: `query` / `onQueryChange`

Never invent non-standard pairs like `:selected` + `@selectedChange`.

---

### P3. Prefer Primitive Prop Types (No Config Blobs)
**Rule:** Props are flat primitives (`string`, `number`, `boolean`, `ReactNode`) by default.
- Config-blob objects that bundle unrelated fields (`{ title, size, icon, actions }` in one prop) are strictly **forbidden**.
- Structured props are allowed **only** when representing irreducibly structured data (e.g. `options` in `Select`, `series` in `Chart`).

```tsx
// Bad
<Dialog config={{ title: 'Edit', size: 'lg', dismissible: true }} />

// Good
<Dialog open={isOpen} onOpenChange={setIsOpen} title="Edit" size="lg" dismissible />
```

---

### P4. Two Color Axes Only: `variant` + `theme` (No Semantic Intents)
**Rule:** Components that vary in color and style use exactly two axes:
1. **`variant`** — Visual weight: `'solid' | 'outline' | 'subtle' | 'ghost' | 'link'`
2. **`theme`** — Concrete color tone: `'brand' | 'gray' | 'blue' | 'emerald' | 'amber' | 'rose' | 'violet'`

**Forbidden:** Semantic aliases in component props (`intent="danger"`, `kind="warning"`, `appearance="primary"`). "Warning" maps to `theme="amber"`, "Danger" maps to `theme="rose"`.

**State-driven appearance:** Error, disabled, and loading states are controlled by boolean/string state props (`error`, `disabled`, `loading`), never by changing `theme`.

```tsx
// Bad
<Alert intent="warning" />
<Button appearance="primary" />
<Badge kind="danger" />

// Good
<Alert theme="amber" />
<Button variant="solid" theme="brand" />
<Badge variant="subtle" theme="rose" />
```

---

### P5. Uniform Input Labeling Contract
**Rule:** Every form control (anything that holds a value the user inputs, selects, or toggles) adheres to the standard labeling props:
- `label?: ReactNode` — Field title
- `description?: ReactNode` — Helper text
- `error?: string | boolean` — Error message (or boolean indicator)
- `required?: boolean` — Displays visual indicator and sets `aria-required`

Every input automatically generates stable unique IDs (`useId()`) linking `htmlFor`, `aria-describedby`, and `aria-errormessage`.

---

### P6. Shared Slot Vocabulary & JSX Composition
**Rule:** Sub-element customization follows a canonical naming vocabulary across all components:
- `children` — Main content / default slot
- `prefix` — Leading visual element (icon, avatar, badge)
- `suffix` — Trailing visual element (icon, chevron, status dot)
- `trigger` / `asChild` — Element that opens an overlay
- `header` / `footer` / `actions` — Container regions
- `empty` — Fallback view when collections are empty

---

### P7. Scoped Render Props Expose Internal State
**Rule:** When rendering dynamic collections (e.g. lists, select items, table cells), render props expose all relevant item state so callers never re-derive it:
- Items: `({ item, index, active, selected, disabled }) => ReactNode`
- Triggers: `({ open, disabled, value }) => ReactNode`

---

### P8. Split Components Instead of Boolean Mode Switches
**Rule:** When a prop fundamentally alters the returned data type or UX contract, split into distinct components instead of overloading with flags:
- `Select` (single fixed options) vs `MultiSelect` (array of values) vs `Combobox` (searchable/autocomplete)
- Do not create a single `<Picker multi searchable creatable />` monolith.

---

### P9. Zero-Boilerplate Imperative APIs
**Rule:** One-shot modals and notifications provide lightweight, promise-aware imperative helpers:
- `dialog.confirm({ title, message, theme, onConfirm })` — Handles async loading + auto-close / error rendering
- `dialog.danger({ title, message, onConfirm })` — Shortcut for `theme="rose"`
- `dialog.prompt({ title, fields, onSubmit })` — Captures single or multi-field inputs
- `toast.success()`, `toast.error()`, `toast.promise()`

All helpers mount via `<StriderUIProvider>`.

---

### P10. Customization via `data-*` Attributes, Never Inner Class Props
**Rule:** Components expose stable DOM styling hooks:
- `data-slot="button"`, `data-slot="dialog-content"`, `data-slot="input-prefix"`
- `data-state="open | closed | active | checked"`
- `data-variant="solid | subtle | outline | ghost"`
- `data-theme="brand | rose | emerald | amber"`

**Forbidden:** Passing inner class names (`triggerClassName`, `contentClassName`). Use `data-slot` and CSS selectors.

---

### P11. Icon Uniformity & Semantic Precision
**Rule:** Components that support leading or trailing icons accept:
- `icon?: LucideIcon | ReactNode`
- `prefix?: ReactNode` (full custom slot)
- `suffix?: ReactNode` (full custom slot)

**Anti-Pattern Rule:** Never use generic, sloppy AI icons (e.g. `Sparkles`, magical glitter stars, fantasy wands) for features or AI capabilities. Use crisp, functional domain icons (`Bot`, `Cpu`, `Layers`, `Terminal`, `Sliders`, `Code2`, `Boxes`, `Zap`, `Star`).

---

### P12. Accessibility is Non-Negotiable
**Rule:** Every interactive component must ship with complete accessibility at first release:
1. Full keyboard operability (Enter, Space, Arrow keys, Esc).
2. Visible `:focus-visible` focus rings that work in light and dark mode.
3. Proper ARIA roles and live states (`aria-expanded`, `aria-invalid`, `aria-selected`).
4. Screen-reader text for icon-only buttons (`aria-label="Close"` or `<span className="sr-only">`).
5. `prefers-reduced-motion` respected in all animations.

---

### P13. Deprecate, Don't Break
**Rule:** When evolving an API, keep old props functional while logging a one-time development warning (`warnDeprecated('Button', 'appearance', 'variant')`). Removal occurs only on major version releases.

---

### P14. Unstable Features Live in `experimental/`
**Rule:** New, rapidly iterating features that haven't locked their API contracts reside under `@/components/experimental/`.

---

### P15. Curated Barrels Only
**Rule:** Public component barrels (`components/ui/index.ts`) explicitly export reviewed components and types. Never do `export *` from uncontrolled internals.
