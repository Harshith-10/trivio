"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  image?: string
}

interface QuestionCardProps {
  question: Question
  selectedAnswer?: number
  onAnswerSelect: (answerIndex: number) => void
}

export function QuestionCard({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl leading-relaxed">{question.question}</CardTitle>
        {question.image && (
          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-muted">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              [Question Image Placeholder]
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => onAnswerSelect(Number.parseInt(value))}
          className="space-y-4"
        >
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className={`flex items-start space-x-4 p-6 rounded-lg border-2 transition-all cursor-pointer hover:bg-muted/50 ${
                selectedAnswer === index
                  ? "bg-primary/10 border-primary shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onAnswerSelect(index)}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer text-base leading-relaxed font-medium"
              >
                {option}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
