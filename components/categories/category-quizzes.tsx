"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { QuizCard } from "@/components/quiz/quiz-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, ArrowLeft, TrendingUp, Users, Clock, Trophy } from "lucide-react"
import Link from "next/link"

interface CategoryQuizzesProps {
  categoryId: string
}

// Mock data for category-specific quizzes
const categoryData = {
  science: {
    name: "Science",
    description: "Explore the wonders of physics, chemistry, biology, and more",
    totalQuizzes: 156,
    totalAttempts: 45230,
    averageScore: 78,
    quizzes: [
      {
        id: "sci-1",
        title: "Quantum Physics Fundamentals",
        description: "Dive into the mysterious world of quantum mechanics and particle physics.",
        category: "Science",
        difficulty: "Hard" as const,
        duration: 25,
        questions: 20,
        attempts: 1250,
        rating: 4.7,
        tags: ["quantum", "physics", "particles"],
      },
      {
        id: "sci-2",
        title: "Human Anatomy Basics",
        description: "Test your knowledge of the human body systems and organs.",
        category: "Science",
        difficulty: "Medium" as const,
        duration: 15,
        questions: 25,
        attempts: 2100,
        rating: 4.5,
        tags: ["anatomy", "biology", "human body"],
      },
      {
        id: "sci-3",
        title: "Chemical Elements & Compounds",
        description: "Master the periodic table and chemical reactions.",
        category: "Science",
        difficulty: "Medium" as const,
        duration: 20,
        questions: 30,
        attempts: 1800,
        rating: 4.6,
        tags: ["chemistry", "elements", "reactions"],
      },
    ],
  },
  music: {
    name: "Music",
    description: "From classical symphonies to modern beats, test your musical knowledge",
    totalQuizzes: 45,
    totalAttempts: 18750,
    averageScore: 69,
    quizzes: [
      {
        id: "mus-1",
        title: "Classical Composers",
        description: "Identify famous classical composers and their masterpieces.",
        category: "Music",
        difficulty: "Medium" as const,
        duration: 12,
        questions: 15,
        attempts: 650,
        rating: 4.3,
        tags: ["classical", "composers", "symphony"],
      },
      {
        id: "mus-2",
        title: "Rock & Pop Legends",
        description: "Test your knowledge of rock and pop music history.",
        category: "Music",
        difficulty: "Easy" as const,
        duration: 10,
        questions: 20,
        attempts: 1200,
        rating: 4.4,
        tags: ["rock", "pop", "legends"],
      },
    ],
  },
}

export function CategoryQuizzes({ categoryId }: CategoryQuizzesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")

  const category = categoryData[categoryId as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Category not found</h1>
          <p className="text-muted-foreground mt-2">The category you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/categories">Back to Categories</Link>
          </Button>
        </div>
      </div>
    )
  }

  const filteredQuizzes = category.quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{category.description}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-trivio-600" />
              <span className="text-2xl font-bold">{category.totalQuizzes}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-ocean-600" />
              <span className="text-2xl font-bold">{category.totalAttempts.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold">{category.averageScore}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold">18m</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes in this category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <QuizCard quiz={quiz} />
          </motion.div>
        ))}
      </motion.div>

      {filteredQuizzes.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-muted-foreground">No quizzes found in this category.</p>
          <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
            Clear search
          </Button>
        </motion.div>
      )}
    </div>
  )
}
