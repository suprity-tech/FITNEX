import type { Badge, Challenge, DayStat, LeaderRow, Reward } from './types'

/** Steps per day for the current week (Mon-Sun). Sunday is "today". */
export const WEEK_STEPS: DayStat[] = [
  { label: 'Mon', steps: 5150, hitGoal: false, isToday: false },
  { label: 'Tue', steps: 7120, hitGoal: true, isToday: false },
  { label: 'Wed', steps: 4390, hitGoal: false, isToday: false },
  { label: 'Thu', steps: 6830, hitGoal: true, isToday: false },
  { label: 'Fri', steps: 3880, hitGoal: false, isToday: false },
  { label: 'Sat', steps: 8630, hitGoal: true, isToday: false },
  { label: 'Sun', steps: 4820, hitGoal: false, isToday: true },
]

export const DEFAULT_GOAL = 6000
export const GOAL_MIN = 2000
export const GOAL_MAX = 15000
export const GOAL_STEP = 500

export const ACTIVITY_OPTIONS = [
  'Walking',
  'Gym',
  'Yoga',
  'Sports',
  'Cycling',
  'Running',
  'Dance',
]

export const BADGES: Badge[] = [
  { id: 'first-10k', name: 'First 10K', icon: 'footprints', tint: 'lime', earned: true },
  { id: '7-day', name: '7-day streak', icon: 'flame', tint: 'flame', earned: true },
  { id: 'early-riser', name: 'Early riser', icon: 'sunrise', tint: 'lime', earned: true },
  { id: 'explorer', name: 'Campus explorer', icon: 'map-pin', tint: 'lime', earned: true },
  { id: 'hydration', name: 'Hydration hero', icon: 'droplet', tint: 'lime', earned: true },
  { id: 'weekend', name: 'Weekend warrior', icon: 'bar-chart', tint: 'lime', earned: true },
  { id: '30-day', name: '30-day streak', icon: 'lock', tint: 'lime', earned: false },
  { id: 'century', name: 'Century club', icon: 'lock', tint: 'lime', earned: false },
  { id: 'marathon', name: 'Marathon month', icon: 'lock', tint: 'lime', earned: false },
]

export const REWARDS: Reward[] = [
  { id: 'coffee', name: 'Canteen coffee', icon: 'coffee', cost: 500 },
  { id: 'gym-pass', name: 'Gym day pass', icon: 'dumbbell', cost: 1200 },
  { id: 'tee', name: 'FITNEX tee', icon: 'shirt', cost: 3000 },
]

export const CHALLENGES: Challenge[] = [
  {
    id: '8am-club',
    name: '8 AM Club',
    description: '1,000 steps before your first class, five days running.',
    icon: 'sunrise',
    tint: 'lime',
    joined: 86,
    points: 300,
  },
  {
    id: 'lap-campus',
    name: 'Lap the Campus',
    description: 'Cover 25 km on foot in seven days. Any pace.',
    icon: 'map-pin',
    tint: 'lime',
    joined: 140,
    points: 400,
  },
  {
    id: 'hostel-vs-hostel',
    name: 'Hostel vs Hostel',
    description: "Your block's average against everyone else's. Bragging rights only.",
    icon: 'swords',
    tint: 'flame',
    joined: 312,
    points: 500,
  },
]

export const ACTIVE_CHALLENGE = {
  id: '10k-week',
  name: '10K Steps Week',
  daysLeft: 4,
  progress: 17330,
  target: 70000,
  joined: 214,
  rank: 31,
}

export const LEADERBOARD: LeaderRow[] = [
  { id: '1', name: 'Dev M.', initials: 'DM', steps: 61900 },
  { id: '2', name: 'Riya N.', initials: 'RN', steps: 58140 },
  { id: '3', name: 'Sana P.', initials: 'SP', steps: 55020 },
  { id: '4', name: 'Ananya T.', initials: 'AT', steps: 52300 },
  { id: '5', name: 'Karan J.', initials: 'KJ', steps: 48760 },
  { id: '6', name: 'Meher F.', initials: 'MF', steps: 44110 },
  { id: '7', name: 'You', initials: 'AK', steps: 40820, isYou: true },
  { id: '8', name: 'Vikram S.', initials: 'VS', steps: 39540 },
  { id: '9', name: 'Nikita B.', initials: 'NB', steps: 37220 },
  { id: '10', name: 'Ishan R.', initials: 'IR', steps: 35900 },
]

/** Weekly report card data (previous completed week). */
export const REPORT = {
  week: 'Week 12 · 18–24 Aug',
  grade: 'A−',
  summary:
    'Your biggest week yet. Goal hit on 4 of 7 days, and 6,500 steps more than last week.',
  totalSteps: 42600,
  dailyAverage: 6086,
  calories: 2760,
  activeTime: '5h 42m',
  days: [
    { label: 'Mon', steps: 4600, hitGoal: false },
    { label: 'Tue', steps: 6400, hitGoal: true },
    { label: 'Wed', steps: 3900, hitGoal: false },
    { label: 'Thu', steps: 6100, hitGoal: true },
    { label: 'Fri', steps: 3500, hitGoal: false },
    { label: 'Sat', steps: 7700, hitGoal: true },
    { label: 'Sun', steps: 5900, hitGoal: true },
  ],
}

export function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'AK'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
