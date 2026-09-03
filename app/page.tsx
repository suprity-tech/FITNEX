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
    icon: Dumbbell,
    title: 'Guided workouts',
    body: 'A library of strength, cardio, HIIT, yoga, core, and mobility sessions with clear, step-by-step instructions.',
  },
  {
    icon: Target,
    title: 'Goal-based plans',
    body: 'Set your goal — lose weight, build strength, boost endurance, or stay active — and get matched sessions.',
  },
  {
    icon: Trophy,
    title: 'Fun challenges',
    body: 'Join community challenges to stay motivated and build habits that actually stick.',
  },
  {
    icon: LineChart,
    title: 'Progress tracking',
    body: 'Watch your completed workouts, active minutes, and streak grow with simple, clear visuals.',
  },
]

const STEPS = [
  {
    icon: UserPlus,
    title: 'Create your profile',
    body: 'Tell us your goal and activity level in a quick onboarding. No commitment, no card needed.',
  },
  {
    icon: Play,
    title: 'Pick a workout',
    body: 'Browse and filter sessions, then follow along with clear exercises and instructions.',
  },
  {
    icon: CalendarCheck,
    title: 'Track your progress',
    body: 'Complete workouts to build your streak and watch your weekly activity climb.',
  },
]

export default function HomePage() {
  const previewWorkouts = WORKOUTS.slice(0, 3)
  const previewChallenge = CHALLENGES[0]

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,var(--color-primary)/12%,transparent)]" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
            <div>
              <Badge variant="success" className="mb-5">
                <Flame className="size-3.5" /> New season, stronger you
              </Badge>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Move better,{' '}
                <span className="text-primary">every single day.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                FITNEX is your all-in-one fitness companion — discover workouts,
                join challenges, and track real progress. Built for momentum,
                designed for everyone.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/onboarding"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'h-12 rounded-xl px-7 text-base',
                  )}
                >
                  Get started
                  <ArrowRight className="size-5" />
                </Link>
                <Link
                  href="/workouts"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-12 rounded-xl px-7 text-base',
                  )}
                >
                  Explore workouts
                </Link>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
                {[
                  { k: '6+', v: 'Workout types' },
                  { k: '4', v: 'Live challenges' },
                  { k: '100%', v: 'Free demo' },
                ].map((s) => (
                  <div key={s.v}>
                    <dt className="font-display text-2xl font-bold text-primary">
                      {s.k}
                    </dt>
                    <dd className="text-xs text-muted-foreground">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
                <img
                  src="/hero.png"
                  alt="Athletes training together at FITNEX"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-5 -left-4 w-44 rounded-2xl sm:-left-6">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-success/15 text-success">
                    <Activity className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold leading-none">
                      248 min
                    </p>
                    <p className="text-xs text-muted-foreground">this week</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Everything you need to build a healthy routine
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Simple tools that keep you consistent — without the overwhelm.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <Card key={f.title} className="rounded-2xl">
                <CardContent className="p-6">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary">
                    <f.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">
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
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge className="mb-4">How it works</Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Get moving in three simple steps
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground font-display text-lg font-bold">
                      {i + 1}
                    </span>
                    <step.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workout preview */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Featured workouts
              </h2>
              <p className="mt-3 text-muted-foreground">
                A taste of what is waiting inside your FITNEX library.
              </p>
            </div>
            <Link
              href="/workouts"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-11 rounded-xl px-5',
              )}
            >
              View all workouts
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewWorkouts.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        </section>

        {/* Challenge + progress preview */}
        <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-2">
          <Card className="overflow-hidden rounded-3xl bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <Badge className="border-transparent bg-primary-foreground/15 text-primary-foreground">
                <Trophy className="size-3.5" /> Challenge
              </Badge>
              <h3 className="mt-4 font-display text-2xl font-bold">
                {previewChallenge.title}
              </h3>
              <p className="mt-2 max-w-sm text-primary-foreground/85">
                {previewChallenge.description}
              </p>
              <div className="mt-6 flex items-center gap-6 text-sm">
                <span>{previewChallenge.duration}</span>
                <span>
                  {previewChallenge.participants.toLocaleString()} joined
                </span>
              </div>
              <Link
                href="/challenges"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'mt-7 h-11 rounded-xl bg-primary-foreground px-5 text-primary hover:bg-primary-foreground/90',
                )}
              >
                Browse challenges
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <Badge variant="success">
                <LineChart className="size-3.5" /> Progress
              </Badge>
              <h3 className="mt-4 font-display text-2xl font-bold">
                See your momentum build
              </h3>
              <p className="mt-2 text-muted-foreground">
                Every completed workout updates your streak, active minutes, and
                weekly activity.
              </p>
              <div className="mt-6 flex items-end gap-2" aria-hidden="true">
                {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-primary/70"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <Link
                href="/progress"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'mt-7 h-11 rounded-xl px-5',
                )}
              >
                View progress
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="rounded-3xl border border-border bg-card px-6 py-14 text-center shadow-sm">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Ready to start your fitness journey?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground text-pretty">
              Create your free demo profile and complete your first workout in
              minutes.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/onboarding"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'h-12 rounded-xl px-7 text-base',
                )}
              >
                Get started
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'h-12 rounded-xl px-7 text-base',
                )}
              >
                I already have an account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
