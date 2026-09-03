'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CalendarCheck,
  Clock,
  Flame,
  LogOut,
  Pencil,
  Save,
  Settings as SettingsIcon,
  User,
  X,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { RequireAuth } from '@/components/require-auth'
import { StatCard } from '@/components/stat-card'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { useFitnex } from '@/components/fitnex-provider'
import type { ActivityLevel, FitnessGoal } from '@/lib/types'
import { cn } from '@/lib/utils'

const GOALS: FitnessGoal[] = [
  'Lose weight',
  'Build strength',
  'Improve endurance',
  'Stay active',
]
const LEVELS: ActivityLevel[] = ['Beginner', 'Intermediate', 'Advanced']

function ProfileContent() {
  const router = useRouter()
  const { profile, session, stats, saveProfile, logout } = useFitnex()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const [name, setName] = useState(profile?.name ?? '')
  const [age, setAge] = useState(
    profile?.age === undefined || profile?.age === '' ? '' : String(profile.age),
  )
  const [goal, setGoal] = useState<FitnessGoal | ''>(profile?.goal ?? '')
  const [level, setLevel] = useState<ActivityLevel | ''>(
    profile?.activityLevel ?? '',
  )
  const [error, setError] = useState('')

  const startEdit = () => {
    setName(profile?.name ?? '')
    setAge(profile?.age === '' || profile?.age == null ? '' : String(profile.age))
    setGoal(profile?.goal ?? '')
    setLevel(profile?.activityLevel ?? '')
    setError('')
    setSaved(false)
    setEditing(true)
  }

  const onSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    const ageNum = Number(age)
    if (age !== '' && (!Number.isFinite(ageNum) || ageNum < 13 || ageNum > 100)) {
      setError('Enter an age between 13 and 100.')
      return
    }
    saveProfile({
      name: name.trim(),
      age: age === '' ? '' : ageNum,
      goal,
      activityLevel: level,
    })
    setEditing(false)
    setSaved(true)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const details = [
    { label: 'Name', value: profile?.name || '—' },
    { label: 'Age', value: profile?.age ? String(profile.age) : '—' },
    { label: 'Fitness goal', value: profile?.goal || 'Not set' },
    { label: 'Activity level', value: profile?.activityLevel || 'Not set' },
  ]

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Profile
        </h1>
        <p className="mt-3 text-muted-foreground">
          Manage your fitness details and account.
        </p>

        {saved && (
          <Alert tone="success" role="status" className="mt-6">
            Your profile has been updated.
          </Alert>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card className="rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <span className="grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-bold">
                  {(profile?.name || 'U').charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-bold leading-tight">
                    {profile?.name || 'Your name'}
                  </h2>
                  <p className="truncate text-sm text-muted-foreground">
                    {session?.email}
                  </p>
                  {profile?.goal && (
                    <Badge variant="success" className="mt-1.5">
                      {profile.goal}
                    </Badge>
                  )}
                </div>
              </div>

              {!editing ? (
                <>
                  <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                    {details.map((d) => (
                      <div key={d.label} className="bg-card p-4">
                        <dt className="text-xs text-muted-foreground">
                          {d.label}
                        </dt>
                        <dd className="mt-1 font-medium">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Button
                    onClick={startEdit}
                    className="mt-6 h-11 rounded-xl px-5"
                  >
                    <Pencil className="size-4" />
                    Edit profile
                  </Button>
                </>
              ) : (
                <form onSubmit={onSave} noValidate className="mt-6">
                  {error && (
                    <Alert tone="error" role="alert" className="mb-4">
                      {error}
                    </Alert>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        min={13}
                        max={100}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="goal">Fitness goal</Label>
                      <Select
                        id="goal"
                        value={goal}
                        onChange={(e) =>
                          setGoal(e.target.value as FitnessGoal | '')
                        }
                      >
                        <option value="">Select a goal</option>
                        {GOALS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="level">Activity level</Label>
                      <Select
                        id="level"
                        value={level}
                        onChange={(e) =>
                          setLevel(e.target.value as ActivityLevel | '')
                        }
                      >
                        <option value="">Select a level</option>
                        {LEVELS.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button type="submit" className="h-11 rounded-xl px-5">
                      <Save className="size-4" />
                      Save changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditing(false)}
                      className="h-11 rounded-xl px-5"
                    >
                      <X className="size-4" />
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <StatCard
              icon={CalendarCheck}
              label="Completed workouts"
              value={stats.completedCount}
              tone="primary"
            />
            <StatCard
              icon={Clock}
              label="Active minutes"
              value={stats.activeMinutes}
              suffix="min"
              tone="success"
            />
            <StatCard
              icon={Flame}
              label="Current streak"
              value={stats.streak}
              suffix={stats.streak === 1 ? 'day' : 'days'}
              tone="chart3"
            />

            <Card className="rounded-2xl">
              <CardContent className="flex flex-col gap-3 p-5">
                <Link
                  href="/settings"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-11 w-full justify-start rounded-xl px-4',
                  )}
                >
                  <SettingsIcon className="size-4" />
                  Settings
                </Link>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="h-11 w-full justify-start rounded-xl px-4"
                >
                  <LogOut className="size-4" />
                  Log out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfileContent />
    </RequireAuth>
  )
}
