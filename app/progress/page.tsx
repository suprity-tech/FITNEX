'use client'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFitnex } from '@/components/fitnex-provider'
import { WeeklyChart } from '@/components/weekly-chart'
import { StatCard } from '@/components/stat-card'
import { Activity, Flame, TrendingUp } from 'lucide-react'

export default function ProgressPage() {
  const { stats } = useFitnex()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold">Your Progress</h1>
            <p className="mt-2 text-muted-foreground">Watch your momentum build</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 mb-8">
            <StatCard label="Active Minutes" value={stats.activeMinutes.toString()} icon={Activity} variant="success" />
            <StatCard label="Current Streak" value={stats.streak.toString()} icon={Flame} variant="default" />
            <StatCard label="Total Workouts" value={stats.completedCount.toString()} icon={TrendingUp} variant="primary" />
          </div>

          <Card className="rounded-2xl border-border bg-card mb-8">
            <CardHeader>
              <CardTitle className="font-display">This Week's Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <WeeklyChart weekly={stats.weekly} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border bg-card">
            <CardHeader>
              <CardTitle className="font-display">Recent Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.completedCount === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No workouts completed yet. Get started today!</p>
                ) : (
                  Array.from({ length: Math.min(5, stats.completedCount) }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <div>
                        <div className="font-semibold text-sm">Workout {stats.completedCount - i}</div>
                        <div className="text-xs text-muted-foreground">Completed recently</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}