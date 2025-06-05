import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuizResults } from "@/components/quiz/quiz-results"

export default function QuizResultsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <QuizResults quizId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
