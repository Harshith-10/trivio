"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { ProfileContent } from "@/components/profile/profile-content"

// Mock auth check
const isAuthenticated = () => true

export default function ProfilePage() {
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
      <ProfileContent />
    </AppLayout>
  )
}
