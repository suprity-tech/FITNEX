export type FitnessLevel = 'Beginner' | 'Regular' | 'Advanced'
export type Gender = 'Male' | 'Female' | 'Other'

export interface Session {
  email: string
  createdAt: number
}

export interface Profile {
  name: string
  email: string
  age: number | ''
  gender: Gender | ''
  level: FitnessLevel | ''
  activities: string[]
  minutesPerDay: number
  heightCm: number
  weightKg: number
  units: 'metric' | 'imperial'
}

export interface DayStat {
  label: string
  steps: number
  hitGoal: boolean
  isToday: boolean
}

export interface Badge {
  id: string
  name: string
  icon: string
  tint: 'lime' | 'flame'
  earned: boolean
}

export interface Reward {
  id: string
  name: string
  icon: string
  cost: number
}

export interface Challenge {
  id: string
  name: string
  description: string
  icon: string
  tint: 'lime' | 'flame'
  joined: number
  points: number
}

export interface LeaderRow {
  id: string
  name: string
  initials: string
  steps: number
  isYou?: boolean
}
