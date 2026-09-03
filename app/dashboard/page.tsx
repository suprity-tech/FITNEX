'use client'

import { useFitnex } from '@/components/fitnex-provider'
import { RequireAuth } from '@/components/require-auth'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WeeklyChart } from '@/components/weekly-chart'
import { StatCard } from '@/components/stat-card'
import { Activity, Flame, Trophy, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const { profile, stats } = useFitnex()

  return (
    <RequireAuth>
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold">Welcome back, {profile?.name || 'Student'}!</h1>
              <p className="mt-2 text-muted-foreground">Keep that streak going 🔥</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <StatCard label="Active Minutes" value={stats.activeMinutes.toString()} icon={Activity} variant="success" />
              <StatCard label="Current Streak" value={stats.streak.toString()} icon={Flame} variant="default" />
              <StatCard label="Workouts Done" value={stats.completedCount.toString()} icon={Trophy} variant="primary" />
              <StatCard label="Rank" value="#7" icon={TrendingUp} variant="secondary" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3 mb-8">
              <Card className="lg:col-span-2 rounded-2xl border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-display">Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyChart weekly={stats.weekly} />
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-display text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/workouts" className="block">
                    <div className="rounded-lg border border-border bg-background p-3 hover:bg-muted transition cursor-pointer">
                      <div className="font-semibold text-sm">Start Workout</div>
                      <div className="text-xs text-muted-foreground">Pick from library</div>
                    </div>
                  </Link>
                  <Link href="/challenges" className="block">
                    <div className="rounded-lg border border-border bg-background p-3 hover:bg-muted transition cursor-pointer">
                      <div className="font-semibold text-sm">Join Challenge</div>
                      <div className="text-xs text-muted-foreground">This week's live</div>
                    </div>
                  </Link>
                  <Link href="/profile" className="block">
                    <div className="rounded-lg border border-border bg-background p-3 hover:bg-muted transition cursor-pointer">
                      <div className="font-semibold text-sm">Edit Profile</div>
                      <div className="text-xs text-muted-foreground">Update goals</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-2xl border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display">Campus Leaderboard</CardTitle>
                <Badge>Top 10</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-primary">#{i}</span>
                        <div>
                          <div className="font-semibold text-sm">Student {i}</div>
                          <div className="text-xs text-muted-foreground">{4500 - i * 100} steps this week</div>
                        </div>
                      </div>
                      <Badge variant={i === 7 ? 'default' : 'outline'}>{i === 7 ? 'You' : `${4500 - i * 100}pts`}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <SiteFooter />
      </div>
    </RequireAuth>
  )
}