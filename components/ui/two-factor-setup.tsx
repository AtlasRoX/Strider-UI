'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import {
  ShieldCheck,
  Smartphone,
  Key,
  Copy,
  Check,
  AlertCircle,
  QrCode,
  Lock,
  ArrowRight,
  RefreshCw,
  Info,
  Download,
  CheckCircle2,
  RotateCcw,
  Zap,
} from 'lucide-react'
import { toast } from 'sonner'

export interface TwoFactorSetupProps extends React.HTMLAttributes<HTMLDivElement> {
  secretKey?: string
  accountName?: string
  issuer?: string
  onVerify?: (code: string) => void
  onGenerateBackupCodes?: () => string[]
}

// Generate realistic pseudo-TOTP 6-digit code based on time slice
function generatePseudoTotp(secret: string): { code: string; secondsLeft: number } {
  const now = Math.floor(Date.now() / 1000)
  const timeStep = 30
  const secondsLeft = timeStep - (now % timeStep)
  const timeIndex = Math.floor(now / timeStep)

  // Deterministic 6 digit number
  let hash = 0
  const str = secret + timeIndex
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  const code = Math.abs(hash % 900000 + 100000).toString()
  return { code, secondsLeft }
}

export function TwoFactorSetup({
  secretKey = 'HXDM E4TG 9K2Q V7LZ',
  accountName = 'alex@strider.dev',
  issuer = 'Strider Platform',
  onVerify,
  onGenerateBackupCodes,
  className,
  ...props
}: TwoFactorSetupProps) {
  const [otp, setOtp] = React.useState('')
  const [copiedKey, setCopiedKey] = React.useState(false)
  const [copiedBackup, setCopiedBackup] = React.useState(false)
  const [backupCodes, setBackupCodes] = React.useState<string[]>([])
  const [isVerified, setIsVerified] = React.useState(false)
  const [totpData, setTotpData] = React.useState<{ code: string; secondsLeft: number }>({
    code: '849201',
    secondsLeft: 30,
  })

  // Live countdown timer for simulated authenticator app
  React.useEffect(() => {
    const tick = () => {
      setTotpData(generatePseudoTotp(secretKey))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [secretKey])

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(secretKey.replace(/\s/g, ''))
      setCopiedKey(true)
      toast.success('Secret key copied to clipboard')
      setTimeout(() => setCopiedKey(false), 2000)
    } catch {
      toast.error('Failed to copy secret key')
    }
  }

  const handleAutoFill = () => {
    setOtp(totpData.code)
    toast.info(`Auto-filled live authenticator code: ${totpData.code}`)
  }

  const handleVerify = () => {
    if (otp.length !== 6) return
    setIsVerified(true)
    handleGenerateCodes()
    onVerify?.(otp)
    toast.success('Two-factor authentication enabled successfully!')
  }

  const handleGenerateCodes = () => {
    const codes =
      onGenerateBackupCodes?.() ||
      [
        'A94B-20FE',
        'C18X-99Z1',
        '74KQ-810A',
        '92PV-33MN',
        '67TY-44LR',
        '51BW-88XQ',
        '39DF-12KP',
        '88ZL-70VU',
      ]
    setBackupCodes(codes)
  }

  const handleCopyBackupCodes = async () => {
    try {
      await navigator.clipboard.writeText(backupCodes.join('\n'))
      setCopiedBackup(true)
      toast.success('All backup recovery codes copied')
      setTimeout(() => setCopiedBackup(false), 2000)
    } catch {
      toast.error('Failed to copy backup codes')
    }
  }

  const handleDownloadBackupCodes = () => {
    const text = `STRIDER PLATFORM - 2FA BACKUP RECOVERY CODES\nAccount: ${accountName}\nGenerated: ${new Date().toISOString()}\n\n` +
      backupCodes.map((c, i) => `${i + 1}. ${c}`).join('\n') +
      `\n\nKeep these codes stored securely in an encrypted vault.`

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `strider-2fa-backup-codes-${Date.now()}.txt`
    a.click()
    toast.success('Downloaded backup codes .txt file')
  }

  const handleReset = () => {
    setIsVerified(false)
    setOtp('')
    setBackupCodes([])
    toast.info('2FA pairing reset. You can pair again.')
  }

  return (
    <div
      data-slot="two-factor-setup"
      className={cn(
        'flex flex-col gap-5 p-6 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md w-full max-w-lg select-none',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--outline-base)]/40">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="size-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-[var(--ink-primary)]">
                Two-Factor Authentication (2FA)
              </h4>
              {isVerified ? (
                <Badge variant="solid" theme="emerald" size="sm" dot>
                  Enabled & Active
                </Badge>
              ) : (
                <Badge variant="subtle" theme="amber" size="sm">
                  Setup Required
                </Badge>
              )}
            </div>
            <span className="text-[11px] text-[var(--ink-muted)]">
              {accountName} · Time-based One-Time Password (TOTP)
            </span>
          </div>
        </div>

        {isVerified && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] text-[var(--ink-muted)] hover:text-rose-500 underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      {!isVerified ? (
        <div className="flex flex-col gap-4">
          {/* Step 1: Scan QR Code & Secret Key */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[var(--surface-muted)]/60 border border-[var(--outline-base)]/40">
            {/* Hi-Res SVG QR Code Matrix */}
            <div className="relative size-32 rounded-xl bg-white p-2.5 shadow-sm flex items-center justify-center shrink-0 border border-slate-200">
              <svg viewBox="0 0 100 100" className="size-full">
                {/* QR Corner Markers */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="#0f172a" strokeWidth="4" />
                <rect x="11" y="11" width="14" height="14" rx="2" fill="#0f172a" />

                <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="#0f172a" strokeWidth="4" />
                <rect x="75" y="11" width="14" height="14" rx="2" fill="#0f172a" />

                <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="#0f172a" strokeWidth="4" />
                <rect x="11" y="75" width="14" height="14" rx="2" fill="#0f172a" />

                {/* QR Code Pixel Pattern Matrix */}
                <rect x="38" y="10" width="6" height="6" fill="#0f172a" />
                <rect x="50" y="10" width="6" height="6" fill="#0f172a" />
                <rect x="42" y="22" width="6" height="6" fill="#0f172a" />
                <rect x="55" y="22" width="6" height="6" fill="#0f172a" />
                <rect x="10" y="42" width="6" height="6" fill="#0f172a" />
                <rect x="22" y="42" width="6" height="6" fill="#0f172a" />
                <rect x="35" y="38" width="6" height="6" fill="#0f172a" />
                <rect x="48" y="38" width="6" height="6" fill="#0f172a" />
                <rect x="60" y="42" width="6" height="6" fill="#0f172a" />
                <rect x="75" y="42" width="6" height="6" fill="#0f172a" />
                <rect x="88" y="42" width="6" height="6" fill="#0f172a" />
                <rect x="38" y="55" width="6" height="6" fill="#0f172a" />
                <rect x="50" y="55" width="6" height="6" fill="#0f172a" />
                <rect x="62" y="55" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="55" width="6" height="6" fill="#0f172a" />
                <rect x="38" y="72" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="72" width="6" height="6" fill="#0f172a" />
                <rect x="68" y="72" width="6" height="6" fill="#0f172a" />
                <rect x="82" y="72" width="6" height="6" fill="#0f172a" />
                <rect x="45" y="85" width="6" height="6" fill="#0f172a" />
                <rect x="60" y="85" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="85" width="6" height="6" fill="#0f172a" />
              </svg>
            </div>

            <div className="flex flex-col gap-2 min-w-0 w-full">
              <span className="font-bold text-xs text-[var(--ink-primary)]">
                Step 1: Scan QR or enter key manually
              </span>
              <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
                Scan with Google Authenticator, 1Password, or Authy.
              </p>

              {/* Secret Key with Copy Button */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--surface-base)] border border-[var(--outline-base)] font-mono text-xs shadow-2xs">
                <span className="text-[var(--ink-primary)] font-semibold truncate max-w-[160px] tracking-wider">
                  {secretKey}
                </span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="size-6 rounded-md hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer"
                  title="Copy secret key"
                  aria-label="Copy key"
                >
                  {copiedKey ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* Live Simulated Authenticator Device Sync */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--brand-subtle)]/30 border border-[var(--brand-solid)]/30 text-xs">
            <div className="flex items-center gap-2.5">
              <Smartphone className="size-4 text-[var(--brand-solid)]" />
              <div className="flex flex-col">
                <span className="font-bold text-[var(--ink-primary)]">
                  Live Authenticator Stream: <span className="font-mono text-[var(--brand-solid)] tracking-widest">{totpData.code}</span>
                </span>
                <span className="text-[10px] text-[var(--ink-muted)]">
                  Refreshes in {totpData.secondsLeft}s
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              theme="brand"
              size="xs"
              onClick={handleAutoFill}
              prefix={<Zap className="size-3" />}
            >
              Auto-Fill Code
            </Button>
          </div>

          {/* Step 2: Enter 6-digit OTP */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[var(--ink-primary)]">
                Step 2: Enter 6-digit authentication code
              </span>
              <span className="text-[11px] text-[var(--ink-muted)] font-mono">
                {otp.length}/6 digits
              </span>
            </div>

            <div className="flex justify-center py-2">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              variant="solid"
              theme="brand"
              size="md"
              disabled={otp.length !== 6}
              onClick={handleVerify}
              className="w-full"
            >
              Verify & Enable 2FA
            </Button>
          </div>
        </div>
      ) : (
        /* Verified State: Emergency Backup Recovery Codes */
        <div className="flex flex-col gap-4 animate-in fade-in-0 duration-200">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="size-5 shrink-0" />
            <div className="flex flex-col text-xs">
              <span className="font-bold">Two-Factor Authentication is Active</span>
              <span className="text-[11px] opacity-90">
                Your account is protected by hardware/software TOTP credentials.
              </span>
            </div>
          </div>

          {/* Backup Codes Grid */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--ink-primary)]">
                Emergency Backup Recovery Codes
              </span>
              <button
                type="button"
                onClick={handleGenerateCodes}
                className="flex items-center gap-1 text-[11px] text-[var(--brand-solid)] hover:underline cursor-pointer"
              >
                <RefreshCw className="size-3" /> Regenerate
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-[var(--surface-muted)]/80 border border-[var(--outline-base)] font-mono text-xs text-[var(--ink-primary)]">
              {backupCodes.map((c, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl bg-[var(--surface-base)] text-center border border-[var(--outline-base)] shadow-2xs font-semibold tracking-wider"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons for Backup Codes */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              theme="gray"
              size="sm"
              onClick={handleCopyBackupCodes}
              prefix={copiedBackup ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            >
              {copiedBackup ? 'Copied All' : 'Copy Codes'}
            </Button>

            <Button
              variant="solid"
              theme="brand"
              size="sm"
              onClick={handleDownloadBackupCodes}
              prefix={<Download className="size-3.5" />}
            >
              Download (.txt)
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
