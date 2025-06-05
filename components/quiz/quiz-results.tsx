"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, RotateCcw, Share2, Download, CheckCircle, XCircle, Clock, Target, AlertTriangle } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface QuizResultsProps {
  quizId: string
}

// Mock results data
const mockResults = {
  score: 4,
  totalQuestions: 5,
  percentage: 80,
  timeSpent: 12, // minutes
  wasTerminated: false,
  wasTimeUp: false,
  correctAnswers: [
    {
      questionId: "1",
      question: "Which ancient wonder of the world was located in Alexandria?",
      userAnswer: 1,
      correctAnswer: 1,
      isCorrect: true,
      explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.",
    },
    {
      questionId: "2",
      question: "In which year did World War II end?",
      userAnswer: 1,
      correctAnswer: 1,
      isCorrect: true,
      explanation: "World War II ended in 1945 with the surrender of Japan in September.",
    },
    {
      questionId: "3",
      question: "Who was the first person to walk on the moon?",
      userAnswer: 1,
      correctAnswer: 1,
      isCorrect: true,
      explanation: "Neil Armstrong was the first person to walk on the moon during the Apollo 11 mission.",
    },
    {
      questionId: "4",
      question: "Which empire was ruled by Julius Caesar?",
      userAnswer: 0,
      correctAnswer: 1,
      isCorrect: false,
      explanation: "Julius Caesar was a Roman general and statesman who played a critical role in the Roman Republic.",
    },
    {
      questionId: "5",
      question: "The Berlin Wall fell in which year?",
      userAnswer: 2,
      correctAnswer: 2,
      isCorrect: true,
      explanation: "The Berlin Wall fell on November 9, 1989, marking the beginning of German reunification.",
    },
  ],
}

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return "text-green-600"
  if (percentage >= 60) return "text-yellow-600"
  return "text-red-600"
}

const getScoreBadge = (percentage: number, wasTerminated: boolean, wasTimeUp: boolean) => {
  if (wasTerminated) return { text: "Terminated", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" }
  if (wasTimeUp)
    return { text: "Time Up", color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" }
  if (percentage >= 90)
    return { text: "Excellent!", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" }
  if (percentage >= 80)
    return { text: "Great!", color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" }
  if (percentage >= 70)
    return { text: "Good", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" }
  if (percentage >= 60)
    return { text: "Fair", color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" }
  return { text: "Needs Improvement", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" }
}

export function QuizResults({ quizId }: QuizResultsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const searchParams = useSearchParams()

  const wasTerminated = searchParams?.get("terminated") === "true"
  const wasTimeUp = searchParams?.get("timeup") === "true"

  const results = {
    ...mockResults,
    wasTerminated,
    wasTimeUp,
  }

  const scoreBadge = getScoreBadge(results.percentage, wasTerminated, wasTimeUp)

  return (
    <div className="container py-8 max-w-4xl">
      {/* Results Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`p-4 rounded-full ${
                  wasTerminated
                    ? "bg-gradient-to-br from-red-500 to-red-600"
                    : "bg-gradient-to-br from-ocean-500 to-trivio-500"
                }`}
              >
                {wasTerminated ? (
                  <AlertTriangle className="h-8 w-8 text-white" />
                ) : (
                  <Trophy className="h-8 w-8 text-white" />
                )}
              </motion.div>
            </div>
            <CardTitle className="text-3xl">
              {wasTerminated ? "Quiz Terminated" : wasTimeUp ? "Time's Up!" : "Quiz Completed!"}
            </CardTitle>
            {wasTerminated && (
              <p className="text-muted-foreground mt-2">
                Your quiz was terminated due to multiple malpractice violations.
              </p>
            )}
            {wasTimeUp && (
              <p className="text-muted-foreground mt-2">Time ran out, but your answers have been submitted.</p>
            )}
            <div className="flex justify-center mt-4">
              <Badge className={scoreBadge.color}>{scoreBadge.text}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center"
            >
              <div>
                <div className={`text-3xl font-bold ${getScoreColor(results.percentage)}`}>
                  {results.score}/{results.totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${getScoreColor(results.percentage)}`}>{results.percentage}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{results.timeSpent}m</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">#{Math.floor(Math.random() * 100) + 1}</div>
                <div className="text-sm text-muted-foreground">Rank</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6"
            >
              <Progress value={results.percentage} className="h-3" />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-wrap gap-4 mb-8 justify-center"
      >
        <Button className="trivio-button" asChild>
          <Link href={`/quiz/${quizId}`}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Link>
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
        {!wasTerminated && (
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        )}
      </motion.div>

      {/* Detailed Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="review">Review Answers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Correct Answers: {results.score}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span>Incorrect Answers: {results.totalQuestions - results.score}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Time Spent: {results.timeSpent} minutes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-purple-600" />
                    <span>Accuracy: {results.percentage}%</span>
                  </div>
                </div>
                {wasTerminated && (
                  <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-800 dark:text-red-200">Quiz Terminated</span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Your quiz was terminated due to multiple malpractice violations (switching tabs, exiting
                      fullscreen, etc.).
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            {results.correctAnswers.map((answer, index) => (
              <motion.div
                key={answer.questionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                      {answer.isCorrect ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Correct
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                          <XCircle className="mr-1 h-3 w-3" />
                          Incorrect
                        </Badge>
                      )}
                    </div>
                    <p className="text-base text-foreground">{answer.question}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {!answer.isCorrect && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-800">
                          <p className="text-sm text-red-700 dark:text-red-300">
                            <strong>Your answer was incorrect.</strong>
                          </p>
                        </div>
                      )}
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          <strong>Explanation:</strong> {answer.explanation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-8 text-center"
      >
        <Button variant="outline" asChild>
          <Link href="/quizzes">Back to Quizzes</Link>
        </Button>
      </motion.div>
    </div>
  )
}
