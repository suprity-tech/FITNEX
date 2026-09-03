'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button, buttonVariants } from '@/components/ui/button'
import { useFitnex } from '@/components/fitnex-provider'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Workouts', href: '/workouts' },
  { label: 'Challenges', href: '/challenges' },
  { label: 'Progress', href: '/progress' },
  { label: 'Profile', href: '/profile' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { hydrated, session } = useFitnex()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
                isActive(item.href) && 'bg-primary/10 text-primary',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {hydrated && session ? (
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'h-10 gap-1.5 rounded-xl px-4',
              )}
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'h-10 rounded-xl px-4',
                )}
              >
                Log in
              </Link>
              <Link
                href="/onboarding"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'h-10 rounded-xl px-4',
                )}
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-xl md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'rounded-xl px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                  isActive(item.href) && 'bg-primary/10 text-primary',
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {hydrated && session ? (
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'h-11 rounded-xl',
                  )}
                >
                  Go to dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-11 rounded-xl',
                    )}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/onboarding"
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'h-11 rounded-xl',
                    )}
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
