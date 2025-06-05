import { TrendingUp, Users, Clock, Award } from "lucide-react"

const stats = [
  {
    name: "Total Quizzes Completed",
    value: "2.5M+",
    icon: TrendingUp,
    description: "Quizzes completed by our community",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Active Users",
    value: "50K+",
    icon: Users,
    description: "Monthly active quiz takers",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Average Session",
    value: "12 min",
    icon: Clock,
    description: "Time spent per quiz session",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Certificates Earned",
    value: "125K+",
    icon: Award,
    description: "Achievement certificates awarded",
    color: "from-yellow-500 to-orange-500",
  },
]

export function StatsSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by learners worldwide</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of quiz enthusiasts who are already improving their knowledge with Trivio.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col items-center text-center group">
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-base font-semibold leading-7">{stat.name}</div>
              <div className="mt-1 text-sm leading-6 text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
