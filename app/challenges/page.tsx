'use client'

import { useState } from 'react'
import {
  Check,
  ChevronDown,
  Trophy,
  Target,
  Users,
  CalendarDays,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useFitnex } from '@/components/fitnex-provider'
import { CHALLENGES } from '@/lib/data'
import type { Challenge } from '@/lib/types'
import { cn } from '@/lib/utils'

function ChallengeCard({
  challenge,
  joined,
  onToggle,
}: {
  challenge: Challenge
  joined: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const progress = joined ? Math.max(challenge.progress, 10) : challenge.progress

  return (
    <Card className="flex flex-col rounded-3xl">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary">
            <Trophy className="size-6" />
          </span>
          {joined ? (
            <Badge variant="success">
              <Check className="size-3.5" /> Joined
            </Badge>
          ) : (
            <Badge variant="muted">Open</Badge>
          )}
        </div>

        <h2 className="mt-4 font-display text-xl font-bold leading-tight">
          {challenge.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {challenge.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 text-primary" />
            {challenge.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Target className="size-4 text-primary" />
            {challenge.goal}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-primary" />
            {(challenge.participants + (joined ? 1 : 0)).toLocaleString()} joined
          </span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Community progress</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-1 self-start rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          {expanded ? 'Hide details' : 'View details'}
          <ChevronDown
            className={cn(
              'size-4 transition-transform',
              expanded && 'rotate-180',
            )}
          />
        </button>

        {expanded && (
          <div className="mt-3 rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">How it works:</span>{' '}
              Complete the daily goal — {challenge.goal.toLowerCase()} — for the
              full {challenge.duration}. Log your workouts in FITNEX and watch
              the community progress bar climb.
            </p>
            <p className="mt-2">
              {joined
                ? "You're in! Keep showing up each day to keep your streak alive."
                : 'Join to add yourself to the leaderboard and track your streak.'}
            </p>
          </div>
        )}

        <Button
          type="button"
          onClick={onToggle}
          variant={joined ? 'outline' : 'default'}
          className="mt-5 h-11 w-full rounded-xl"
        >
          {joined ? (
            <>
              <Check className="size-4" />
              Joined — Leave challenge
            </>
          ) : (
            <>
              <Trophy className="size-4" />
              Join challenge
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ChallengesPage() {
  const { isChallengeJoined, toggleChallenge } = useFitnex()
  const [notice, setNotice] = useState<string | null>(null)

  const handleToggle = (challenge: Challenge) => {
    const nowJoined = toggleChallenge(challenge.id)
    setNotice(
      nowJoined
        ? `You joined "${challenge.title}"! Keep it up.`
        : `You left "${challenge.title}".`,
    )
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Challenges
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            Join a challenge to stay accountable, build habits, and have fun
            with the FITNEX community.
          </p>
        </div>

        {notice && (
          <Alert tone="success" role="status" className="mt-6">
            {notice}
          </Alert>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((c) => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              joined={isChallengeJoined(c.id)}
              onToggle={() => handleToggle(c)}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
