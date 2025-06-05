"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Brain,
  Globe,
  Atom,
  Calculator,
  Palette,
  Music,
  Trophy,
  Gamepad2,
  Search,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

const categories = [
  {
    id: "science",
    name: "Science",
    description: "Physics, Chemistry, Biology, Astronomy and more scientific disciplines",
    icon: Atom,
    quizCount: 156,
    totalAttempts: 45230,
    averageScore: 78,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    gradient: "from-blue-500 to-cyan-500",
    subcategories: ["Physics", "Chemistry", "Biology", "Astronomy", "Earth Science"],
  },
  {
    id: "history",
    name: "History",
    description: "World history, ancient civilizations, wars, and historical figures",
    icon: Globe,
    quizCount: 89,
    totalAttempts: 32150,
    averageScore: 72,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    gradient: "from-amber-500 to-orange-500",
    subcategories: ["Ancient History", "Modern History", "World Wars", "Civilizations", "Historical Figures"],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Algebra, geometry, calculus, statistics and mathematical concepts",
    icon: Calculator,
    quizCount: 124,
    totalAttempts: 38940,
    averageScore: 65,
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    gradient: "from-green-500 to-emerald-500",
    subcategories: ["Algebra", "Geometry", "Calculus", "Statistics", "Number Theory"],
  },
  {
    id: "arts-culture",
    name: "Arts & Culture",
    description: "Literature, painting, sculpture, cultural studies and artistic movements",
    icon: Palette,
    quizCount: 67,
    totalAttempts: 21340,
    averageScore: 74,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    gradient: "from-purple-500 to-pink-500",
    subcategories: ["Literature", "Painting", "Sculpture", "Architecture", "Cultural Studies"],
  },
  {
    id: "music",
    name: "Music",
    description: "Classical, rock, pop, jazz, instruments and music theory",
    icon: Music,
    quizCount: 45,
    totalAttempts: 18750,
    averageScore: 69,
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    gradient: "from-pink-500 to-rose-500",
    subcategories: ["Classical", "Rock & Pop", "Jazz", "Instruments", "Music Theory"],
  },
  {
    id: "sports",
    name: "Sports",
    description: "Football, basketball, olympics, sports history and athletic achievements",
    icon: Trophy,
    quizCount: 78,
    totalAttempts: 29680,
    averageScore: 81,
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    gradient: "from-orange-500 to-red-500",
    subcategories: ["Football", "Basketball", "Olympics", "Tennis", "Sports History"],
  },
  {
    id: "technology",
    name: "Technology",
    description: "Programming, AI, gadgets, software development and tech innovations",
    icon: Brain,
    quizCount: 92,
    totalAttempts: 41200,
    averageScore: 76,
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    gradient: "from-cyan-500 to-blue-500",
    subcategories: ["Programming", "AI & ML", "Web Development", "Mobile Apps", "Cybersecurity"],
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Video games, board games, gaming history and game development",
    icon: Gamepad2,
    quizCount: 34,
    totalAttempts: 15420,
    averageScore: 83,
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    gradient: "from-indigo-500 to-purple-500",
    subcategories: ["Video Games", "Board Games", "Gaming History", "Game Development", "Esports"],
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

export function CategoriesGrid() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some((sub) => sub.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Quiz Categories</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive collection of quiz categories. From science to sports, find the perfect challenge
          for your interests.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredCategories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <Card className="trivio-card-hover cursor-pointer group h-full" asChild>
              <Link href={`/categories/${category.id}`}>
                <div className={`relative h-32 bg-gradient-to-br ${category.gradient} p-6 rounded-t-lg`}>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {category.quizCount} quizzes
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center h-full">
                    <category.icon className="h-12 w-12 text-white drop-shadow-lg" />
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{category.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{category.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{category.totalAttempts.toLocaleString()} attempts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{category.averageScore}% avg</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Popular topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <Badge key={sub} variant="outline" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto group-hover:text-primary transition-colors"
                  >
                    Explore Category
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredCategories.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-muted-foreground">No categories found matching your search.</p>
          <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
            Clear search
          </Button>
        </motion.div>
      )}
    </div>
  )
}
