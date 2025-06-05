"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { CategoryQuizzes } from "@/components/categories/category-quizzes"

// Mock auth check
const isAuthenticated = () => true

export default function CategoryPage({ params }: { params: { category: string } }) {
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
      <CategoryQuizzes categoryId={params.category} />
    </AppLayout>
  )
}
