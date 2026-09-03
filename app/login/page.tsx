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

export default function LoginPage() {
  const router = useRouter()
  const { login } = useFitnex()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      login(email)
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthShell>
      <Card className="rounded-2xl border-border w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="font-display text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Log in to continue your streak
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <Button type="submit" className="w-full rounded-lg h-11" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
              <ArrowRight className="size-4" />
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  )
}