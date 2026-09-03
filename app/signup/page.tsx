'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react'
import { AuthShell } from '@/components/auth-shell'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFitnex } from '@/components/fitnex-provider'

interface Errors {
  name?: string
  email?: string
  password?: string
  confirm?: string
}

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useFitnex()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const validate = () => {
    const next: Errors = {}
    if (!name.trim()) next.name = 'Name is required.'
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6)
      next.password = 'Use at least 6 characters.'
    if (!confirm) next.confirm = 'Please confirm your password.'
    else if (confirm !== password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    setTimeout(() => {
      signup(email.trim(), name.trim())
      setStatus('success')
      setTimeout(() => router.push('/onboarding'), 700)
    }, 900)
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Set up a free demo profile and start moving in minutes."
    >
      <Alert tone="info" className="mb-6">
        Demo only — your details are saved to this browser with localStorage. No
        real account is created.
      </Alert>

      {status === 'success' ? (
        <Alert tone="success" title="Account created!" role="status">
          Let&apos;s set up your fitness profile…
        </Alert>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Alex Rivera"
              value={name}
              aria-invalid={!!errors.name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              aria-invalid={!!errors.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                className="pr-11"
                value={password}
                aria-invalid={!!errors.password}
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
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirm}
              aria-invalid={!!errors.confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {errors.confirm && (
              <p className="text-sm text-destructive">{errors.confirm}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={status === 'loading'}
            className="h-12 rounded-xl text-base"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Creating account…
              </>
            ) : (
              <>
                <UserPlus className="size-5" />
                Create account
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="rounded font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              Log in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  )
}
