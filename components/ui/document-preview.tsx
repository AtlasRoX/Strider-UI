'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Maximize2,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { toast } from 'sonner'

export interface DocumentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  totalPages?: number
  documentId?: string
}

export function DocumentPreview({
  title = 'Enterprise Master Service Agreement (MSA-2026.pdf)',
  totalPages = 8,
  documentId = 'DOC-99214-SEC',
  className,
  ...props
}: DocumentPreviewProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [zoom, setZoom] = React.useState(100)

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(150, Math.max(75, prev + delta)))
  }

  const handleDownload = () => {
    toast.success(`Downloaded document "${title}"`)
  }

  return (
    <div
      data-slot="document-preview"
      className={cn(
        'flex flex-col rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[var(--surface-muted)] border-b border-[var(--outline-base)] text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="size-4 text-[var(--brand-solid)] shrink-0" />
          <span className="font-bold text-[var(--ink-primary)] truncate max-w-[220px]">{title}</span>
          <span className="text-[10px] font-mono text-[var(--ink-muted)] hidden sm:inline">
            ({documentId})
          </span>
        </div>

        {/* Page Nav & Zoom Toolbar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[var(--surface-base)] px-2 py-1 rounded-lg border border-[var(--outline-base)] font-mono text-xs">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-0.5 rounded hover:bg-[var(--surface-muted)] disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="size-3" />
            </button>
            <span className="text-[11px] font-semibold text-[var(--ink-primary)]">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-0.5 rounded hover:bg-[var(--surface-muted)] disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="size-3" />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[var(--surface-base)] px-2 py-1 rounded-lg border border-[var(--outline-base)] text-xs">
            <button
              type="button"
              onClick={() => handleZoom(-25)}
              className="p-0.5 rounded hover:bg-[var(--surface-muted)] cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="size-3 text-[var(--ink-muted)]" />
            </button>
            <span className="text-[10px] font-mono font-semibold text-[var(--ink-muted)]">{zoom}%</span>
            <button
              type="button"
              onClick={() => handleZoom(25)}
              className="p-0.5 rounded hover:bg-[var(--surface-muted)] cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="size-3 text-[var(--ink-muted)]" />
            </button>
          </div>

          <Button
            variant="outline"
            theme="gray"
            size="xs"
            onClick={handleDownload}
            prefix={<Download className="size-3" />}
          >
            PDF
          </Button>
        </div>
      </div>

      {/* Document Page Canvas Container */}
      <div className="p-6 bg-[var(--surface-muted)]/50 flex justify-center items-center overflow-auto min-h-[300px]">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-lg bg-[var(--surface-base)] rounded-xl border border-[var(--outline-base)] shadow-lg p-8 flex flex-col gap-4 text-xs text-[var(--ink-secondary)] transition-transform duration-150"
        >
          {/* Header on page */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--outline-base)]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[var(--ink-primary)]">STRIDER ENTERPRISE</span>
              <Badge variant="subtle" theme="brand" size="sm">CONFIDENTIAL</Badge>
            </div>
            <span className="font-mono text-[10px] text-[var(--ink-muted)]">Page {currentPage} of {totalPages}</span>
          </div>

          <h3 className="font-bold text-sm text-[var(--ink-primary)]">
            Section {currentPage}.0 — Service Level Commitments & Cloud Encryption
          </h3>
          <p className="leading-relaxed text-[11px] text-[var(--ink-secondary)]">
            Customer data stored within the multi-tenant cluster is encrypted at rest using AES-256 GCM keys managed through the Customer Key Vault. In-transit payloads utilize TLS 1.3 cryptographic ciphers with mandatory HSTS enforcement.
          </p>

          <div className="p-3 rounded-lg bg-[var(--surface-muted)]/60 border border-[var(--outline-base)] font-mono text-[10px] text-[var(--ink-muted)]">
            SHA256 Fingerprint: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
          </div>

          {/* Electronic Signature Seal */}
          <div className="mt-4 pt-3 border-t border-[var(--outline-base)] flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <CheckCircle2 className="size-3.5" />
              <span>Digitally Signed by Strider Trust Officer</span>
            </div>
            <span className="font-mono text-[var(--ink-muted)]">Timestamp: 2026-10-14T08:30Z</span>
          </div>
        </div>
      </div>
    </div>
  )
}
