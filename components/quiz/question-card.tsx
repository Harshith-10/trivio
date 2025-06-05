"use client"

import { MCQQuestion } from "./question-types/mcq-question"
import { TextQuestion } from "./question-types/text-question"
import { CodeQuestion } from "./question-types/code-question"

interface Question {
  id: string
  type: "mcq" | "text" | "code"
  question: string
  // MCQ specific
  options?: string[]
  // Text specific
  placeholder?: string
  maxLength?: number
  // Code specific
  description?: string
  examples?: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints?: string[]
  supportedLanguages?: string[]
  defaultLanguage?: string
  starterCode?: Record<string, string>
  testCases?: Array<{
    input: string
    expectedOutput: string
    isHidden?: boolean
  }>
  // Common
  correctAnswer?: number
  explanation?: string
  image?: string
}

interface QuestionCardProps {
  question: Question
  selectedAnswer?: number | string
  onAnswerSelect?: (answerIndex: number) => void
  onTextAnswerChange?: (answer: string) => void
  onCodeChange?: (code: string) => void
  onLanguageChange?: (language: string) => void
  onCodeSubmit?: () => void
  selectedLanguage?: string
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  onTextAnswerChange,
  onCodeChange,
  onLanguageChange,
  onCodeSubmit,
  selectedLanguage,
}: QuestionCardProps) {
  switch (question.type) {
    case "mcq":
      return (
        <MCQQuestion
          question={question}
          selectedAnswer={typeof selectedAnswer === "number" ? selectedAnswer : undefined}
          onAnswerSelect={onAnswerSelect || (() => {})}
        />
      )

    case "text":
      return (
        <TextQuestion
          question={question}
          answer={typeof selectedAnswer === "string" ? selectedAnswer : undefined}
          onAnswerChange={onTextAnswerChange || (() => {})}
        />
      )

    case "code":
      return (
        <CodeQuestion
          question={{
            ...question,
            description: question.description || "",
            examples: question.examples || [],
            constraints: question.constraints,
            supportedLanguages: question.supportedLanguages || ["javascript"],
            defaultLanguage: question.defaultLanguage || "javascript",
            starterCode: question.starterCode || {},
            testCases: question.testCases || [],
          }}
          code={typeof selectedAnswer === "string" ? selectedAnswer : undefined}
          language={selectedLanguage}
          onCodeChange={onCodeChange || (() => {})}
          onLanguageChange={onLanguageChange || (() => {})}
          onSubmit={onCodeSubmit || (() => {})}
        />
      )

    default:
      return <div>Unsupported question type</div>
  }
}
