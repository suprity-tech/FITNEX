import * as React from 'react'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type AlertTone = 'info' | 'success' | 'error'

const toneStyles: Record<AlertTone, string> = {
  info: 'border-primary/20 bg-primary/8 text-foreground [&_svg]:text-primary',
  success:
    'border-success/25 bg-success/10 text-foreground [&_svg]:text-success',
  error:
    'border-destructive/25 bg-destructive/10 text-foreground [&_svg]:text-destructive',
}

const toneIcon: Record<AlertTone, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  error: AlertCircle,
}

export function Alert({
  tone = 'info',
  title,
  children,
  className,
  role = 'status',
}: {
  tone?: AlertTone
  title?: string
  children?: React.ReactNode
  className?: string
  role?: 'status' | 'alert'
}) {
  const Icon = toneIcon[tone]
  return (
    <div
      role={role}
      className={cn(
        'flex items-start gap-3 rounded-xl border p-3.5 text-sm',
        toneStyles[tone],
        className,
      )}
    >
      <Icon className="mt-0.5 size-4.5 shrink-0" />
      <div className="min-w-0">
        {title && <p className="font-medium">{title}</p>}
        {children && (
          <div className={cn(title && 'mt-0.5', 'text-muted-foreground')}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
