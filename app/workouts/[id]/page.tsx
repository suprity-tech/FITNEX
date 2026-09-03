'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  LineChart,
  ListChecks,
  Play,
  Target,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useFitnex } from '@/components/fitnex-provider'
import { getWorkout } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>()
  const workout = getWorkout(params.id)
  const { completeWorkout } = useFitnex()
  const [phase, setPhase] = useState<'idle' | 'active' | 'done'>('idle')

  if (!workout) {
    return (
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <span className="grid size-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
            <Dumbbell className="size-7" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold">
            Workout not found
          </h1>
          <p className="mt-2 max-w-sm text-muted-foreground">
            We couldn&apos;t find that workout. It may have been removed.
          </p>
          <Link
            href="/workouts"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'mt-6 h-11 rounded-xl px-5',
            )}
          >
            <ArrowLeft className="size-4" />
            Back to workouts
          </Link>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const onComplete = () => {
    completeWorkout(workout)
    setPhase('done')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <Link
          href="/workouts"
          className="inline-flex items-center gap-1.5 rounded-lg py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          <ArrowLeft className="size-4" />
          Back to workouts
        </Link>

        {phase === 'done' && (
          <Alert
            tone="success"
            title="Workout complete — nice work!"
            role="status"
            className="mt-4"
          >
            <p>
              We&apos;ve logged {workout.duration} active minutes and
              {' '}
              {workout.calories} kcal to your progress.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/progress"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'h-10 rounded-xl px-4',
                )}
              >
                <LineChart className="size-4" />
                View progress
              </Link>
              <Link
                href="/workouts"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-10 rounded-xl px-4',
                )}
              >
                Back to workouts
              </Link>
            </div>
          </Alert>
        )}

        <div className="mt-4 overflow-hidden rounded-3xl border border-border">
          <div className="relative aspect-[21/9]">
            <img
              src={workout.image || '/placeholder.svg'}
              alt={workout.title}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-background sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-background/90 text-foreground">
                  {workout.category}
                </Badge>
                <Badge className="bg-background/90 text-foreground">
                  {workout.difficulty}
                </Badge>
              </div>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
                {workout.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              {workout.description}
            </p>

            <section className="mt-8">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <ListChecks className="size-5 text-primary" />
                Exercises
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {workout.exercises.map((ex, i) => (
                  <li
                    key={ex.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-7 place-items-center rounded-lg bg-primary/12 text-sm font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="font-medium">{ex.name}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {ex.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <Target className="size-5 text-primary" />
                How to do it
              </h2>
              <ol className="mt-4 flex flex-col gap-3">
                {workout.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Action panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-3xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-muted p-3">
                    <Clock className="mx-auto size-5 text-primary" />
                    <p className="mt-1.5 font-display text-lg font-bold leading-none">
                      {workout.duration}
                    </p>
                    <p className="text-xs text-muted-foreground">minutes</p>
                  </div>
                  <div className="rounded-xl bg-muted p-3">
                    <Flame className="mx-auto size-5 text-primary" />
                    <p className="mt-1.5 font-display text-lg font-bold leading-none">
                      {workout.calories}
                    </p>
                    <p className="text-xs text-muted-foreground">kcal</p>
                  </div>
                  <div className="rounded-xl bg-muted p-3">
                    <Dumbbell className="mx-auto size-5 text-primary" />
                    <p className="mt-1.5 font-display text-lg font-bold leading-none">
                      {workout.exercises.length}
                    </p>
                    <p className="text-xs text-muted-foreground">moves</p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  Focus: <span className="text-foreground">{workout.focus}</span>
                </p>

                {phase === 'idle' && (
                  <Button
                    onClick={() => setPhase('active')}
                    className="mt-5 h-12 w-full rounded-xl text-base"
                  >
                    <Play className="size-5" />
                    Start workout
                  </Button>
                )}

                {phase === 'active' && (
                  <div className="mt-5 flex flex-col gap-3">
                    <Badge
                      variant="success"
                      className="mx-auto animate-pulse px-3 py-1"
                    >
                      Workout in progress…
                    </Badge>
                    <Button
                      onClick={onComplete}
                      className="h-12 w-full rounded-xl text-base"
                    >
                      <CheckCircle2 className="size-5" />
                      Complete workout
                    </Button>
                  </div>
                )}

                {phase === 'done' && (
                  <div className="mt-5 flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-2 rounded-xl bg-success/12 py-3 text-success">
                      <CheckCircle2 className="size-5" />
                      <span className="font-medium">Completed</span>
                    </div>
                    <Link
                      href="/progress"
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'h-11 w-full rounded-xl',
                      )}
                    >
                      View progress
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
