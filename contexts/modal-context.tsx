"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalOptions {
  title: string
  description?: string
  content?: ReactNode
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

interface ModalContextType {
  openModal: (options: ModalOptions) => void
  closeModal: () => void
  openConfirm: (options: Omit<ModalOptions, "content">) => Promise<boolean>
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ModalOptions | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null)

  const openModal = (opts: ModalOptions) => {
    setOptions(opts)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setOptions(null)
    if (resolvePromise) {
      resolvePromise(false)
      setResolvePromise(null)
    }
  }

  const openConfirm = (opts: Omit<ModalOptions, "content">): Promise<boolean> => {
    return new Promise((resolve) => {
      setResolvePromise(() => resolve)
      setOptions({ ...opts })
      setIsOpen(true)
    })
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      if (options?.onConfirm) {
        await options.onConfirm()
      }
      if (resolvePromise) {
        resolvePromise(true)
        setResolvePromise(null)
      }
      closeModal()
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    options?.onCancel?.()
    closeModal()
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal, openConfirm }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{options?.title}</DialogTitle>
            {options?.description && <DialogDescription>{options.description}</DialogDescription>}
          </DialogHeader>
          {options?.content}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
              {options?.cancelText || "Cancel"}
            </Button>
            <Button
              variant={options?.variant === "destructive" ? "destructive" : "default"}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : options?.confirmText || "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
