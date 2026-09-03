'use client'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CHALLENGES } from '@/lib/data'
import { useFitnex } from '@/components/fitnex-provider'
import { Trophy, Users, Clock } from 'lucide-react'

export default function ChallengesPage() {
  const { joinedChallenges, toggleChallenge } = useFitnex()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold">Weekly Challenges</h1>
            <p className="mt-2 text-muted-foreground">Join your batch and compete for points</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CHALLENGES.map((challenge) => {
              const isJoined = joinedChallenges.includes(challenge.id)

              return (
                <Card key={challenge.id} className="overflow-hidden rounded-2xl border-border bg-card flex flex-col">
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5" />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="font-display text-lg">{challenge.title}</CardTitle>
                        <Badge className="mt-2" variant={isJoined ? 'default' : 'outline'}>
                          {isJoined ? '✓ Joined' : 'Not joined'}
                        </Badge>
                      </div>
                      <Trophy className="size-5 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 flex-1">
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="size-4" />
                        {challenge.duration}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="size-4" />
                        {challenge.participants.toLocaleString()} joined
                      </div>
                    </div>

                    <Button className="w-full rounded-lg mt-auto" variant={isJoined ? 'outline' : 'default'} onClick={() => toggleChallenge(challenge.id)}>
                      {isJoined ? 'Leave Challenge' : 'Join Challenge'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}