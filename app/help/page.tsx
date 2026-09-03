'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ChevronDown,
  Dumbbell,
  Home,
  LineChart,
  Mail,
  Rocket,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Alert } from '@/components/ui/alert'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Is FITNEX free to use?',
    a: 'Yes. FITNEX is a hackathon demo, so everything is completely free. There are no payments, subscriptions, or real accounts involved.',
  },
  {
    q: 'Is this real authentication?',
    a: 'No. Login and signup use mock authentication stored in your browser with localStorage. Any valid-looking email and a 6+ character password will work.',
  },
  {
    q: 'Where is my data stored?',
    a: 'All your data — profile, completed workouts, joined challenges, and settings — lives only in this browser via localStorage. Clearing your browser data will reset it.',
  },
  {
    q: 'Does FITNEX give medical advice?',
    a: 'No. FITNEX is for general wellness and motivation only. It does not provide medical diagnosis or treatment, and it makes no health guarantees. Consult a professional before starting any new program.',
  },
  {
    q: 'How is my streak calculated?',
    a: 'Your streak counts the number of consecutive days you have completed at least one workout, ending today (or yesterday if you have not worked out yet today).',
  },
]

const GUIDES = [
  {
    icon: Rocket,
    title: 'Getting started',
    body: 'Tap "Get started" to create a demo profile and complete a short onboarding. Then head to your dashboard to see your personalized recommendation.',
    href: '/onboarding',
    cta: 'Start onboarding',
  },
  {
    icon: Dumbbell,
    title: 'Finding workouts',
    body: 'Browse the workout library and filter by category or difficulty. Open any workout, tap "Start workout", then "Complete workout" when you finish.',
    href: '/workouts',
    cta: 'Browse workouts',
  },
  {
    icon: LineChart,
    title: 'Understanding progress',
    body: 'Completing workouts updates your completed count, active minutes, streak, and weekly activity chart on the progress page.',
    href: '/progress',
    cta: 'View progress',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 rounded-2xl"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          className={cn(
            'size-5 shrink-0 text-muted-foreground transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
          {a}
        </p>
      )}
    </div>
  )
}

export default function HelpPage() {
  const router = useRouter()
  const [contacted, setContacted] = useState(false)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 rounded-lg py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <Home className="size-4" />
            Home
          </Link>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Help &amp; FAQ
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground text-pretty">
          Everything you need to know about using FITNEX. Still stuck? Reach out
          and we&apos;ll point you in the right direction.
        </p>

        {/* Guides */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {GUIDES.map((g) => (
            <Card key={g.title} className="flex flex-col rounded-2xl">
              <CardContent className="flex flex-1 flex-col p-6">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                  <g.icon className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold">
                  {g.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {g.body}
                </p>
                <Link
                  href={g.href}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'mt-4 h-10 rounded-xl',
                  )}
                >
                  {g.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-5 flex flex-col gap-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-10">
          <Card className="rounded-3xl bg-card">
            <CardContent className="flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold">
                  Still need help?
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Contact our (demo) support team and we&apos;ll get back to
                  you.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href="mailto:support@fitnex.demo?subject=FITNEX%20Support"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-11 rounded-xl px-5',
                  )}
                >
                  <Mail className="size-4" />
                  Email support
                </a>
                <Button
                  onClick={() => setContacted(true)}
                  className="h-11 rounded-xl px-5"
                >
                  Contact support
                </Button>
              </div>
            </CardContent>
          </Card>
          {contacted && (
            <Alert tone="success" role="status" className="mt-4">
              Thanks for reaching out! This is a demo, so no message was
              actually sent — but a real FITNEX team would reply within 24
              hours.
            </Alert>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
