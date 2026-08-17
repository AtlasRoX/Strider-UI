'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Terminal, Copy, Check, Trash2, CornerDownLeft } from 'lucide-react'
import { toast } from 'sonner'

export interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'system'
  text: string
  timestamp?: string
}

export interface TerminalEmulatorProps extends React.HTMLAttributes<HTMLDivElement> {
  initialLines?: TerminalLine[]
  promptPrefix?: string
}

const DEFAULT_LINES: TerminalLine[] = [
  { id: '1', type: 'system', text: 'Strider OS Shell v2.4.0 (x86_64-node-enterprise)' },
  { id: '2', type: 'system', text: 'Connected to cluster node us-east-prod-01 [OK]' },
  { id: '3', type: 'command', text: 'strider deploy --env=production' },
  { id: '4', type: 'output', text: '✓ Bundled 120 static edge routes in 1.4s' },
  { id: '5', type: 'output', text: '✓ Health check 200 OK passed across 8 global regions' },
]

export function TerminalEmulator({
  initialLines = DEFAULT_LINES,
  promptPrefix = 'strider ~ $',
  className,
  ...props
}: TerminalEmulatorProps) {
  const [lines, setLines] = React.useState<TerminalLine[]>(initialLines)
  const [inputVal, setInputVal] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  const terminalEndRef = React.useRef<HTMLDivElement>(null)

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = inputVal.trim()
    if (!cmd) return

    const newCmdLine: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      text: cmd,
    }

    let responseLines: TerminalLine[] = []

    if (cmd === 'clear') {
      setLines([])
      setInputVal('')
      return
    } else if (cmd === 'help') {
      responseLines = [
        { id: `out-${Date.now()}-1`, type: 'output', text: 'Available commands:' },
        { id: `out-${Date.now()}-2`, type: 'output', text: '  status   - Check cluster node status' },
        { id: `out-${Date.now()}-3`, type: 'output', text: '  deploy   - Trigger production deployment' },
        { id: `out-${Date.now()}-4`, type: 'output', text: '  ping     - Measure edge latency' },
        { id: `out-${Date.now()}-5`, type: 'output', text: '  clear    - Clear console logs' },
      ]
    } else if (cmd === 'status') {
      responseLines = [
        { id: `out-${Date.now()}-1`, type: 'output', text: 'Node: us-east-prod-01 · Uptime: 99.98% · Memory: 42%' },
      ]
    } else if (cmd === 'ping') {
      responseLines = [
        { id: `out-${Date.now()}-1`, type: 'output', text: '64 bytes from edge.strider.dev: icmp_seq=1 time=14.2 ms' },
      ]
    } else {
      responseLines = [
        { id: `out-${Date.now()}-1`, type: 'output', text: `Command executed: ${cmd}` },
      ]
    }

    setLines((prev) => [...prev, newCmdLine, ...responseLines])
    setInputVal('')

    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleCopyLogs = async () => {
    const text = lines.map((l) => (l.type === 'command' ? `${promptPrefix} ${l.text}` : l.text)).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Terminal output copied')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
    <div
      data-slot="terminal-emulator"
      className={cn(
        'flex flex-col rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 shadow-xl overflow-hidden font-mono text-xs select-none',
        className
      )}
      {...props}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-rose-500/80" />
          <div className="size-3 rounded-full bg-amber-500/80" />
          <div className="size-3 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] text-slate-400 font-sans font-medium ml-2">bash - strider-cloud</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopyLogs}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
            title="Copy logs"
          >
            {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setLines([])}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
            title="Clear"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="flex flex-col gap-1.5 p-4 min-h-[220px] max-h-[320px] overflow-y-auto leading-relaxed">
        {lines.map((line) => (
          <div key={line.id} className="flex items-start gap-2">
            {line.type === 'command' ? (
              <span className="text-emerald-400 font-bold">{promptPrefix}</span>
            ) : line.type === 'system' ? (
              <span className="text-indigo-400 font-semibold">[SYS]</span>
            ) : (
              <span className="text-slate-500">›</span>
            )}
            <span
              className={cn(
                line.type === 'command' && 'text-slate-100 font-semibold',
                line.type === 'system' && 'text-slate-400 italic',
                line.type === 'output' && 'text-emerald-300',
                line.type === 'error' && 'text-rose-400'
              )}
            >
              {line.text}
            </span>
          </div>
        ))}

        {/* Live Input Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1 mt-auto">
          <span className="text-emerald-400 font-bold">{promptPrefix}</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or 'status'..."
            className="flex-1 bg-transparent border-none outline-hidden text-slate-100 placeholder:text-slate-600 font-mono text-xs"
          />
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>

        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}
