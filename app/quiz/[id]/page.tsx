import { QuizInterface } from "@/components/quiz/quiz-interface"

export default function QuizPage({ params }: { params: { id: string } }) {
  return <QuizInterface quizId={params.id} />
}
