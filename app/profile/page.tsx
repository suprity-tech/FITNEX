'use client'

import { useState } from 'react'
import { RequireAuth } from '@/components/require-auth'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFitnex } from '@/components/fitnex-provider'
import { User, Mail, Zap } from 'lucide-react'

export default function ProfilePage() {
  const { profile, session, saveProfile } = useFitnex()
  const [formData, setFormData] = useState(profile || { name: '', age: '', goal: '', activityLevel: '' })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    saveProfile(formData)
    setIsSaving(false)
  }

  return (
    <RequireAuth>
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold">Your Profile</h1>
              <p className="mt-2 text-muted-foreground">Customize your FITNEX experience</p>
            </div>

            <Card className="rounded-2xl border-border bg-card mb-6">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <User className="size-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="Your age" className="rounded-lg" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border bg-card mb-6">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Zap className="size-5" />
                  Fitness Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Goal</Label>
                  <select value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2">
                    <option value="">Select a goal</option>
                    <option value="lose_weight">Lose weight</option>
                    <option value="build_strength">Build strength</option>
                    <option value="boost_endurance">Boost endurance</option>
                    <option value="stay_active">Stay active</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <select value={formData.activityLevel} onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2">
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border bg-card">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Mail className="size-5" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground text-sm">Email Address</Label>
                  <p className="mt-1 font-semibold">{session?.email}</p>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full rounded-lg h-12 mt-8" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    </RequireAuth>
  )
}