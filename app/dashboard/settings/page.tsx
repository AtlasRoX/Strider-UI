"use client"

import { useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useModal } from "@/contexts/modal-context"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Bell, Lock, User, Eye, Shield, Smartphone, Laptop, LogOut } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    marketingEmails: false,
    twoFactorAuth: false,
    analyticsTracking: true,
    shareData: false,
  })
  const { openConfirm } = useModal()

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    toast.success("Setting updated")
  }

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully")
  }

  const handleChangePassword = () => {
    toast.success("Password change email sent")
  }

  const handleDeleteAccount = async () => {
    const confirmed = await openConfirm({
      title: "Delete Account",
      description:
        "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.",
      confirmText: "Delete Account",
      cancelText: "Cancel",
      variant: "destructive",
    })

    if (confirmed) {
      toast.success("Account deletion initiated")
    }
  }

  const handleLogoutAllDevices = async () => {
    const confirmed = await openConfirm({
      title: "Logout All Devices",
      description: "This will log you out from all devices except this one. You'll need to login again on other devices.",
      confirmText: "Logout All",
      cancelText: "Cancel",
    })

    if (confirmed) {
      toast.success("Logged out from all other devices")
    }
  }

  return (
    <div className="space-y-6 max-w-4xl pb-20 md:pb-8">
      <SectionHeader title="Settings" description="Manage your account preferences and security" />

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Account Settings</CardTitle>
          </div>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" placeholder="UTC-5" defaultValue="UTC-5" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-4 py-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="2fa" className="font-medium text-base cursor-pointer flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Two-Factor Authentication
              </Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch
              id="2fa"
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleToggle("twoFactorAuth")}
              className="shrink-0"
            />
          </div>

          <div className="border-t border-border" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <Button variant="outline" onClick={handleChangePassword}>
                Change Password
              </Button>
            </div>
          </div>

          <div className="border-t border-border" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <Laptop className="h-4 w-4" />
                  Active Sessions
                </p>
                <p className="text-sm text-muted-foreground">3 devices currently logged in</p>
              </div>
              <Button variant="outline" onClick={handleLogoutAllDevices}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Customize how the dashboard looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-4 py-3">
            <div className="flex-1 space-y-1">
              <Label className="font-medium text-base">Theme</Label>
              <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-4 py-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="email-notifications" className="font-medium text-base cursor-pointer">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
              className="shrink-0"
            />
          </div>

          <div className="border-t border-border" />

          <div className="flex items-start justify-between gap-4 py-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="push-notifications" className="font-medium text-base cursor-pointer">
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggle("pushNotifications")}
              className="shrink-0"
            />
          </div>

          <div className="border-t border-border" />

          <div className="flex items-start justify-between gap-4 py-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="weekly-digest" className="font-medium text-base cursor-pointer">
                Weekly Digest
              </Label>
              <p className="text-sm text-muted-foreground">Get a summary of activity every week</p>
            </div>
            <Switch
              id="weekly-digest"
              checked={settings.weeklyDigest}
              onCheckedChange={() => handleToggle("weeklyDigest")}
              className="shrink-0"
            />
          </div>

          <div className="border-t border-border" />

          <div className="flex items-start justify-between gap-4 py-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="marketing-emails" className="font-medium text-base cursor-pointer">
                Marketing Emails
              </Label>
              <p className="text-sm text-muted-foreground">Receive updates about new features</p>
            </div>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle("marketingEmails")}
              className="shrink-0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <CardTitle>Privacy</CardTitle>
          </div>
          <CardDescription>Control your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-4 py-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="analytics" className="font-medium text-base cursor-pointer">
                Analytics Tracking
              </Label>
              <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
            </div>
            <Switch
              id="analytics"
              checked={settings.analyticsTracking}
              onCheckedChange={() => handleToggle("analyticsTracking")}
              className="shrink-0"
            />
          </div>

          <div className="border-t border-border" />

          <div className="flex items-start justify-between gap-4 py-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="share-data" className="font-medium text-base cursor-pointer">
                Share Data with Partners
              </Label>
              <p className="text-sm text-muted-foreground">Allow sharing anonymized data with trusted partners</p>
            </div>
            <Switch
              id="share-data"
              checked={settings.shareData}
              onCheckedChange={() => handleToggle("shareData")}
              className="shrink-0"
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <div className="flex-1">
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount} className="shrink-0">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
