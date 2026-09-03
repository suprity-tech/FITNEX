'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react'
import { AuthShell } from '@/components/auth-shell'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFitnex } from '@/components/fitnex-provider'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useFitnex()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  )
  const [formError, setFormError] = useState('')
  const [forgot, setForgot] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const validate = () => {
    const next: { email?: string; password?: string } = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6)
      next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return
    setStatus('loading')
    // Simulate a network request for the demo auth.
    setTimeout(() => {
      login(email.trim())
      setStatus('success')
      setTimeout(() => router.push('/dashboard'), 700)
    }, 900)
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to jump back into your workouts and challenges."
    >
      <Alert tone="info" className="mb-6">
        This is <strong className="text-foreground">demo authentication</strong>
        . No real backend — any valid-looking email and a 6+ character password
        will sign you in.
      </Alert>

      {status === 'success' ? (
        <Alert tone="success" title="Logged in!" role="status">
          Taking you to your dashboard…
        </Alert>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          {formError && (
            <Alert tone="error" role="alert">
              {formError}
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => setForgot(true)}
                className="rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                className="pr-11"
                value={password}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
                className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              >
                {showPw ? (
                  <EyeOff className="size-4.5" />
                ) : (
                  <Eye className="size-4.5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password}
              </p>
            )}
          </div>

          {forgot && (
            <Alert tone="info" title="Demo reminder" role="status">
              Password recovery is not available in this demo. Just enter any
              email and a 6+ character password to continue.
            </Alert>
          )}

          <Button
            type="submit"
            disabled={status === 'loading'}
            className="h-12 rounded-xl text-base"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Logging in…
              </>
            ) : (
              <>
                <CheckCircle2 className="size-5" />
                Log in
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            New to FITNEX?{' '}
            <Link
              href="/signup"
              className="rounded font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              Create an account
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  )
}
