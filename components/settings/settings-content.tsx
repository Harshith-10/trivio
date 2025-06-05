"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Palette, Download, Trash2, Eye, EyeOff, Save, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock settings data
const settingsData = {
  profile: {
    displayName: "Alex Johnson",
    email: "alex@example.com",
    timezone: "America/New_York",
    language: "English",
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    quizReminders: true,
    achievementAlerts: true,
    leaderboardUpdates: false,
  },
  privacy: {
    profilePublic: true,
    showInLeaderboard: true,
    shareProgress: false,
    allowFriendRequests: true,
  },
  quiz: {
    defaultDifficulty: "Medium",
    autoSubmit: false,
    showExplanations: true,
    soundEffects: true,
    vibration: false,
    fullscreenMode: true,
  },
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

export function SettingsContent() {
  const [notifications, setNotifications] = useState(settingsData.notifications)
  const [privacy, setPrivacy] = useState(settingsData.privacy)
  const [quiz, setQuiz] = useState(settingsData.quiz)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handleQuizChange = (key: string, value: boolean | string) => {
    setQuiz((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="quiz">Quiz Settings</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>General Settings</span>
                  </CardTitle>
                  <CardDescription>Basic account and display preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" defaultValue={settingsData.profile.displayName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={settingsData.profile.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        defaultValue={settingsData.profile.timezone}
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        defaultValue={settingsData.profile.language}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Appearance</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Theme</Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>

                  <Button onClick={handleSave} className="quiz-button">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>Control how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive quiz results and updates via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified about new quizzes and challenges</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Digest</Label>
                        <p className="text-sm text-muted-foreground">Receive a summary of your weekly progress</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Quiz Reminders</Label>
                        <p className="text-sm text-muted-foreground">Get reminded to take daily quizzes</p>
                      </div>
                      <Switch
                        checked={notifications.quizReminders}
                        onCheckedChange={(checked) => handleNotificationChange("quizReminders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Achievement Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when you earn new badges</p>
                      </div>
                      <Switch
                        checked={notifications.achievementAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("achievementAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Leaderboard Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified about ranking changes</p>
                      </div>
                      <Switch
                        checked={notifications.leaderboardUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("leaderboardUpdates", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave} className="quiz-button">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Privacy Settings</span>
                  </CardTitle>
                  <CardDescription>Control your profile visibility and data sharing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Public Profile</Label>
                        <p className="text-sm text-muted-foreground">Allow others to view your profile and stats</p>
                      </div>
                      <Switch
                        checked={privacy.profilePublic}
                        onCheckedChange={(checked) => handlePrivacyChange("profilePublic", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show in Leaderboard</Label>
                        <p className="text-sm text-muted-foreground">Display your name on public leaderboards</p>
                      </div>
                      <Switch
                        checked={privacy.showInLeaderboard}
                        onCheckedChange={(checked) => handlePrivacyChange("showInLeaderboard", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Share Progress</Label>
                        <p className="text-sm text-muted-foreground">Allow sharing of your quiz progress</p>
                      </div>
                      <Switch
                        checked={privacy.shareProgress}
                        onCheckedChange={(checked) => handlePrivacyChange("shareProgress", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Friend Requests</Label>
                        <p className="text-sm text-muted-foreground">Let other users send you friend requests</p>
                      </div>
                      <Switch
                        checked={privacy.allowFriendRequests}
                        onCheckedChange={(checked) => handlePrivacyChange("allowFriendRequests", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave} className="quiz-button">
                    <Save className="mr-2 h-4 w-4" />
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Quiz Preferences</span>
                  </CardTitle>
                  <CardDescription>Customize your quiz-taking experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultDifficulty">Default Difficulty</Label>
                      <select
                        id="defaultDifficulty"
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        value={quiz.defaultDifficulty}
                        onChange={(e) => handleQuizChange("defaultDifficulty", e.target.value)}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Submit</Label>
                        <p className="text-sm text-muted-foreground">Automatically submit when time runs out</p>
                      </div>
                      <Switch
                        checked={quiz.autoSubmit}
                        onCheckedChange={(checked) => handleQuizChange("autoSubmit", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Explanations</Label>
                        <p className="text-sm text-muted-foreground">Display answer explanations after quiz</p>
                      </div>
                      <Switch
                        checked={quiz.showExplanations}
                        onCheckedChange={(checked) => handleQuizChange("showExplanations", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Sound Effects</Label>
                        <p className="text-sm text-muted-foreground">Play sounds for correct/incorrect answers</p>
                      </div>
                      <Switch
                        checked={quiz.soundEffects}
                        onCheckedChange={(checked) => handleQuizChange("soundEffects", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Fullscreen Mode</Label>
                        <p className="text-sm text-muted-foreground">Always start quizzes in fullscreen</p>
                      </div>
                      <Switch
                        checked={quiz.fullscreenMode}
                        onCheckedChange={(checked) => handleQuizChange("fullscreenMode", checked)}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave} className="quiz-button">
                    <Save className="mr-2 h-4 w-4" />
                    Save Quiz Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button className="quiz-button">Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your account data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Download Your Data</h4>
                      <p className="text-sm text-muted-foreground">Get a copy of all your quiz data and progress</p>
                    </div>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                  <CardDescription>Irreversible account actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400 flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Delete Account
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Permanently delete your account and all data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
