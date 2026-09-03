import Link from 'next/link'
import { Dumbbell } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  href = '/',
}: {
  className?: string
  href?: string
}) {
  return (
    <Link
      href={href}
      aria-label="FITNEX home"
      className={cn(
        'inline-flex items-center gap-2 rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
        className,
      )}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Dumbbell className="size-5" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        FIT<span className="text-primary">NEX</span>
      </span>
    </Link>
  )
}
