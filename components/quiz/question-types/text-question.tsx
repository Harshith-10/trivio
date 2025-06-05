"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface TextQuestionProps {
  question: {
    id: string
    question: string
    placeholder?: string
    maxLength?: number
    image?: string
  }
  answer?: string
  onAnswerChange: (answer: string) => void
}

export function TextQuestion({ question, answer, onAnswerChange }: TextQuestionProps) {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <Label htmlFor="text-answer" className="text-base font-medium">
            Your Answer:
          </Label>
          <Textarea
            id="text-answer"
            placeholder={question.placeholder || "Type your answer here..."}
            value={answer || ""}
            onChange={(e) => onAnswerChange(e.target.value)}
            maxLength={question.maxLength || 1000}
            className="min-h-[120px] text-base leading-relaxed resize-none"
          />
          {question.maxLength && (
            <div className="text-sm text-muted-foreground text-right">
              {(answer || "").length} / {question.maxLength} characters
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}
