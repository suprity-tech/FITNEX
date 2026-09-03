'use client'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, MessageCircle } from 'lucide-react'

const FAQS = [
  { q: 'How does FITNEX track my steps?', a: 'FITNEX uses your phone\'s built-in step counter. Just keep your phone in your pocket, and we track everything automatically.' },
  { q: 'Can I lose my streak if I miss a day?', a: 'Yes, but you can freeze your streak during exams or busy periods. Update your daily goal in settings.' },
  { q: 'What can I do with my points?', a: 'Earn points by completing challenges. Trade them for gym perks, canteen discounts, and exclusive merchandise on campus.' },
  { q: 'How do I join a challenge?', a: 'Go to Challenges, browse active ones for your campus, and click "Join Challenge". You\'ll compete with your batch all week.' },
  { q: 'Is my data private?', a: 'Absolutely. Your step data is private. Only your ranking appears on the leaderboard.' },
  { q: 'Can I change my daily step goal?', a: 'Yes! Go to Settings and adjust your goal anytime. Your streak continues even if you lower it.' },
]

export default function HelpPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="mb-12 text-center">
            <HelpCircle className="size-12 mx-auto text-primary mb-4" />
            <h1 className="font-display text-4xl font-bold">Help & Support</h1>
            <p className="mt-2 text-muted-foreground">Find answers to common questions</p>
          </div>

          <div className="space-y-4 mb-12">
            {FAQS.map((faq, i) => (
              <Card key={i} className="rounded-2xl border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-display text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="rounded-2xl border-border bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-primary">
                <MessageCircle className="size-5" />
                Still need help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Can't find your answer? Reach out to our support team and we'll help you out.</p>
              <Button className="rounded-lg">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}