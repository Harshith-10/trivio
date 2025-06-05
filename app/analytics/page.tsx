"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { AnalyticsContent } from "@/components/analytics/analytics-content"

// Mock auth check
const isAuthenticated = () => true

export default function AnalyticsPage() {
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
      <AnalyticsContent />
    </AppLayout>
  )
}
