import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  Dumbbell,
  Flame,
  LineChart,
  Play,
  Target,
  Trophy,
  UserPlus,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WorkoutCard } from '@/components/workout-card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CHALLENGES, WORKOUTS } from '@/lib/data'
import { cn } from '@/lib/utils'

const FEATURES = [
  {
    icon: Activity,
    title: 'Steps count themselves',
    body: 'Phone in your pocket is enough. Calories and active minutes come along with it.',
  },
  {
    icon: Target,
    title: 'Goals that fit your timetable',
    body: 'Start at 6,000. Raise it on light weeks, drop it during exams — without losing your streak.',
  },
  {
    icon: Trophy,
    title: 'Badges and a campus board',
    body: 'Weekly challenges with your batch. Points you can trade for canteen and gym perks.',
  },
]

const STEPS = [
  {
    icon: UserPlus,
    title: 'Sign up in a minute',
    body: 'Name, email, password. That is the whole form.',
  },
  {
    icon: Play,
    title: 'Tell us how you move',
    body: 'Fitness level, what you like doing, how long you have. Or skip it — you can set it later.',
  },
  {
    icon: CalendarCheck,
    title: 'Walk. Watch the ring close.',
    body: 'Everything after that is streaks, badges and bragging rights.',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,var(--color-primary)/12%,transparent)]" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-32">
            <div>
              <Badge variant="outline" className="mb-5">
                <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2"></span>
                Built for student life
              </Badge>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                The walk to class<br />
                already counts.<br />
                <span className="text-primary">Start counting.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                FITNEX turns steps between lectures into streaks, badges and a campus leaderboard. No gym membership required.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/onboarding"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'h-12 rounded-lg px-7 text-base',
                  )}
                >
                  Get started — it's free
                  <ArrowRight className="size-5" />
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-12 rounded-lg px-7 text-base',
                  )}
                >
                  I already have an account
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Join the students already tracking at your campus
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <svg width="100" height="100" viewBox="0 0 106 106" className="absolute inset-0">
                      <circle cx="53" cy="53" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-border" />
                      <circle cx="53" cy="53" r="45" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="283" strokeDashoffset="56" transform="rotate(-90 53 53)" className="text-primary" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-xl font-bold">4,820</span>
                      <span className="text-xs text-muted-foreground">steps</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <div className="font-display text-lg font-bold text-primary">12 days</div>
                      <div className="text-sm text-muted-foreground">active in a row</div>
                    </div>
                    <div className="h-px bg-border" />
                    <div>
                      <div className="font-display text-lg font-bold">#7</div>
                      <div className="text-sm text-muted-foreground">on your campus board</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              What you get
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} className="rounded-2xl border-border bg-card">
                <CardContent className="p-6">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                    <f.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance text-center mb-16">
              How it works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground font-display font-bold text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm">{step.body}</p>
                  {i < STEPS.length - 1 && (
                    <div className="absolute top-5 -right-4 hidden md:block text-2xl text-primary/30">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="rounded-2xl border border-border bg-card px-8 py-16 text-center">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight text-balance">
              Your first streak<br />
              starts tomorrow.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground text-pretty">
              Create your free profile and track your first steps in minutes. No credit card needed.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/onboarding"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'h-12 rounded-lg px-7 text-base',
                )}
              >
                Get started
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}