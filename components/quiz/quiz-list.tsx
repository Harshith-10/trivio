"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { QuizCard } from "./quiz-card"

// Mock quiz data with different types
const mockQuizzes = [
  {
    id: "1",
    title: "World History Basics",
    description: "Test your knowledge of major historical events and figures from ancient times to modern era.",
    category: "History",
    difficulty: "Medium" as const,
    duration: 15,
    questions: 5,
    attempts: 12543,
    rating: 4.2,
    tags: ["Ancient History", "World Wars", "Civilizations"],
    type: "general",
  },
  {
    id: "programming",
    title: "Programming Fundamentals",
    description: "Test your coding skills with algorithmic challenges and programming concepts.",
    category: "Technology",
    difficulty: "Hard" as const,
    duration: 60,
    questions: 3,
    attempts: 8934,
    rating: 4.5,
    tags: ["Algorithms", "Data Structures", "Problem Solving"],
    type: "programming",
  },
  {
    id: "3",
    title: "Basic Mathematics",
    description: "Fundamental mathematical concepts including algebra, geometry, and arithmetic operations.",
    category: "Mathematics",
    difficulty: "Easy" as const,
    duration: 20,
    questions: 10,
    attempts: 15678,
    rating: 4.0,
    tags: ["Algebra", "Geometry", "Arithmetic"],
    type: "general",
  },
  {
    id: "4",
    title: "Science Fundamentals",
    description: "Basic concepts in physics, chemistry, and biology for general knowledge.",
    category: "Science",
    difficulty: "Medium" as const,
    duration: 25,
    questions: 8,
    attempts: 9876,
    rating: 4.3,
    tags: ["Physics", "Chemistry", "Biology"],
    type: "general",
  },
  {
    id: "5",
    title: "Literature Classics",
    description: "Test your knowledge of classic literature, famous authors, and literary movements.",
    category: "Arts & Culture",
    difficulty: "Hard" as const,
    duration: 30,
    questions: 12,
    attempts: 5432,
    rating: 4.1,
    tags: ["Classic Literature", "Authors", "Poetry"],
    type: "general",
  },
  {
    id: "6",
    title: "Web Development Basics",
    description: "HTML, CSS, JavaScript fundamentals and modern web development practices.",
    category: "Technology",
    difficulty: "Medium" as const,
    duration: 45,
    questions: 6,
    attempts: 7654,
    rating: 4.4,
    tags: ["HTML", "CSS", "JavaScript"],
    type: "programming",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function QuizList() {
  const [sortBy, setSortBy] = useState("popular")

  const sortedQuizzes = [...mockQuizzes].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.attempts - a.attempts
      case "rating":
        return b.rating - a.rating
      case "difficulty":
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      case "duration":
        return a.duration - b.duration
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Quizzes</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="difficulty">Difficulty</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sortedQuizzes.map((quiz) => (
          <motion.div key={quiz.id} variants={itemVariants}>
            <QuizCard quiz={quiz} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
