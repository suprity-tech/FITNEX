'use client'

import Link from 'next/link'
import {
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  LineChart,
  Play,
  Trophy,
  User,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { RequireAuth } from '@/components/require-auth'
import { StatCard } from '@/components/stat-card'
import { WeeklyChart } from '@/components/weekly-chart'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useFitnex } from '@/components/fitnex-provider'
import { WORKOUTS } from '@/lib/data'
import type { FitnessGoal } from '@/lib/types'
import { cn } from '@/lib/utils'

const RECOMMENDED_BY_GOAL: Record<FitnessGoal, string> = {
  'Lose weight': 'hiit-fat-burn',
  'Build strength': 'full-body-strength',
  'Improve endurance': 'morning-cardio',
  'Stay active': 'yoga-flow',
}

const QUICK_LINKS = [
  {
    href: '/workouts',
    label: 'Workouts',
    desc: 'Browse the full library',
    icon: Dumbbell,
  },
  {
    href: '/challenges',
    label: 'Challenges',
    desc: 'Join & stay motivated',
    icon: Trophy,
  },
  {
    href: '/progress',
    label: 'Progress',
    desc: 'Track your momentum',
    icon: LineChart,
  },
  {
    href: '/profile',
    label: 'Profile',
    desc: 'Manage your details',
    icon: User,
  },
]

function DashboardContent() {
  const { profile, stats } = useFitnex()
  const name = profile?.name?.split(' ')[0] || 'there'
  const goal = profile?.goal as FitnessGoal | '' | undefined
  const recommendedId = (goal && RECOMMENDED_BY_GOAL[goal]) || 'full-body-strength'
  const recommended =
    WORKOUTS.find((w) => w.id === recommendedId) ?? WORKOUTS[0]

  const hour = new Date().getHours()
  const timeGreeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">{timeGreeting}</p>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {name}!
            </h1>
            <p className="mt-2 text-muted-foreground">
              {goal
                ? `Let's keep working toward: ${goal.toLowerCase()}.`
                : "Let's get moving today."}
            </p>
          </div>
          <Link
            href="/workouts"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'h-12 rounded-xl px-6 text-base',
            )}
          >
            <Play className="size-5" />
            Start a workout
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Recommended workout */}
          <Card className="overflow-hidden rounded-3xl">
            <div className="grid sm:grid-cols-2">
              <div className="relative min-h-48">
                <img
                  src={recommended.image || '/placeholder.svg'}
                  alt={recommended.title}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <CardContent className="flex flex-col justify-center p-6">
                <Badge variant="success" className="mb-3">
                  Today&apos;s pick
                </Badge>
                <h2 className="font-display text-xl font-bold leading-tight">
                  {recommended.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {recommended.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4 text-primary" />
                    {recommended.duration} min
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Flame className="size-4 text-primary" />
                    {recommended.calories} kcal
                  </span>
                </div>
                <Link
                  href={`/workouts/${recommended.id}`}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'mt-5 h-11 rounded-xl',
                  )}
                >
                  Start now
                  <ArrowRight className="size-4" />
                </Link>
              </CardContent>
            </div>
          </Card>

          {/* Weekly activity */}
          <Card className="rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">
                  This week
                </h2>
                <Link
                  href="/progress"
                  className="inline-flex items-center gap-1 rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  Details
                  <ChevronRight className="size-4" />
                </Link>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {stats.activeMinutes > 0
                  ? `${stats.activeMinutes} active minutes logged`
                  : 'Complete a workout to fill this in'}
              </p>
              <div className="mt-6">
                <WeeklyChart data={stats.weekly} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick links */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                <q.icon className="size-5" />
              </span>
              <p className="mt-4 flex items-center gap-1 font-display font-semibold">
                {q.label}
                <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{q.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  )
}
