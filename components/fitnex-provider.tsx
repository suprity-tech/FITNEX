'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type {
  CompletedWorkout,
  Profile,
  Session,
  Settings,
  Workout,
} from '@/lib/types'

const KEYS = {
  session: 'fitnex_session',
  profile: 'fitnex_profile',
  completed: 'fitnex_completed',
  challenges: 'fitnex_challenges',
  settings: 'fitnex_settings',
}

const DEFAULT_SETTINGS: Settings = {
  notifications: true,
  theme: 'system',
  units: 'metric',
}

interface Stats {
  completedCount: number
  activeMinutes: number
  streak: number
  /** last 7 days, oldest first: { label, minutes } */
  weekly: { label: string; minutes: number; isToday: boolean }[]
}

interface FitnexContextValue {
  hydrated: boolean
  session: Session | null
  profile: Profile | null
  completed: CompletedWorkout[]
  joinedChallenges: string[]
  settings: Settings
  stats: Stats
  login: (email: string) => void
  signup: (email: string, name: string) => void
  logout: () => void
  saveProfile: (profile: Profile) => void
  completeWorkout: (workout: Workout) => void
  toggleChallenge: (id: string) => boolean
  isChallengeJoined: (id: string) => boolean
  saveSettings: (settings: Settings) => void
}

const FitnexContext = createContext<FitnexContextValue | null>(null)

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

function startOfDay(ts: number): number {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function computeStats(completed: CompletedWorkout[]): Stats {
  const completedCount = completed.length
  const activeMinutes = completed.reduce((sum, c) => sum + c.duration, 0)

  // Distinct completed days
  const days = new Set(completed.map((c) => startOfDay(c.completedAt)))
  const DAY = 86_400_000
  let streak = 0
  const today = startOfDay(Date.now())
  // Streak counts back from today (or yesterday if nothing today yet).
  let cursor = days.has(today) ? today : today - DAY
  if (days.has(cursor)) {
    while (days.has(cursor)) {
      streak++
      cursor -= DAY
    }
  }

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const weekly = Array.from({ length: 7 }).map((_, i) => {
    const dayTs = today - (6 - i) * DAY
    const minutes = completed
      .filter((c) => startOfDay(c.completedAt) === dayTs)
      .reduce((sum, c) => sum + c.duration, 0)
    return {
      label: labels[new Date(dayTs).getDay()],
      minutes,
      isToday: dayTs === today,
    }
  })

  return { completedCount, activeMinutes, streak, weekly }
}

export function FitnexProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [completed, setCompleted] = useState<CompletedWorkout[]>([])
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([])
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  useEffect(() => {
    setSession(read<Session | null>(KEYS.session, null))
    setProfile(read<Profile | null>(KEYS.profile, null))
    setCompleted(read<CompletedWorkout[]>(KEYS.completed, []))
    setJoinedChallenges(read<string[]>(KEYS.challenges, []))
    setSettings(read<Settings>(KEYS.settings, DEFAULT_SETTINGS))
    setHydrated(true)
  }, [])

  // Apply theme whenever it changes.
  useEffect(() => {
    if (!hydrated) return
    const apply = () => {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      const isDark =
        settings.theme === 'dark' ||
        (settings.theme === 'system' && prefersDark)
      document.documentElement.classList.toggle('dark', isDark)
    }
    apply()
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    if (settings.theme === 'system') {
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [settings.theme, hydrated])

  const login = useCallback((email: string) => {
    const s: Session = { email, createdAt: Date.now() }
    setSession(s)
    write(KEYS.session, s)
  }, [])

  const signup = useCallback((email: string, name: string) => {
    const s: Session = { email, createdAt: Date.now() }
    setSession(s)
    write(KEYS.session, s)
    const existing = read<Profile | null>(KEYS.profile, null)
    const p: Profile = existing ?? {
      name,
      age: '',
      goal: '',
      activityLevel: '',
    }
    if (!existing) {
      setProfile(p)
      write(KEYS.profile, p)
    }
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    try {
      window.localStorage.removeItem(KEYS.session)
    } catch {
      /* ignore */
    }
  }, [])

  const saveProfile = useCallback((p: Profile) => {
    setProfile(p)
    write(KEYS.profile, p)
  }, [])

  const completeWorkout = useCallback((workout: Workout) => {
    setCompleted((prev) => {
      const next: CompletedWorkout[] = [
        {
          id: workout.id,
          title: workout.title,
          category: workout.category,
          duration: workout.duration,
          calories: workout.calories,
          completedAt: Date.now(),
        },
        ...prev,
      ]
      write(KEYS.completed, next)
      return next
    })
  }, [])

  const toggleChallenge = useCallback((id: string) => {
    let joined = false
    setJoinedChallenges((prev) => {
      const has = prev.includes(id)
      const next = has ? prev.filter((c) => c !== id) : [...prev, id]
      joined = !has
      write(KEYS.challenges, next)
      return next
    })
    return joined
  }, [])

  const isChallengeJoined = useCallback(
    (id: string) => joinedChallenges.includes(id),
    [joinedChallenges],
  )

  const saveSettings = useCallback((s: Settings) => {
    setSettings(s)
    write(KEYS.settings, s)
  }, [])

  const stats = useMemo(() => computeStats(completed), [completed])

  const value: FitnexContextValue = {
    hydrated,
    session,
    profile,
    completed,
    joinedChallenges,
    settings,
    stats,
    login,
    signup,
    logout,
    saveProfile,
    completeWorkout,
    toggleChallenge,
    isChallengeJoined,
    saveSettings,
  }

  return (
    <FitnexContext.Provider value={value}>{children}</FitnexContext.Provider>
  )
}

export function useFitnex() {
  const ctx = useContext(FitnexContext)
  if (!ctx) throw new Error('useFitnex must be used within FitnexProvider')
  return ctx
}
