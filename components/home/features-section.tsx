"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, Trophy, BarChart3, Users, Shield, Zap } from "lucide-react"

const features = [
  {
    name: "Timed Challenges",
    description: "Test your knowledge under pressure with customizable time limits for each quiz.",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Leaderboards",
    description: "Compete with friends and climb the global rankings across different categories.",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Progress Analytics",
    description: "Track your performance with detailed statistics and improvement insights.",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Multiplayer Mode",
    description: "Challenge friends in real-time quiz battles and group competitions.",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Secure & Fair",
    description: "Anti-cheat measures and secure authentication ensure fair competition.",
    icon: Shield,
    color: "from-red-500 to-rose-500",
  },
  {
    name: "Instant Results",
    description: "Get immediate feedback with detailed explanations for each answer.",
    icon: Zap,
    color: "from-indigo-500 to-blue-500",
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

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful features for the ultimate quiz experience
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform is designed to make learning fun and competitive with features that enhance your quiz-taking
            experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-2xl lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div key={feature.name} variants={itemVariants} className="flex flex-col group">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br ${feature.color}`}
                  >
                    <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </motion.div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
