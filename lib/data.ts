import type { Challenge, Workout } from './types'

export const WORKOUTS: Workout[] = [
  {
    id: 'full-body-strength',
    title: 'Full-Body Strength Builder',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 45,
    description:
      'A balanced strength session hitting every major muscle group with compound movements to build lean, functional power.',
    calories: 380,
    focus: 'Full body',
    exercises: [
      { name: 'Goblet Squat', detail: '4 sets x 10 reps' },
      { name: 'Push-Ups', detail: '4 sets x 12 reps' },
      { name: 'Dumbbell Row', detail: '4 sets x 10 reps each side' },
      { name: 'Romanian Deadlift', detail: '3 sets x 10 reps' },
      { name: 'Overhead Press', detail: '3 sets x 10 reps' },
      { name: 'Plank Hold', detail: '3 sets x 45 seconds' },
    ],
    instructions: [
      'Warm up with 5 minutes of light cardio and dynamic stretches.',
      'Move through each exercise with controlled form, resting 60–90 seconds between sets.',
      'Keep your core braced and breathe out on exertion.',
      'Finish with a 5 minute cooldown and full-body stretch.',
    ],
    image: '/workouts/strength.png',
  },
  {
    id: 'hiit-fat-burn',
    title: 'HIIT Fat Burn Blast',
    category: 'HIIT',
    difficulty: 'Advanced',
    duration: 30,
    description:
      'High-intensity intervals designed to spike your heart rate, torch calories, and boost your metabolism long after you finish.',
    calories: 420,
    focus: 'Conditioning',
    exercises: [
      { name: 'Burpees', detail: '40s work / 20s rest' },
      { name: 'Mountain Climbers', detail: '40s work / 20s rest' },
      { name: 'Jump Squats', detail: '40s work / 20s rest' },
      { name: 'High Knees', detail: '40s work / 20s rest' },
      { name: 'Plank Jacks', detail: '40s work / 20s rest' },
    ],
    instructions: [
      'Warm up thoroughly for 5 minutes — HIIT is demanding on cold muscles.',
      'Complete all 5 exercises back to back, then rest 60 seconds. That is one round.',
      'Repeat for 4 rounds, pushing hard during work intervals.',
      'Cool down and hydrate well afterwards.',
    ],
    image: '/workouts/hiit.png',
  },
  {
    id: 'morning-cardio',
    title: 'Morning Cardio Kickstart',
    category: 'Cardio',
    difficulty: 'Beginner',
    duration: 25,
    description:
      'A low-impact cardio flow to wake up your body, get the blood flowing, and set a positive tone for your day.',
    calories: 220,
    focus: 'Endurance',
    exercises: [
      { name: 'Marching in Place', detail: '3 minutes' },
      { name: 'Step Touch', detail: '3 minutes' },
      { name: 'Low-Impact Jacks', detail: '3 sets x 45 seconds' },
      { name: 'Standing Knee Lifts', detail: '3 sets x 45 seconds' },
      { name: 'Side Steps', detail: '3 sets x 45 seconds' },
    ],
    instructions: [
      'Start slow and gradually raise your pace over the first 5 minutes.',
      'Keep movements light and rhythmic — focus on steady breathing.',
      'Stay light on your feet to protect your joints.',
      'Finish with gentle stretching for your calves and hips.',
    ],
    image: '/workouts/cardio.png',
  },
  {
    id: 'core-crusher',
    title: 'Core Crusher Circuit',
    category: 'Core',
    difficulty: 'Intermediate',
    duration: 20,
    description:
      'A focused core circuit that strengthens your abs, obliques, and lower back for better posture and stability.',
    calories: 180,
    focus: 'Core & stability',
    exercises: [
      { name: 'Crunches', detail: '3 sets x 20 reps' },
      { name: 'Bicycle Twists', detail: '3 sets x 20 reps' },
      { name: 'Leg Raises', detail: '3 sets x 15 reps' },
      { name: 'Russian Twists', detail: '3 sets x 30 reps' },
      { name: 'Forearm Plank', detail: '3 sets x 60 seconds' },
    ],
    instructions: [
      'Engage your core before every rep — quality over speed.',
      'Keep your lower back pressed toward the floor during leg work.',
      'Rest 30–45 seconds between exercises.',
      'Breathe steadily; never hold your breath through a set.',
    ],
    image: '/workouts/core.png',
  },
  {
    id: 'yoga-flow',
    title: 'Restorative Yoga Flow',
    category: 'Yoga',
    difficulty: 'Beginner',
    duration: 35,
    description:
      'A calming flow that improves flexibility, releases tension, and helps you reconnect breath with movement.',
    calories: 150,
    focus: 'Flexibility & calm',
    exercises: [
      { name: 'Cat–Cow', detail: '2 minutes' },
      { name: 'Downward Dog', detail: '5 breaths x 4' },
      { name: 'Warrior II', detail: '5 breaths each side' },
      { name: 'Seated Forward Fold', detail: '2 minutes' },
      { name: 'Supine Twist', detail: '2 minutes each side' },
      { name: 'Savasana', detail: '5 minutes' },
    ],
    instructions: [
      'Find a quiet space and roll out your mat.',
      'Move slowly, matching each transition to an inhale or exhale.',
      'Never force a stretch — ease into each pose.',
      'End with several minutes of stillness in Savasana.',
    ],
    image: '/workouts/yoga.png',
  },
  {
    id: 'mobility-reset',
    title: 'Mobility & Recovery Reset',
    category: 'Mobility',
    difficulty: 'Beginner',
    duration: 18,
    description:
      'A gentle mobility routine to loosen tight joints, improve range of motion, and speed up recovery between hard sessions.',
    calories: 110,
    focus: 'Recovery',
    exercises: [
      { name: 'Hip Circles', detail: '2 sets x 10 each side' },
      { name: 'Thoracic Rotations', detail: '2 sets x 10 each side' },
      { name: 'Ankle Rocks', detail: '2 sets x 12 each side' },
      { name: 'Shoulder Pass-Throughs', detail: '2 sets x 10' },
      { name: 'World’s Greatest Stretch', detail: '5 reps each side' },
    ],
    instructions: [
      'Move slowly and stay within a comfortable range of motion.',
      'Breathe deeply to help your muscles relax into each movement.',
      'Spend extra time on any area that feels especially tight.',
      'Perfect as a warm-up or an active recovery day.',
    ],
    image: '/workouts/mobility.png',
  },
]

