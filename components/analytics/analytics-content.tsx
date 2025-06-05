"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Clock, Trophy, Calendar, BookOpen, Users, Zap } from "lucide-react"

// Mock analytics data
const analyticsData = {
  overview: {
    totalQuizzes: 47,
    totalTimeSpent: "24h 30m",
    averageScore: 82,
    bestCategory: "Science",
    currentStreak: 12,
    longestStreak: 28,
    rank: 156,
    improvement: "+15%",
  },
  categoryPerformance: [
    { category: "Science", quizzes: 12, averageScore: 89, timeSpent: "6h 20m", improvement: "+12%" },
    { category: "History", quizzes: 8, averageScore: 76, timeSpent: "4h 15m", improvement: "+8%" },
    { category: "Technology", quizzes: 10, averageScore: 85, timeSpent: "5h 30m", improvement: "+18%" },
    { category: "Mathematics", quizzes: 7, averageScore: 72, timeSpent: "3h 45m", improvement: "+5%" },
    { category: "Arts & Culture", quizzes: 6, averageScore: 80, timeSpent: "3h 20m", improvement: "+10%" },
    { category: "Sports", quizzes: 4, averageScore: 88, timeSpent: "2h 20m", improvement: "+22%" },
  ],
  weeklyActivity: [
    { day: "Mon", quizzes: 3, score: 85, timeSpent: 45 },
    { day: "Tue", quizzes: 2, score: 92, timeSpent: 30 },
    { day: "Wed", quizzes: 4, score: 78, timeSpent: 60 },
    { day: "Thu", quizzes: 1, score: 95, timeSpent: 15 },
    { day: "Fri", quizzes: 3, score: 88, timeSpent: 45 },
    { day: "Sat", quizzes: 2, score: 82, timeSpent: 30 },
    { day: "Sun", quizzes: 1, score: 90, timeSpent: 20 },
  ],
  monthlyTrends: [
    { month: "Jan", quizzes: 15, averageScore: 78 },
    { month: "Feb", quizzes: 18, averageScore: 81 },
    { month: "Mar", quizzes: 22, averageScore: 84 },
    { month: "Apr", quizzes: 19, averageScore: 82 },
    { month: "May", quizzes: 25, averageScore: 87 },
    { month: "Jun", quizzes: 28, averageScore: 89 },
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

export function AnalyticsContent() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">Track your learning progress and identify areas for improvement.</p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        {/* Overview Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-trivio-600" />
                    <span className="text-2xl font-bold">{analyticsData.overview.totalQuizzes}</span>
                  </div>
                  <Badge variant="secondary" className="text-green-600">
                    {analyticsData.overview.improvement}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold">{analyticsData.overview.averageScore}%</span>
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Time Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold">{analyticsData.overview.totalTimeSpent}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <span className="text-2xl font-bold">{analyticsData.overview.currentStreak}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Detailed Analytics */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="categories" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories">Category Performance</TabsTrigger>
              <TabsTrigger value="activity">Weekly Activity</TabsTrigger>
              <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Category</CardTitle>
                  <CardDescription>See how you're performing across different quiz categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analyticsData.categoryPerformance.map((category, index) => (
                      <motion.div
                        key={category.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium">{category.category}</h3>
                            <Badge variant="outline">{category.quizzes} quizzes</Badge>
                            <Badge variant="secondary" className="text-green-600">
                              {category.improvement}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{category.averageScore}%</div>
                            <div className="text-sm text-muted-foreground">{category.timeSpent}</div>
                          </div>
                        </div>
                        <Progress value={category.averageScore} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Your quiz activity over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.weeklyActivity.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 text-sm font-medium">{day.day}</div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{day.quizzes} quizzes</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{day.timeSpent}m</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{day.score}%</div>
                          <div className="text-sm text-muted-foreground">avg score</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Track your progress over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.monthlyTrends.map((month, index) => (
                      <motion.div
                        key={month.month}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 text-sm font-medium">{month.month}</div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{month.quizzes} quizzes</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{month.averageScore}%</div>
                          <div className="text-sm text-muted-foreground">avg score</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Achievements Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Best Category</h3>
                    <p className="text-sm text-muted-foreground">{analyticsData.overview.bestCategory}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Longest Streak</h3>
                    <p className="text-sm text-muted-foreground">{analyticsData.overview.longestStreak} days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Global Rank</h3>
                    <p className="text-sm text-muted-foreground">#{analyticsData.overview.rank}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
