"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface QuizTimerProps {
  timeLeft: number
  onTimeUp: () => void
}

export function QuizTimer({ timeLeft, onTimeUp }: QuizTimerProps) {
  const [time, setTime] = useState(timeLeft)

  useEffect(() => {
    if (time <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [time, onTimeUp])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const isLowTime = time <= 300 // 5 minutes
  const isCriticalTime = time <= 60 // 1 minute

  return (
    <div
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-mono ${
        isCriticalTime
          ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300 animate-pulse-glow"
          : isLowTime
            ? "bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300"
            : "bg-muted border-border"
      }`}
    >
      <Clock className="h-4 w-4" />
      <span className="font-medium text-lg">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}