export const CHALLENGES: Challenge[] = [
  {
    id: '7-day-jumpstart',
    title: '7-Day Jumpstart',
    description:
      'Build momentum with one short workout every day for a week. Perfect for kickstarting a new routine.',
    duration: '7 days',
    goal: 'Complete 7 workouts',
    progress: 40,
    participants: 1284,
  },
  {
    id: '10k-steps',
    title: '10K Steps Streak',
    description:
      'Hit 10,000 steps a day for two weeks straight and feel your everyday energy climb.',
    duration: '14 days',
    goal: '10,000 steps daily',
    progress: 65,
    participants: 3921,
  },
  {
    id: 'core-30',
    title: 'Core Strong 30',
    description:
      'A 30-day core challenge that adds a little more each day to build a rock-solid midsection.',
    duration: '30 days',
    goal: 'Daily core circuit',
    progress: 20,
    participants: 872,
  },
  {
    id: 'mindful-mornings',
    title: 'Mindful Mornings',
    description:
      'Start each day with a short mobility or yoga flow for 10 days to build a calmer, more focused routine.',
    duration: '10 days',
    goal: '10 morning flows',
    progress: 50,
    participants: 1547,
  },
]

export const WORKOUT_CATEGORIES = [
  'Strength',
  'Cardio',
  'HIIT',
  'Yoga',
  'Mobility',
  'Core',
] as const

export const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'] as const

export function getWorkout(id: string): Workout | undefined {
  return WORKOUTS.find((w) => w.id === id)
}
