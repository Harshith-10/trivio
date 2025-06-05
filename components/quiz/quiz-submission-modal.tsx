"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface QuizSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  answeredQuestions: number
  totalQuestions: number
}

export function QuizSubmissionModal({
  isOpen,
  onClose,
  onConfirm,
  answeredQuestions,
  totalQuestions,
}: QuizSubmissionModalProps) {
  const unansweredQuestions = totalQuestions - answeredQuestions
  const allAnswered = answeredQuestions === totalQuestions

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {allAnswered ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            )}
            <span>Submit Quiz</span>
          </DialogTitle>
          <DialogDescription>
            {allAnswered
              ? "You have answered all questions. Are you ready to submit your quiz?"
              : `You have ${unansweredQuestions} unanswered question${unansweredQuestions > 1 ? "s" : ""}. You can still submit, but unanswered questions will be marked as incorrect.`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex justify-between text-sm">
            <span>Answered:</span>
            <span className="font-medium">
              {answeredQuestions} / {totalQuestions}
            </span>
          </div>
          {!allAnswered && (
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Unanswered:</span>
              <span>{unansweredQuestions}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Continue Quiz
          </Button>
          <Button onClick={onConfirm} className="trivio-button">
            Submit Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
