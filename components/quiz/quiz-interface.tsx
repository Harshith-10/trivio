"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QuizTimer } from "./quiz-timer"
import { QuestionCard } from "./question-card"
import { QuizSubmissionModal } from "./quiz-submission-modal"
import { ChevronLeft, ChevronRight, Flag, AlertTriangle, Maximize, X, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  image?: string
}

interface QuizInterfaceProps {
  quizId: string
}

// Mock quiz data
const mockQuiz = {
  id: "1",
  title: "World History Basics",
  description: "Test your knowledge of major historical events and figures.",
  duration: 15,
  questions: [
    {
      id: "1",
      question: "Which ancient wonder of the world was located in Alexandria?",
      options: [
        "The Hanging Gardens",
        "The Lighthouse of Alexandria",
        "The Colossus of Rhodes",
        "The Temple of Artemis",
      ],
      correctAnswer: 1,
      explanation:
        "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World and served as a landmark for sailors.",
    },
    {
      id: "2",
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      explanation: "World War II ended in 1945 with the surrender of Japan in September.",
    },
    {
      id: "3",
      question: "Who was the first person to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
      correctAnswer: 1,
      explanation:
        "Neil Armstrong was the first person to walk on the moon during the Apollo 11 mission on July 20, 1969.",
    },
    {
      id: "4",
      question: "Which empire was ruled by Julius Caesar?",
      options: ["Greek Empire", "Roman Empire", "Persian Empire", "Byzantine Empire"],
      correctAnswer: 1,
      explanation: "Julius Caesar was a Roman general and statesman who played a critical role in the Roman Republic.",
    },
    {
      id: "5",
      question: "The Berlin Wall fell in which year?",
      options: ["1987", "1988", "1989", "1990"],
      correctAnswer: 2,
      explanation: "The Berlin Wall fell on November 9, 1989, marking the beginning of German reunification.",
    },
  ],
}

