"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { SettingsContent } from "@/components/settings/settings-content"

// Mock auth check
const isAuthenticated = () => true

export default function SettingsPage() {
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
      <SettingsContent />
    </AppLayout>
  )
}
