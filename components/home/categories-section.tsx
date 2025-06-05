"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Globe, Atom, Calculator, Palette, Music, Trophy, Gamepad2, ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Science",
    description: "Physics, Chemistry, Biology and more",
    icon: Atom,
    quizCount: 156,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    href: "/auth/signup",
  },
  {
    name: "History",
    description: "World history, ancient civilizations",
    icon: Globe,
    quizCount: 89,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    href: "/auth/signup",
  },
  {
    name: "Mathematics",
    description: "Algebra, geometry, calculus",
    icon: Calculator,
    quizCount: 124,
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    href: "/auth/signup",
  },
  {
    name: "Arts & Culture",
    description: "Literature, painting, sculpture",
    icon: Palette,
    quizCount: 67,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    href: "/auth/signup",
  },
  {
    name: "Music",
    description: "Classical, rock, pop, jazz",
    icon: Music,
    quizCount: 45,
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    href: "/auth/signup",
  },
  {
    name: "Sports",
    description: "Football, basketball, olympics",
    icon: Trophy,
    quizCount: 78,
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    href: "/auth/signup",
  },
  {
    name: "Technology",
    description: "Programming, AI, gadgets",
    icon: Brain,
    quizCount: 92,
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    href: "/auth/signup",
  },
  {
    name: "Gaming",
    description: "Video games, board games",
    icon: Gamepad2,
    quizCount: 34,
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    href: "/auth/signup",
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

export function CategoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Quiz Categories</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose from a wide variety of topics and test your knowledge in areas that interest you most.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Card className="trivio-card-hover cursor-pointer group h-full" asChild>
                <Link href={category.href}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className={`p-2 rounded-lg ${category.color}`}
                      >
                        <category.icon className="h-6 w-6" />
                      </motion.div>
                      <Badge variant="secondary">{category.quizCount} quizzes</Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Button size="lg" className="trivio-button group" asChild>
            <Link href="/auth/signup">
              Start Learning Today
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