export function QuizInterface({ quizId }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(mockQuiz.duration * 60)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [malpracticeCount, setMalpracticeCount] = useState(0)
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [showMalpracticeDialog, setShowMalpracticeDialog] = useState(false)
  const [malpracticeReason, setMalpracticeReason] = useState("")
  const [isTabVisible, setIsTabVisible] = useState(true)

  const { toast } = useToast()
  const maxMalpracticeAttempts = 3

  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100

  // Force submit quiz
  const handleForceSubmit = useCallback(() => {
    setIsSubmitted(true)
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    window.location.href = `/quiz/${quizId}/results?terminated=true`
  }, [quizId])

  // Handle fullscreen changes
  const handleFullscreenChange = useCallback(() => {
    const isCurrentlyFullscreen = Boolean(document.fullscreenElement)
    setIsFullscreen(isCurrentlyFullscreen)

    if (!isCurrentlyFullscreen && isQuizStarted && !isSubmitted) {
      handleMalpractice("Exited fullscreen mode")
    }
  }, [isQuizStarted, isSubmitted])

  // Handle visibility changes (tab switching)
  const handleVisibilityChange = useCallback(() => {
    const isVisible = !document.hidden
    setIsTabVisible(isVisible)

    if (!isVisible && isQuizStarted && !isSubmitted) {
      handleMalpractice("Switched tabs or minimized window")
    }
  }, [isQuizStarted, isSubmitted])

  // Handle malpractice
  const handleMalpractice = useCallback(
    (reason: string) => {
      setMalpracticeCount((prevCount) => {
        const newCount = prevCount + 1
        setMalpracticeReason(reason)
        setShowMalpracticeDialog(true)

        if (newCount >= maxMalpracticeAttempts) {
          setTimeout(() => handleForceSubmit(), 1000)
        }

        return newCount
      })
    },
    [handleForceSubmit, maxMalpracticeAttempts],
  )

  // Return to fullscreen from malpractice dialog
  const returnToFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen()
      setShowMalpracticeDialog(false)
    } catch (error) {
      toast({
        title: "Fullscreen Required",
        description: "Please enable fullscreen mode to continue the quiz.",
        variant: "destructive",
      })
    }
  }

  // Enter fullscreen
  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen()
      setIsQuizStarted(true)
    } catch (error) {
      toast({
        title: "Fullscreen Required",
        description: "Please enable fullscreen mode to start the quiz.",
        variant: "destructive",
      })
    }
  }

  // Exit fullscreen and end quiz
  const exitQuiz = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    }
    setIsQuizStarted(false)
    window.location.href = "/quizzes"
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Prevent right-click context menu
    const preventContextMenu = (e: MouseEvent) => {
      if (isQuizStarted) {
        e.preventDefault()
      }
    }

    // Prevent certain keyboard shortcuts
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      if (isQuizStarted) {
        // Prevent F12, Ctrl+Shift+I, Ctrl+U, etc.
        if (
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          (e.ctrlKey && e.key === "u") ||
          (e.ctrlKey && e.shiftKey && e.key === "C")
        ) {
          e.preventDefault()
          handleMalpractice("Attempted to use developer tools")
        }
      }
    }

    document.addEventListener("contextmenu", preventContextMenu)
    document.addEventListener("keydown", preventKeyboardShortcuts)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("contextmenu", preventContextMenu)
      document.removeEventListener("keydown", preventKeyboardShortcuts)
    }
  }, [handleFullscreenChange, handleVisibilityChange, isQuizStarted, handleMalpractice])

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    setShowSubmissionModal(true)
  }

  const confirmSubmit = () => {
    setIsSubmitted(true)
    setShowSubmissionModal(false)
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    window.location.href = `/quiz/${quizId}/results`
  }

  const handleTimeUp = () => {
    setIsSubmitted(true)
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    window.location.href = `/quiz/${quizId}/results?timeup=true`
  }

  const answeredQuestions = Object.keys(answers).length
  const currentQuestionData = mockQuiz.questions[currentQuestion]

  // Pre-quiz screen
  if (!isQuizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Button variant="ghost" asChild>
                  <Link href="/quizzes">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Quizzes
                  </Link>
                </Button>
              </div>
              <CardTitle className="text-3xl mb-4">{mockQuiz.title}</CardTitle>
              <p className="text-muted-foreground text-lg">{mockQuiz.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{mockQuiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{mockQuiz.duration}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Max Warnings</div>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important Quiz Rules:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• The quiz will run in fullscreen mode</li>
                    <li>• Switching tabs or exiting fullscreen will be flagged as malpractice</li>
                    <li>• You have maximum 3 warnings before the quiz is terminated</li>
                    <li>• Right-click and developer tools are disabled</li>
                    <li>• Make sure you have a stable internet connection</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="flex gap-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/quizzes">Go Back</Link>
                </Button>
                <Button onClick={enterFullscreen} className="flex-1 quiz-button">
                  <Maximize className="mr-2 h-4 w-4" />
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Quiz interface (fullscreen)
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Malpractice Dialog */}
      <Dialog open={showMalpracticeDialog} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Malpractice Detected!</span>
            </DialogTitle>
            <DialogDescription>
              <strong>Violation:</strong> {malpracticeReason}
              <br />
              <br />
              Warning {malpracticeCount} of {maxMalpracticeAttempts}
              {malpracticeCount >= maxMalpracticeAttempts
                ? ". Your quiz will be terminated."
                : ". Please return to exam mode to continue."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            {malpracticeCount >= maxMalpracticeAttempts ? (
              <Button onClick={handleForceSubmit} variant="destructive">
                End Quiz
              </Button>
            ) : (
              <Button onClick={returnToFullscreen} className="quiz-button">
                <Maximize className="mr-2 h-4 w-4" />
                Return to Exam
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">{mockQuiz.title}</h1>
              <Badge variant="outline">
                Question {currentQuestion + 1} of {mockQuiz.questions.length}
              </Badge>
              <Badge variant="secondary">{answeredQuestions} answered</Badge>
              {malpracticeCount > 0 && (
                <Badge variant="destructive">
                  Warnings: {malpracticeCount}/{maxMalpracticeAttempts}
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <QuizTimer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
              <Button variant="outline" onClick={handleSubmit}>
                <Flag className="mr-2 h-4 w-4" />
                Submit
              </Button>
              <Button variant="ghost" size="icon" onClick={exitQuiz}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 container py-8">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            question={currentQuestionData}
            selectedAnswer={answers[currentQuestionData.id]}
            onAnswerSelect={(answerIndex) => handleAnswerSelect(currentQuestionData.id, answerIndex)}
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="border-t bg-background/95 backdrop-blur">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {mockQuiz.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentQuestion ? "default" : "outline"}
                  size="sm"
                  className={`w-10 h-10 ${
                    answers[mockQuiz.questions[index].id] !== undefined
                      ? "bg-green-100 border-green-300 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:border-green-700 dark:text-green-300"
                      : ""
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <Button onClick={handleNext} disabled={currentQuestion === mockQuiz.questions.length - 1}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <QuizSubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onConfirm={confirmSubmit}
        answeredQuestions={answeredQuestions}
        totalQuestions={mockQuiz.questions.length}
      />
    </div>
  )
}
