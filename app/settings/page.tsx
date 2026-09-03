'use client'

import { useState } from 'react'
import { RequireAuth } from '@/components/require-auth'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFitnex } from '@/components/fitnex-provider'
import { Bell, Moon, Settings } from 'lucide-react'

export default function SettingsPage() {
  const { settings, saveSettings } = useFitnex()
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    saveSettings(localSettings)
  }

  return (
    <RequireAuth>
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold">Settings</h1>
              <p className="mt-2 text-muted-foreground">Personalize your experience</p>
            </div>

            <Card className="rounded-2xl border-border bg-card mb-6">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Bell className="size-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-semibold">Push Notifications</label>
                    <p className="text-sm text-muted-foreground mt-1">Get streak reminders and challenge updates</p>
                  </div>
                  <input type="checkbox" checked={localSettings.notifications} onChange={(e) => setLocalSettings({ ...localSettings, notifications: e.target.checked })} className="rounded" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border bg-card mb-6">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Moon className="size-5" />
                  Theme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['light', 'dark', 'system'].map((theme) => (
                  <Button key={theme} variant={localSettings.theme === theme ? 'default' : 'outline'} className="w-full rounded-lg justify-start" onClick={() => setLocalSettings({ ...localSettings, theme: theme as any })}>
                    {theme === 'light' && '☀️ Light'}
                    {theme === 'dark' && '🌙 Dark'}
                    {theme === 'system' && '⚙️ System'}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border bg-card">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Settings className="size-5" />
                  Units
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['metric', 'imperial'].map((unit) => (
                  <Button key={unit} variant={localSettings.units === unit ? 'default' : 'outline'} className="w-full rounded-lg justify-start" onClick={() => setLocalSettings({ ...localSettings, units: unit as any })}>
                    {unit === 'metric' && '📋 Metric (km, kg)'}
                    {unit === 'imperial' && '📏 Imperial (mi, lbs)'}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full rounded-lg h-12 mt-8">
              Save Settings
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    </RequireAuth>
  )
}