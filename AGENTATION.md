# Agentation — Visual Feedback & Bug Fixing for AI Agents

**Agentation** is integrated into Strider UI to provide an instant visual feedback loop between your local browser UI and AI coding agents (Antigravity, Claude Code, Cursor, Windsurf, Codex).

---

## 🎯 How It Works

1. **Click & Annotate**:
   While running `pnpm dev` locally on `http://localhost:3000`, a floating Agentation toolbar appears in your bottom-right corner.
   - Click the toolbar to enter **Annotation Mode**.
   - Click on any UI element, component, button, or section on your screen.

2. **Leave Feedback / Bug Description**:
   Type what you want changed or fixed (e.g. *"Change badge color to brand subtle and increase padding"* or *"Fix table row selection state"*).

3. **Copy Structured Context**:
   Agentation automatically extracts:
   - **DOM Path & CSS Selector**: (e.g., `main > section.grid > button.google-sans-600`)
   - **React Component Hierarchy**: From the React fiber tree
   - **Computed Styles**: Exact active colors, dimensions, and padding
   - **Bounding Box & Nearby Text**: High-resolution spatial coordinates

4. **Feed to AI Agent**:
   Hit **Copy** or **Send to Agent**. Paste the generated markdown into Antigravity or your AI assistant. The AI will immediately pinpoint the exact file, line, and component to apply the minimal, precise fix.

---

## 💻 Configuration & Usage

### 1. Root Provider Integration (`components/ui/provider.tsx`)
```tsx
import { StriderUIProvider } from '@/components/ui/provider'

export default function RootLayout({ children }) {
  return (
    <StriderUIProvider enableAgentation={true}>
      {children}
    </StriderUIProvider>
  )
}
```

### 2. Standalone Component (`components/ui/agentation.tsx`)
```tsx
import { AgentationToolbar } from '@/components/ui/agentation'

// Embed anywhere
<AgentationToolbar copyToClipboard={true} />
```

---

## 🤖 MCP Server Integration (Optional Real-Time Sync)
To stream annotations in real-time directly into AI agents without manual copy-pasting:
```bash
npx -y agentation-mcp server
```
