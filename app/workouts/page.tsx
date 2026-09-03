'use client'

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WorkoutCard } from '@/components/workout-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { WORKOUTS } from '@/lib/data'
import { Search, SlidersHorizontal } from 'lucide-react'

const CATEGORIES = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Mobility']

export default function WorkoutsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = WORKOUTS.filter((w) => {
    const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory
    const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold">Browse Workouts</h1>
            <p className="mt-2 text-muted-foreground">Pick a session and get started</p>
          </div>

          <div className="mb-6 flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search workouts..." className="pl-10 rounded-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Button variant="outline" className="rounded-lg gap-2">
              <SlidersHorizontal className="size-4" />
              Filter
            </Button>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} className="rounded-full whitespace-nowrap" onClick={() => setSelectedCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>

          {filtered.length === 0 && <div className="rounded-2xl border border-border bg-card p-12 text-center"><p className="text-muted-foreground">No workouts found. Try adjusting your filters.</p></div>}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}