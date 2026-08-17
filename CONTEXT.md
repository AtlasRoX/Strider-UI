# Strider UI — Vocabulary & Context (`CONTEXT.md`)

This document defines the canonical vocabulary used across Strider UI components, documentation, props, and design tokens.

---

## 1. Composition Levels

- **Atom**: A primitive component that does not compose other public components (e.g. `Button`, `TextInput`, `Badge`, `Switch`, `Spinner`, `Kbd`).
- **Molecule**: A component that composes multiple atoms into a cohesive domain control (e.g. `FormField`, `SearchDialog`, `PasswordInput`, `ItemListRow`).
- **Organism / Layout Shell**: High-level page-structuring surfaces (e.g. `DesktopShell`, `Sidebar`, `Rail`, `PageHeader`, `DataTable`, `CommandPalette`, `Editor`).

---

## 2. Color Axes & Terms

### The Two Axes
- **`variant`**: Visual style weight:
  - `solid` — Filled background, high contrast text.
  - `outline` — Transparent background, themed border.
  - `subtle` — Tinted/pastel background, themed foreground text.
  - `ghost` — Transparent background, hover tint.
  - `link` — Underlined text style.

- **`theme`**: Color palette name:
  - `brand` — Primary brand color (`#538687` / OKLCH Teal)
  - `gray` — Neutral slate / zinc tone
  - `blue` — Informational blue tone
  - `emerald` — Success green tone
  - `amber` — Warning / attention amber tone (never use `yellow`)
  - `rose` — Destructive / danger red tone
  - `violet` — Accent purple tone

### Forbidden Color Names
- *Avoid*: `yellow` (use `amber`)
- *Avoid*: `danger` / `destructive` as a theme prop (use `theme="rose"`)
- *Avoid*: `success` as a theme prop (use `theme="emerald"`)
- *Avoid*: `primary` as a theme prop (use `theme="brand"`)
- *Avoid*: `info` as a theme prop (use `theme="blue"`)

---

## 3. Lifecycle, Visibility & Control

- **`open` / `onOpenChange`**: Visibility state of overlays (`Dialog`, `Popover`, `DropdownMenu`, `Sheet`, `Tooltip`).
  - *Avoid*: `visible`, `show`, `isOpen` (as public props; internal state is fine).
- **`dismissible`**: Whether an overlay closes on outside click or Escape key (boolean, default `true`).
  - *Avoid*: `disableOutsideClickToClose`, `closeOnOutsideClick`.
- **`bare`**: Prop (default `false`) that suppresses default dialog/card padding and header chrome, allowing custom full-bleed layouts.
  - *Avoid*: `flush`, `chromeless`, `unstyled`.
- **`fluid`**: Prop (default `false`) making items stretch to fill container width equally.
  - *Avoid*: `fullWidth`, `block`, `stretch`, `grow`.

---

## 4. Slots & Child Conventions

- **`prefix`**: Leading element inside a control (icon, avatar, status dot).
- **`suffix`**: Trailing element inside a control (icon, badge, shortcut key).
- **`trigger` / `asChild`**: The element that triggers an overlay or adopts child behaviors.
- **`header` / `footer` / `actions`**: Canonical region slots for cards, dialogs, and banners.
- **`data-slot`**: DOM attribute identifying structural components for styling hooks.
