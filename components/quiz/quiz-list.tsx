"use client"

import { useState } from "react"
import { QuizCard } from "./quiz-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

// Mock data - replace with actual API call
const mockQuizzes = [
  {
    id: "1",
    title: "World History Basics",
    description: "Test your knowledge of major historical events and figures throughout world history.",
    category: "History",
    difficulty: "Easy" as const,
    duration: 15,
    questions: 20,
    attempts: 1250,
    rating: 4.5,
    tags: ["ancient", "modern", "civilizations"],
  },
  {
    id: "2",
    title: "Advanced Physics",
    description:
      "Challenge yourself with complex physics problems covering mechanics, thermodynamics, and quantum theory.",
    category: "Science",
    difficulty: "Hard" as const,
    duration: 30,
    questions: 25,
    attempts: 890,
    rating: 4.8,
    tags: ["mechanics", "quantum", "thermodynamics"],
  },
  {
    id: "3",
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming language including ES6+ features.",
    category: "Technology",
    difficulty: "Medium" as const,
    duration: 20,
    questions: 30,
    attempts: 2100,
    rating: 4.6,
    tags: ["programming", "web", "javascript"],
  },
  {
    id: "4",
    title: "Classical Music Composers",
    description: "Explore the world of classical composers and their most famous masterpieces.",
    category: "Music",
    difficulty: "Medium" as const,
    duration: 12,
    questions: 15,
    attempts: 650,
    rating: 4.3,
    tags: ["classical", "composers", "symphony"],
  },
  {
    id: "5",
    title: "Olympic Sports Trivia",
    description: "Test your knowledge about Olympic games, sports history, and record holders.",
    category: "Sports",
    difficulty: "Easy" as const,
    duration: 10,
    questions: 18,
    attempts: 1800,
    rating: 4.4,
    tags: ["olympics", "sports", "records"],
  },
  {
    id: "6",
    title: "Modern Art Movements",
    description: "Discover various art movements from impressionism to contemporary art.",
    category: "Arts & Culture",
    difficulty: "Medium" as const,
    duration: 18,
    questions: 22,
    attempts: 420,
    rating: 4.7,
    tags: ["art", "movements", "contemporary"],
  },
]

export function QuizList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("popular")
  const quizzesPerPage = 6

  const filteredQuizzes = mockQuizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.attempts - a.attempts
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id.localeCompare(a.id)
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedQuizzes.length / quizzesPerPage)
  const startIndex = (currentPage - 1) * quizzesPerPage
  const currentQuizzes = sortedQuizzes.slice(startIndex, startIndex + quizzesPerPage)

  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes by title, category, or description..."
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
            <option value="title">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {currentQuizzes.length} of {filteredQuizzes.length} quizzes
        </p>
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm("")}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear search
          </Button>
        )}
      </div>

      {/* Quiz grid */}
      {currentQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No quizzes found matching your search.</p>
          <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
            Clear search
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "trivio-button" : ""}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
