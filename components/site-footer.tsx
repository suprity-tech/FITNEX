import Link from 'next/link'
import { Logo } from '@/components/logo'

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Workouts', href: '/workouts' },
      { label: 'Challenges', href: '/challenges' },
      { label: 'Progress', href: '/progress' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log in', href: '/login' },
      { label: 'Sign up', href: '/signup' },
      { label: 'Profile', href: '/profile' },
      { label: 'Settings', href: '/settings' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help & FAQ', href: '/help' },
      { label: 'Get started', href: '/onboarding' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              FITNEX helps you discover workouts, join challenges, and track
              your progress — one healthy day at a time.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FITNEX. A hackathon demo — mock data,
            no real accounts.
          </p>
          <p className="text-xs text-muted-foreground">
            Not medical advice. For general wellness only.
          </p>
        </div>
      </div>
    </footer>
  )
}
