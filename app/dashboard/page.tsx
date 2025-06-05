"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

// Mock auth check - replace with actual auth logic
const isAuthenticated = () => {
  // For demo purposes, always return true for dashboard
  // In real app, check actual auth state
  return true
}

export default function DashboardPage() {
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
      <DashboardContent />
    </AppLayout>
  )
}
