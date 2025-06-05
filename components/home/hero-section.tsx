"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Trophy, Users, Zap } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative py-24 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <motion.div
              className="relative rounded-full px-4 py-2 text-sm leading-6 text-muted-foreground ring-1 ring-muted-foreground/20 hover:ring-muted-foreground/30 transition-all bg-background/50 backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              🎉 New categories added weekly!{" "}
              <Link href="/auth/signup" className="font-semibold text-primary hover:text-primary/80">
                <span className="absolute inset-0" aria-hidden="true" />
                Join Now <ArrowRight className="inline h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            Test Your Knowledge with{" "}
            <span className="bg-gradient-to-r from-ocean-600 via-trivio-500 to-ocean-600 bg-clip-text text-transparent">
              Interactive Quizzes
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto mb-10">
            Challenge yourself with thousands of questions across multiple categories. Track your progress, compete with
            friends, and become a quiz master!
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-x-6 mb-16">
            <Button size="lg" className="trivio-button group" asChild>
              <Link href="/auth/signup">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Get Started Free
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="group" asChild>
              <Link href="/auth/login">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <motion.div variants={statsVariants} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-ocean-100 to-trivio-100 dark:from-ocean-900 dark:to-trivio-900 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </motion.div>
            <motion.div variants={statsVariants} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-trivio-100 to-ocean-100 dark:from-trivio-900 dark:to-ocean-900 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-trivio-600 dark:text-trivio-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </motion.div>
            <motion.div variants={statsVariants} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-900 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">25+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
