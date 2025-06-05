"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { QuizList } from "@/components/quiz/quiz-list"
import { QuizFilters } from "@/components/quiz/quiz-filters"

// Mock auth check
const isAuthenticated = () => true

export default function QuizzesPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/")
    }
  }, [router])

  if (!isAuthenticated()) {
    return null
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Quizzes</h1>
        <p className="text-muted-foreground mt-2">
          Discover and take quizzes across various categories and difficulty levels.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <QuizFilters />
        </aside>
        <div className="flex-1">
          <QuizList />
        </div>
      </div>
    </AppLayout>
  )
}
