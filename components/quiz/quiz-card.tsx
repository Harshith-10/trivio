import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, Play, BookOpen } from "lucide-react"

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: number
  questions: number
  attempts: number
  rating: number
  tags?: string[]
}

interface QuizCardProps {
  quiz: Quiz
}

export function QuizCard({ quiz }: QuizCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getCategoryIcon = (category: string) => {
    // You can expand this with more specific icons
    return BookOpen
  }

  const CategoryIcon = getCategoryIcon(quiz.category)

  return (
    <Card className="trivio-card-hover overflow-hidden group">
      <div className="relative bg-gradient-to-br from-trivio-50 to-ocean-50 dark:from-trivio-950 dark:to-ocean-950 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-white/80 dark:bg-black/20 backdrop-blur">
            <CategoryIcon className="h-5 w-5 text-trivio-600" />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant="secondary">{quiz.category}</Badge>
            <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">{quiz.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{quiz.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{quiz.questions} questions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{quiz.attempts.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{quiz.rating}</span>
          </div>
        </div>

        {quiz.tags && (
          <div className="flex flex-wrap gap-1 mt-3">
            {quiz.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full trivio-button group" asChild>
          <Link href={`/quiz/${quiz.id}`}>
            <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Start Quiz
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
