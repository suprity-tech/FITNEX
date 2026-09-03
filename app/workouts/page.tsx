'use client'

import { useMemo, useState } from 'react'
import { RotateCcw, Search, SearchX } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WorkoutCard } from '@/components/workout-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { DIFFICULTIES, WORKOUTS, WORKOUT_CATEGORIES } from '@/lib/data'

export default function WorkoutsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return WORKOUTS.filter((w) => {
      const matchesQuery =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q)
      const matchesCategory = category === 'all' || w.category === category
      const matchesDifficulty =
        difficulty === 'all' || w.difficulty === difficulty
      return matchesQuery && matchesCategory && matchesDifficulty
    })
  }, [query, category, difficulty])

  const hasFilters =
    query.trim() !== '' || category !== 'all' || difficulty !== 'all'

  const reset = () => {
    setQuery('')
    setCategory('all')
    setDifficulty('all')
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Workout library
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            Find the right session for today. Filter by category and difficulty,
            then jump straight in.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search workouts…"
                className="pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              {WORKOUT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">All levels</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            disabled={!hasFilters}
            className="h-11 rounded-xl px-4"
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
        </div>

        {/* Results */}
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {WORKOUTS.length} workouts
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <SearchX className="size-7" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold">
              No workouts match your filters
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Try a different search term or clear your filters to see the full
              library.
            </p>
            <Button
              type="button"
              onClick={reset}
              className="mt-6 h-11 rounded-xl px-5"
            >
              <RotateCcw className="size-4" />
              Reset filters
            </Button>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
