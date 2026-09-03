import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/logo'

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <img
          src="/hero.png"
          alt="Athletes training at FITNEX"
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Logo className="[&_span:last-child]:text-primary-foreground" />
          <div>
            <p className="font-display text-3xl font-bold leading-tight text-balance">
              Small steps, every day, add up to big change.
            </p>
            <p className="mt-4 max-w-sm text-primary-foreground/85">
              Join FITNEX and turn your workouts into lasting momentum.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between">
          <Logo className="lg:hidden" />
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-sm">
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="mt-2 text-muted-foreground text-pretty">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
