'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useFitnex } from '@/components/fitnex-provider'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { hydrated, session } = useFitnex()
  const router = useRouter()

  useEffect(() => {
    if (hydrated && !session) {
      router.replace('/login')
    }
  }, [hydrated, session, router])

  if (!hydrated || !session) {
    return (
      <div className="grid min-h-svh place-items-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-sm">Loading your FITNEX space…</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
