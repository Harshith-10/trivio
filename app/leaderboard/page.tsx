"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { LeaderboardContent } from "@/components/leaderboard/leaderboard-content"

// Mock auth check
const isAuthenticated = () => true

export default function LeaderboardPage() {
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
      <LeaderboardContent />
    </AppLayout>
  )
}
