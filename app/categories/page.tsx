"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { CategoriesGrid } from "@/components/categories/categories-grid"

// Mock auth check
const isAuthenticated = () => true

export default function CategoriesPage() {
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
      <CategoriesGrid />
    </AppLayout>
  )
}
