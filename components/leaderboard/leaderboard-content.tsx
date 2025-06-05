"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Medal, Award, Crown, TrendingUp, Calendar, Users, Target } from "lucide-react"
import Avvvatars from "avvvatars-react"

const leaderboardData = {
  global: [
    {
      rank: 1,
      name: "Alex Chen",
      avatar: "",
      score: 98750,
      quizzesCompleted: 245,
      averageScore: 94.2,
      streak: 28,
      badges: ["Quiz Master", "Science Expert", "Speed Demon"],
    },
    {
      rank: 2,
      name: "Sarah Johnson",
      avatar: "",
      score: 95420,
      quizzesCompleted: 198,
      averageScore: 92.8,
      streak: 15,
      badges: ["History Buff", "Literature Pro"],
    },
    {
      rank: 3,
      name: "Mike Rodriguez",
      avatar: "",
      score: 92180,
      quizzesCompleted: 167,
      averageScore: 91.5,
      streak: 22,
      badges: ["Math Wizard", "Logic Master"],
    },
    {
      rank: 4,
      name: "Emma Wilson",
      avatar: "",
      score: 89340,
      quizzesCompleted: 203,
      averageScore: 88.7,
      streak: 12,
      badges: ["Art Enthusiast", "Music Lover"],
    },
    {
      rank: 5,
      name: "David Kim",
      avatar: "",
      score: 87650,
      quizzesCompleted: 156,
      averageScore: 90.1,
      streak: 19,
      badges: ["Tech Guru", "Innovation Leader"],
    },
  ],
  weekly: [
    {
      rank: 1,
      name: "Jordan Taylor",
      avatar: "",
      score: 8750,
      quizzesCompleted: 25,
      averageScore: 96.2,
      streak: 7,
      badges: ["Rising Star"],
    },
    {
      rank: 2,
      name: "Alex Chen",
      avatar: "",
      score: 8420,
      quizzesCompleted: 22,
      averageScore: 94.2,
      streak: 7,
      badges: ["Quiz Master"],
    },
  ],
  monthly: [
    {
      rank: 1,
      name: "Sarah Johnson",
      avatar: "",
      score: 25420,
      quizzesCompleted: 68,
      averageScore: 92.8,
      streak: 15,
      badges: ["Monthly Champion"],
    },
  ],
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-600"
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-500"
    case 3:
      return "bg-gradient-to-r from-amber-400 to-amber-600"
    default:
      return "bg-muted"
  }
}

export function LeaderboardContent() {
  const [activeTab, setActiveTab] = useState("global")

  const currentData = leaderboardData[activeTab as keyof typeof leaderboardData]

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Leaderboard</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See how you rank against other quiz masters. Compete for the top spot and earn exclusive badges!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-trivio-600" />
              <span className="text-2xl font-bold">50,247</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold">12,458</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-ocean-600" />
              <span className="text-2xl font-bold">78.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold">45 days</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">All Time</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Top 3 Podium */}
            {currentData.length >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                {/* 2nd Place */}
                <div className="flex flex-col items-center order-1">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-gray-300">
                      <Avvvatars value={currentData[1].name} style="shape" size={56} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                  </div>
                  <h3 className="font-semibold mt-2 text-center">{currentData[1].name}</h3>
                  <p className="text-sm text-muted-foreground">{currentData[1].score.toLocaleString()} pts</p>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center order-2">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-yellow-400">
                      <Avvvatars value={currentData[0].name} style="shape" size={72} />
                    </div>
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                      <Crown className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold mt-2 text-center text-lg">{currentData[0].name}</h3>
                  <p className="text-sm text-muted-foreground">{currentData[0].score.toLocaleString()} pts</p>
                  <Badge className="mt-1 bg-yellow-100 text-yellow-800">Champion</Badge>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center order-3">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-amber-400">
                      <Avvvatars value={currentData[2].name} style="shape" size={56} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                  </div>
                  <h3 className="font-semibold mt-2 text-center">{currentData[2].name}</h3>
                  <p className="text-sm text-muted-foreground">{currentData[2].score.toLocaleString()} pts</p>
                </div>
              </motion.div>
            )}

            {/* Full Leaderboard */}
            <div className="space-y-2">
              {currentData.map((player, index) => (
                <motion.div
                  key={`${player.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card
                    className={`${player.rank <= 3 ? getRankColor(player.rank) : ""} ${player.rank <= 3 ? "text-white" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">{getRankIcon(player.rank)}</div>

                          <div className="h-12 w-12 rounded-full overflow-hidden">
                            <Avvvatars value={player.name} style="shape" size={48} />
                          </div>

                          <div>
                            <h3 className={`font-semibold ${player.rank <= 3 ? "text-white" : ""}`}>{player.name}</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {player.badges.slice(0, 2).map((badge) => (
                                <Badge
                                  key={badge}
                                  variant="outline"
                                  className={`text-xs ${player.rank <= 3 ? "border-white/50 text-white" : ""}`}
                                >
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className={`text-2xl font-bold ${player.rank <= 3 ? "text-white" : ""}`}>
                            {player.score.toLocaleString()}
                          </div>
                          <div className={`text-sm ${player.rank <= 3 ? "text-white/80" : "text-muted-foreground"}`}>
                            {player.quizzesCompleted} quizzes • {player.averageScore}% avg
                          </div>
                          <div className={`text-sm ${player.rank <= 3 ? "text-white/80" : "text-muted-foreground"}`}>
                            🔥 {player.streak} day streak
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
