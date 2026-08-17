'use client'

import * as React from 'react'
import { FileText, Image as ImageIcon, UploadCloud, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form-control'
import { Progress } from '@/components/ui/progress'

export interface UploadedFileItem {
  id: string
  file: File
  name: string
  size: number
  progress: number
  error?: string
}

export interface FileUploaderProps {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
  onFilesSelected?: (files: File[]) => void
  disabled?: boolean
  className?: string
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function FileUploader({
  id: customId,
  label,
  description,
  error,
  required,
  accept,
  multiple = false,
  maxSizeMB = 10,
  onFilesSelected,
  disabled = false,
  className,
}: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [fileList, setFileList] = React.useState<UploadedFileItem[]>([])
  const [localError, setLocalError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return
    setLocalError(null)

    const newFiles: UploadedFileItem[] = []
    const rawFiles: File[] = []
    const maxBytes = maxSizeMB * 1024 * 1024

    for (let i = 0; i < incoming.length; i++) {
      const f = incoming[i]
      if (f.size > maxBytes) {
        setLocalError(`File "${f.name}" exceeds ${maxSizeMB}MB limit.`)
        continue
      }

      newFiles.push({
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        name: f.name,
        size: f.size,
        progress: 100, // Instant local load
      })
      rawFiles.push(f)
    }

    setFileList((prev) => (multiple ? [...prev, ...newFiles] : newFiles))
    onFilesSelected?.(rawFiles)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    handleFiles(e.dataTransfer.files)
  }

  const handleRemove = (fileId: string) => {
    setFileList((prev) => prev.filter((f) => f.id !== fileId))
  }

  const effectiveError = error || localError

  const controlElement = (fieldProps?: {
    id: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
    'aria-required'?: boolean
  }) => (
    <div className="flex flex-col gap-3 w-full">
      {/* Drop Zone */}
      <div
        data-slot="file-dropzone"
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl bg-[var(--surface-card)] transition-colors cursor-pointer text-center select-none',
          'hover:bg-[var(--surface-subtle)] hover:border-[var(--brand-solid)]',
          isDragOver && 'border-[var(--brand-solid)] bg-[var(--brand-subtle)]/30',
          disabled && 'cursor-not-allowed opacity-50 pointer-events-none',
          Boolean(effectiveError) && 'border-[var(--rose-solid)]',
          className
        )}
      >
        <input
          ref={inputRef}
          type="file"
          id={fieldProps?.id || customId}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex size-10 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-[var(--brand-solid)] mb-2">
          <UploadCloud className="size-5" />
        </div>

        <div className="text-xs font-semibold text-[var(--ink-primary)] mb-0.5">
          Click to upload or drag and drop
        </div>
        <div className="text-[11px] text-[var(--ink-muted)]">
          {accept ? `Supported files: ${accept}` : 'Any files'} (Max {maxSizeMB}MB)
        </div>
      </div>

      {/* File List Queue */}
      {fileList.length > 0 && (
        <div className="flex flex-col gap-2">
          {fileList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {item.file.type.startsWith('image/') ? (
                  <ImageIcon className="size-4 text-[var(--brand-solid)] shrink-0" />
                ) : (
                  <FileText className="size-4 text-[var(--ink-secondary)] shrink-0" />
                )}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate font-medium text-[var(--ink-primary)]">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[var(--ink-muted)]">
                    {formatFileSize(item.size)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove(item.id)
                  }}
                  className="p-1 rounded-md text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  if (label || description || effectiveError || required) {
    return (
      <FormControl
        id={customId}
        label={label}
        description={description}
        error={effectiveError}
        required={required}
      >
        {(fieldProps) => controlElement(fieldProps)}
      </FormControl>
    )
  }

  return controlElement()
}
