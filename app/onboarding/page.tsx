'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useFitnex } from '@/components/fitnex-provider'
import { ArrowRight, Check } from 'lucide-react'

const STEPS = [
  { id: 1, title: 'Your Goal', description: 'What do you want to achieve?' },
  { id: 2, title: 'Activity Level', description: 'How active are you currently?' },
  { id: 3, title: 'Done!', description: 'Ready to start your streak' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { profile, saveProfile } = useFitnex()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(profile || { goal: '', activityLevel: '' })

  const handleNext = () => {
    if (step === 2) {
      saveProfile({ ...profile!, ...formData })
      router.push('/dashboard')
    } else {
      setStep(step + 1)
    }
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {STEPS.map((s) => (
                <div key={s.id} className={`h-1 flex-1 rounded-full transition-colors ${s.id < step ? 'bg-primary' : s.id === step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Step {step} of {STEPS.length - 1}</p>
          </div>

          <Card className="rounded-2xl border-border bg-card">
            <CardHeader>
              <CardTitle className="font-display text-3xl">{STEPS[step - 1].title}</CardTitle>
              <p className="mt-2 text-muted-foreground">{STEPS[step - 1].description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-3">
                  {['lose_weight', 'build_strength', 'boost_endurance', 'stay_active'].map((goal) => (
                    <Button key={goal} variant={formData.goal === goal ? 'default' : 'outline'} className="w-full rounded-lg h-12 justify-start" onClick={() => setFormData({ ...formData, goal })}>
                      <Check className={`size-4 mr-2 ${formData.goal === goal ? 'opacity-100' : 'opacity-0'}`} />
                      {goal === 'lose_weight' && 'Lose weight'}
                      {goal === 'build_strength' && 'Build strength'}
                      {goal === 'boost_endurance' && 'Boost endurance'}
                      {goal === 'stay_active' && 'Stay active'}
                    </Button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <Button key={level} variant={formData.activityLevel === level ? 'default' : 'outline'} className="w-full rounded-lg h-12 justify-start" onClick={() => setFormData({ ...formData, activityLevel: level })}>
                      <Check className={`size-4 mr-2 ${formData.activityLevel === level ? 'opacity-100' : 'opacity-0'}`} />
                      {level === 'beginner' && 'Beginner'}
                      {level === 'intermediate' && 'Intermediate'}
                      {level === 'advanced' && 'Advanced'}
                    </Button>
                  ))}
                </div>
              )}

              {step === 3 && <div className="text-center space-y-4"><div className="text-6xl">🎉</div><p className="text-muted-foreground">You're all set! Ready to start your fitness journey with FITNEX?</p></div>}

              <Button onClick={handleNext} className="w-full rounded-lg h-12" disabled={step < 3 && !formData.goal && !formData.activityLevel}>
                {step === 3 ? 'Go to Dashboard' : 'Continue'}
                <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}