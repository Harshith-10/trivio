"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, BookOpen, Award, Calendar, Play, ArrowRight } from "lucide-react"
import Avvvatars from "avvvatars-react"

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "March 2024",
  totalQuizzes: 47,
  totalScore: 3850,
  averageScore: 82,
  currentStreak: 12,
  longestStreak: 28,
  rank: 156,
  badges: [
    { name: "Quiz Master", description: "Completed 50+ quizzes", earned: false, progress: 94 },
    { name: "Science Expert", description: "90%+ average in Science", earned: true },
    { name: "Speed Demon", description: "Complete quiz in under 5 minutes", earned: true },
    { name: "Perfect Score", description: "Get 100% on any quiz", earned: false, progress: 0 },
  ],
  recentQuizzes: [
    {
      id: "1",
      title: "World History Basics",
      category: "History",
      score: 85,
      totalQuestions: 20,
      completedAt: "2 hours ago",
      difficulty: "Medium",
    },
    {
      id: "2",
      title: "JavaScript Fundamentals",
      category: "Technology",
      score: 92,
      totalQuestions: 25,
      completedAt: "1 day ago",
      difficulty: "Hard",
    },
    {
      id: "3",
      title: "Classical Music",
      category: "Music",
      score: 78,
      totalQuestions: 15,
      completedAt: "3 days ago",
      difficulty: "Easy",
    },
  ],
  weeklyProgress: [
    { day: "Mon", quizzes: 2, score: 85 },
    { day: "Tue", quizzes: 1, score: 92 },
    { day: "Wed", quizzes: 3, score: 78 },
    { day: "Thu", quizzes: 0, score: 0 },
    { day: "Fri", quizzes: 2, score: 88 },
    { day: "Sat", quizzes: 1, score: 95 },
    { day: "Sun", quizzes: 0, score: 0 },
  ],
}

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

export function DashboardContent() {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-4 mb-6">
          <Avvvatars value={userData.email} style="shape" size={64} />
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userData.name}!</h1>
            <p className="text-muted-foreground">Member since {userData.joinDate}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        {/* Stats Overview */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-trivio-600" />
                  <span className="text-2xl font-bold">{userData.totalQuizzes}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold">{userData.averageScore}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="text-2xl font-bold">{userData.currentStreak}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Global Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span className="text-2xl font-bold">#{userData.rank}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Jump back into learning</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full trivio-button" asChild>
                      <Link href="/quizzes">
                        <Play className="mr-2 h-4 w-4" />
                        Take a Quiz
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/categories">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Browse Categories
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/leaderboard">
                        <Trophy className="mr-2 h-4 w-4" />
                        View Leaderboard
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Progress to Next Badge */}
                <Card>
                  <CardHeader>
                    <CardTitle>Next Achievement</CardTitle>
                    <CardDescription>You're almost there!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Award className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium">Quiz Master</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{userData.badges[0].progress}%</span>
                      </div>
                      <Progress value={userData.badges[0].progress} className="h-2" />
                      <p className="text-sm text-muted-foreground">{userData.badges[0].description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Quiz Results</CardTitle>
                  <CardDescription>Your latest quiz performances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentQuizzes.map((quiz, index) => (
                      <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium">{quiz.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{quiz.category}</span>
                            <Badge variant="outline">{quiz.difficulty}</Badge>
                            <span>{quiz.completedAt}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{quiz.score}%</div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round((quiz.score / 100) * quiz.totalQuestions)}/{quiz.totalQuestions}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/quizzes">
                        View All Results
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card
                      className={
                        badge.earned ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950" : ""
                      }
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-full ${
                              badge.earned
                                ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{badge.name}</CardTitle>
                            <CardDescription>{badge.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      {!badge.earned && badge.progress !== undefined && (
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{badge.progress}%</span>
                            </div>
                            <Progress value={badge.progress} className="h-2" />
                          </div>
                        </CardContent>
                      )}
                      {badge.earned && (
                        <CardContent>
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <Trophy className="mr-1 h-3 w-3" />
                            Earned
                          </Badge>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Your quiz activity over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.weeklyProgress.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 text-sm font-medium">{day.day}</div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{day.quizzes} quizzes</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {day.score > 0 ? (
                            <div className="text-lg font-bold">{day.score}%</div>
                          ) : (
                            <div className="text-sm text-muted-foreground">No activity</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
