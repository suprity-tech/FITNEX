export function WeeklyChart({
  data,
}: {
  data: { label: string; minutes: number; isToday: boolean }[]
}) {
  const max = Math.max(60, ...data.map((d) => d.minutes))
  return (
    <div className="flex items-end justify-between gap-2 sm:gap-3">
      {data.map((d, i) => {
        const pct = Math.round((d.minutes / max) * 100)
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end">
              <div
                className={`w-full rounded-t-lg transition-all ${
                  d.minutes > 0
                    ? d.isToday
                      ? 'bg-primary'
                      : 'bg-primary/55'
                    : 'bg-muted'
                }`}
                style={{ height: `${Math.max(pct, d.minutes > 0 ? 8 : 4)}%` }}
                title={`${d.minutes} min`}
              />
            </div>
            <span
              className={`text-xs ${
                d.isToday
                  ? 'font-semibold text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {d.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
