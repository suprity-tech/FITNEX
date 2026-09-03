import Link from 'next/link'
import { Clock, Flame, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import type { Workout } from '@/lib/types'
import { cn } from '@/lib/utils'

const difficultyVariant = {
  Beginner: 'success',
  Intermediate: 'default',
  Advanced: 'secondary',
} as const

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={workout.image || '/placeholder.svg'}
          alt={`${workout.title} workout`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
            {workout.category}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant={difficultyVariant[workout.difficulty]}>
            {workout.difficulty}
          </Badge>
        </div>
        <h3 className="font-display text-lg font-semibold leading-tight">
          {workout.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {workout.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4 text-primary" />
            {workout.duration} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame className="size-4 text-primary" />
            {workout.calories} kcal
          </span>
        </div>
        <Link
          href={`/workouts/${workout.id}`}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'mt-5 h-11 rounded-xl',
          )}
        >
          Start workout
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  )
}
