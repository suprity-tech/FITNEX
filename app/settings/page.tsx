'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bell, Ruler, Save, Palette, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { RequireAuth } from '@/components/require-auth'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useFitnex } from '@/components/fitnex-provider'
import type { Settings, ThemePref, UnitsPref } from '@/lib/types'
import { cn } from '@/lib/utils'

function Segmented<T extends string>({
  value,
  options,
  onChange,
  name,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  name: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className="inline-flex rounded-xl border border-border bg-muted p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
            value === o.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function SettingsContent() {
  const router = useRouter()
  const { settings, session, saveSettings } = useFitnex()
  const [draft, setDraft] = useState<Settings>(settings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft(settings)
  }, [settings])

  const update = <K extends keyof Settings>(key: K, val: Settings[K]) => {
    setDraft((d) => ({ ...d, [key]: val }))
    setSaved(false)
  }

  const onSave = () => {
    saveSettings(draft)
    setSaved(true)
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 rounded-lg py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Settings
        </h1>
        <p className="mt-3 text-muted-foreground">
          Customize your FITNEX experience. Preferences are saved to this
          browser.
        </p>

        {saved && (
          <Alert tone="success" role="status" className="mt-6">
            Your settings have been saved.
          </Alert>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {/* Notifications */}
          <Card className="rounded-2xl">
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Bell className="size-5" />
                </span>
                <div>
                  <Label htmlFor="notif" className="text-base">
                    Workout reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get nudges to keep your streak alive.
                  </p>
                </div>
              </div>
              <Switch
                id="notif"
                aria-label="Toggle workout reminders"
                checked={draft.notifications}
                onCheckedChange={(v) => update('notifications', v)}
              />
            </CardContent>
          </Card>

          {/* Theme */}
          <Card className="rounded-2xl">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Palette className="size-5" />
                </span>
                <div>
                  <p className="text-base font-medium">Appearance</p>
                  <p className="text-sm text-muted-foreground">
                    Choose light, dark, or match your system.
                  </p>
                </div>
              </div>
              <Segmented<ThemePref>
                name="Theme"
                value={draft.theme}
                onChange={(v) => update('theme', v)}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'system', label: 'System' },
                ]}
              />
            </CardContent>
          </Card>

          {/* Units */}
          <Card className="rounded-2xl">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Ruler className="size-5" />
                </span>
                <div>
                  <p className="text-base font-medium">Units</p>
                  <p className="text-sm text-muted-foreground">
                    Metric (kg, km) or imperial (lb, mi).
                  </p>
                </div>
              </div>
              <Segmented<UnitsPref>
                name="Units"
                value={draft.units}
                onChange={(v) => update('units', v)}
                options={[
                  { value: 'metric', label: 'Metric' },
                  { value: 'imperial', label: 'Imperial' },
                ]}
              />
            </CardContent>
          </Card>

          {/* Demo account status */}
          <Card className="rounded-2xl">
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-success/15 text-success">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-base font-medium">Account status</p>
                  <p className="text-sm text-muted-foreground">
                    {session?.email ?? 'Demo user'}
                  </p>
                </div>
              </div>
              <Badge variant="success">Demo account</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="h-11 rounded-xl px-5"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Button onClick={onSave} className="h-11 rounded-xl px-6">
            <Save className="size-4" />
            Save settings
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <RequireAuth>
      <SettingsContent />
    </RequireAuth>
  )
}
