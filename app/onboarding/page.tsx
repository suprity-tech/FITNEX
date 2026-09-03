'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  Dumbbell,
  HeartPulse,
  Loader2,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFitnex } from '@/components/fitnex-provider'
import type { ActivityLevel, FitnessGoal } from '@/lib/types'
import { cn } from '@/lib/utils'

const GOALS: { value: FitnessGoal; icon: React.ElementType; hint: string }[] = [
  { value: 'Lose weight', icon: Zap, hint: 'Burn calories & lean out' },
  { value: 'Build strength', icon: Dumbbell, hint: 'Get stronger & tone up' },
  { value: 'Improve endurance', icon: HeartPulse, hint: 'Boost stamina' },
  { value: 'Stay active', icon: Activity, hint: 'Move & feel good daily' },
]

const LEVELS: { value: ActivityLevel; hint: string }[] = [
  { value: 'Beginner', hint: 'New or returning to exercise' },
  { value: 'Intermediate', hint: 'Work out a few times a week' },
  { value: 'Advanced', hint: 'Train consistently & hard' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { hydrated, profile, saveProfile } = useFitnex()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [goal, setGoal] = useState<FitnessGoal | ''>('')
  const [level, setLevel] = useState<ActivityLevel | ''>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (hydrated && profile) {
      setName(profile.name || '')
      setAge(profile.age === '' ? '' : String(profile.age))
      setGoal(profile.goal || '')
      setLevel(profile.activityLevel || '')
    }
  }, [hydrated, profile])

  const validate = () => {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    const ageNum = Number(age)
    if (!age.trim()) next.age = 'Please enter your age.'
    else if (!Number.isFinite(ageNum) || ageNum < 13 || ageNum > 100)
      next.age = 'Enter an age between 13 and 100.'
    if (!goal) next.goal = 'Choose a fitness goal.'
    if (!level) next.level = 'Choose your activity level.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      saveProfile({
        name: name.trim(),
        age: Number(age),
        goal: goal as FitnessGoal,
        activityLevel: level as ActivityLevel,
      })
      router.push('/dashboard')
    }, 700)
  }

  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="size-4" /> Let&apos;s personalize FITNEX
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us about yourself
          </h1>
          <p className="mt-2 text-muted-foreground">
            We&apos;ll use this to tailor your workout recommendations.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                aria-invalid={!!errors.name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={13}
                max={100}
                placeholder="e.g. 28"
                value={age}
                aria-invalid={!!errors.age}
                onChange={(e) => setAge(e.target.value)}
              />
              {errors.age && (
                <p className="text-sm text-destructive">{errors.age}</p>
              )}
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="text-sm font-medium">Fitness goal</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {GOALS.map((g) => {
                const active = goal === g.value
                return (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setGoal(g.value)}
                    aria-pressed={active}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
                      active
                        ? 'border-primary bg-primary/8 ring-1 ring-primary'
                        : 'border-border bg-background hover:border-primary/40 hover:bg-muted',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-10 shrink-0 place-items-center rounded-xl',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <g.icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-medium">{g.value}</span>
                      <span className="block text-xs text-muted-foreground">
                        {g.hint}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            {errors.goal && (
              <p className="mt-2 text-sm text-destructive">{errors.goal}</p>
            )}
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-sm font-medium">Activity level</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {LEVELS.map((l) => {
                const active = level === l.value
                return (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setLevel(l.value)}
                    aria-pressed={active}
                    className={cn(
                      'rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
                      active
                        ? 'border-primary bg-primary/8 ring-1 ring-primary'
                        : 'border-border bg-background hover:border-primary/40 hover:bg-muted',
                    )}
                  >
                    <span className="block font-medium">{l.value}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {l.hint}
                    </span>
                  </button>
                )
              })}
            </div>
            {errors.level && (
              <p className="mt-2 text-sm text-destructive">{errors.level}</p>
            )}
          </fieldset>

          {Object.keys(errors).length > 0 && (
            <Alert tone="error" role="alert" className="mt-6">
              Please fix the highlighted fields to continue.
            </Alert>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-12 rounded-xl px-6 text-base"
            >
              <ArrowLeft className="size-5" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 rounded-xl px-8 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="size-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
