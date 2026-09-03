'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthShell } from '@/components/auth-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFitnex } from '@/components/fitnex-provider'
import { ArrowRight } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const { signup } = useFitnex()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      signup(formData.email, formData.name)
      router.push('/onboarding')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthShell>
      <Card className="rounded-2xl border-border w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="font-display text-2xl font-bold">Create your account</CardTitle>
          <CardDescription>
            Join the students already tracking at FITNEX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="rounded-lg"
              />
            </div>
            <Button type="submit" className="w-full rounded-lg h-11" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
              <ArrowRight className="size-4" />
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  )
}