'use client'

import Link from 'next/link'
import {
  CalendarCheck,
  Clock,
  Dumbbell,
  Flame,
  History,
  LineChart,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StatCard } from '@/components/stat-card'
import { WeeklyChart } from '@/components/weekly-chart'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useFitnex } from '@/components/fitnex-provider'
import { cn } from '@/lib/utils'

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function ProgressPage() {
  const { hydrated, completed, stats } = useFitnex()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Your progress
            </h1>
            <p className="mt-3 text-muted-foreground text-pretty">
              Every completed workout counts. Here&apos;s how your momentum is
              building.
            </p>
          </div>
          <Link
            href="/workouts"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'h-11 rounded-xl px-5',
            )}
          >
            <Dumbbell className="size-4" />
            Find a workout
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={CalendarCheck}
            label="Completed workouts"
            value={hydrated ? stats.completedCount : 0}
            tone="primary"
          />
          <StatCard
            icon={Clock}
            label="Active minutes"
            value={hydrated ? stats.activeMinutes : 0}
            suffix="min"
            tone="success"
          />
          <StatCard
            icon={Flame}
            label="Current streak"
            value={hydrated ? stats.streak : 0}
            suffix={stats.streak === 1 ? 'day' : 'days'}
            tone="chart3"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card className="rounded-3xl">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <LineChart className="size-5 text-primary" />
                Weekly activity
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Active minutes over the last 7 days
              </p>
              <div className="mt-6">
                <WeeklyChart data={stats.weekly} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <History className="size-5 text-primary" />
                Recent workouts
              </h2>

              {hydrated && completed.length === 0 && (
                <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-12 text-center">
                  <span className="grid size-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
                    <Dumbbell className="size-7" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    No workouts yet
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Complete your first workout and it will show up right here.
                  </p>
                  <Link
                    href="/workouts"
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'mt-5 h-11 rounded-xl px-5',
                    )}
                  >
                    Browse workouts
                  </Link>
                </div>
              )}

              {hydrated && completed.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2">
                  {completed.slice(0, 8).map((c, i) => (
                    <li
                      key={`${c.id}-${c.completedAt}-${i}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-xl bg-success/15 text-success">
                          <CalendarCheck className="size-4.5" />
                        </span>
                        <div>
                          <p className="font-medium leading-tight">{c.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(c.completedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="muted">{c.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {c.duration}m
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
