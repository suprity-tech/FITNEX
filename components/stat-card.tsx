import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  tone = 'primary',
}: {
  icon: React.ElementType
  label: string
  value: string | number
  suffix?: string
  tone?: 'primary' | 'success' | 'chart3'
}) {
  const toneClass = {
    primary: 'bg-primary/12 text-primary',
    success: 'bg-success/15 text-success',
    chart3: 'bg-chart-3/15 text-chart-3',
  }[tone]

  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-center gap-4 p-5">
        <span
          className={cn('grid size-12 place-items-center rounded-2xl', toneClass)}
        >
          <Icon className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-2xl font-bold leading-none">
            {value}
            {suffix && (
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                {suffix}
              </span>
            )}
          </p>
          <p className="mt-1 truncate text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
