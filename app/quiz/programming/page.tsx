"use client"

import { useState } from "react"
import { CodeQuestion } from "@/components/quiz/question-types/code-question"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample programming quiz data
const programmingQuiz = {
  id: "prog-quiz-1",
  title: "JavaScript Fundamentals",
  description: "Test your JavaScript programming skills with these coding challenges.",
  questions: [
    {
      id: "js-q1",
      question: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      examples: [
        {
          input: "[2, 7, 11, 15], 9",
          output: "[0, 1]",
          explanation: "Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].",
        },
        {
          input: "[3, 2, 4], 6",
          output: "[1, 2]",
          explanation: "Because nums[1] + nums[2] == 2 + 4 == 6, we return [1, 2].",
        },
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists.",
      ],
      supportedLanguages: ["JavaScript", "Python", "Java", "C++"],
      defaultLanguage: "JavaScript",
      starterCode: {
        JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your code here
  
}`,
        Python: `def two_sum(nums, target):
    # Your code here
    pass`,
        Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        
    }
}`,
        "C++": `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        
    }
};`,
      },
      testCases: [
        {
          input: "[[2, 7, 11, 15], 9]",
          expectedOutput: "[0,1]",
        },
        {
          input: "[[3, 2, 4], 6]",
          expectedOutput: "[1,2]",
        },
        {
          input: "[[3, 3], 6]",
          expectedOutput: "[0,1]",
        },
      ],
    },
    {
      id: "js-q2",
      question: "Reverse String",
      description: "Write a function that reverses a string. The input string is given as an array of characters.",
      examples: [
        {
          input: '["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          explanation: "Reverse the characters in the array.",
        },
      ],
      constraints: ["1 <= s.length <= 10^5", "s[i] is a printable ascii character."],
      supportedLanguages: ["JavaScript", "Python", "Java"],
      defaultLanguage: "JavaScript",
      starterCode: {
        JavaScript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // Your code here
  
}`,
        Python: `def reverse_string(s):
    # Your code here
    pass`,
        Java: `class Solution {
    public void reverseString(char[] s) {
        // Your code here
        
    }
}`,
      },
      testCases: [
        {
          input: '[["h","e","l","l","o"]]',
          expectedOutput: '["o","l","l","e","h"]',
        },
        {
          input: '[["H","a","n","n","a","h"]]',
          expectedOutput: '["h","a","n","n","a","H"]',
        },
      ],
    },
  ],
}

export default function ProgrammingQuizPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userCode, setUserCode] = useState<Record<string, string>>({})
  const [userLanguage, setUserLanguage] = useState<Record<string, string>>({})
  const [completed, setCompleted] = useState(false)

  const currentQuestion = programmingQuiz.questions[currentQuestionIndex]

  const handleCodeChange = (code: string) => {
    setUserCode((prev) => ({
      ...prev,
      [currentQuestion.id]: code,
    }))
  }

  const handleLanguageChange = (language: string) => {
    setUserLanguage((prev) => ({
      ...prev,
      [currentQuestion.id]: language,
    }))

    // Set starter code for the new language if user hasn't written any code for this language yet
    if (!userCode[`${currentQuestion.id}-${language}`]) {
      setUserCode((prev) => ({
        ...prev,
        [currentQuestion.id]: currentQuestion.starterCode[language] || "",
      }))
    }
  }

  const handleSubmit = () => {
    if (currentQuestionIndex < programmingQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleFinish = () => {
    router.push("/dashboard")
  }

  if (completed) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold">Quiz Completed!</h1>
          <p className="text-muted-foreground">You've successfully completed the {programmingQuiz.title} quiz.</p>
          <Button onClick={handleFinish} className="trivio-button">
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{programmingQuiz.title}</h1>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {programmingQuiz.questions.length}
        </div>
      </div>

      <CodeQuestion
        question={currentQuestion}
        code={userCode[currentQuestion.id]}
        language={userLanguage[currentQuestion.id] || currentQuestion.defaultLanguage}
        onCodeChange={handleCodeChange}
        onLanguageChange={handleLanguageChange}
        onSubmit={handleSubmit}
      />

      <div className="flex justify-between mt-8">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button onClick={handleSubmit} className="trivio-button">
          {currentQuestionIndex < programmingQuiz.questions.length - 1 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Complete Quiz"
          )}
        </Button>
      </div>
    </div>
  )
}
