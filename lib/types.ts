export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type WorkoutCategory =
  | 'Strength'
  | 'Cardio'
  | 'HIIT'
  | 'Yoga'
  | 'Mobility'
  | 'Core'

export interface Exercise {
  name: string
  detail: string
}

export interface Workout {
  id: string
  title: string
  category: WorkoutCategory
  difficulty: Difficulty
  /** minutes */
  duration: number
  description: string
  /** estimated kcal */
  calories: number
  focus: string
  exercises: Exercise[]
  instructions: string[]
  image: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  /** e.g. "14 days" */
  duration: string
  goal: string
  /** 0-100 percent used for the demo progress bar */
  progress: number
  participants: number
}

export type FitnessGoal =
  | 'Lose weight'
  | 'Build strength'
  | 'Improve endurance'
  | 'Stay active'

export type ActivityLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Session {
  email: string
  createdAt: number
}

export interface Profile {
  name: string
  age: number | ''
  goal: FitnessGoal | ''
  activityLevel: ActivityLevel | ''
}

export interface CompletedWorkout {
  id: string
  title: string
  category: WorkoutCategory
  duration: number
  calories: number
  completedAt: number
}

export type ThemePref = 'light' | 'dark' | 'system'
export type UnitsPref = 'metric' | 'imperial'

export interface Settings {
  notifications: boolean
  theme: ThemePref
  units: UnitsPref
}
