"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, CheckCircle, XCircle, Clock, Code2 } from "lucide-react"
import { CodeEditor } from "@/components/quiz/code-editor"

interface CodeQuestionProps {
  question: {
    id: string
    question: string
    description: string
    examples: Array<{
      input: string
      output: string
      explanation?: string
    }>
    constraints?: string[]
    supportedLanguages: string[]
    defaultLanguage: string
    starterCode: Record<string, string>
    testCases: Array<{
      input: string
      expectedOutput: string
      isHidden?: boolean
    }>
  }
  code?: string
  language?: string
  onCodeChange: (code: string) => void
  onLanguageChange: (language: string) => void
  onSubmit: () => void
}

export function CodeQuestion({
  question,
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onSubmit,
}: CodeQuestionProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<Array<{
    passed: boolean
    input: string
    expectedOutput: string
    actualOutput: string
    executionTime?: number
  }> | null>(null)

  const currentLanguage = language || question.defaultLanguage
  const currentCode = code || question.starterCode[currentLanguage] || ""

  const handleRun = async () => {
    setIsRunning(true)
    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock test results
    const mockResults = question.testCases
      .filter((tc) => !tc.isHidden)
      .map((testCase, index) => ({
        passed: Math.random() > 0.3, // 70% pass rate for demo
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: Math.random() > 0.3 ? testCase.expectedOutput : "Wrong output",
        executionTime: Math.floor(Math.random() * 100) + 10,
      }))

    setTestResults(mockResults)
    setIsRunning(false)
  }

  const passedTests = testResults?.filter((r) => r.passed).length || 0
  const totalTests = testResults?.length || 0

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Question Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl leading-relaxed">{question.question}</CardTitle>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Code2 className="h-3 w-3" />
              <span>Coding Challenge</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="constraints">Constraints</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-base leading-relaxed">{question.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-4 space-y-4">
              {question.examples.map((example, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium">Example {index + 1}:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Input:</Label>
                      <pre className="mt-1 p-3 bg-muted rounded-md text-sm font-mono">{example.input}</pre>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Output:</Label>
                      <pre className="mt-1 p-3 bg-muted rounded-md text-sm font-mono">{example.output}</pre>
                    </div>
                  </div>
                  {example.explanation && <p className="text-sm text-muted-foreground">{example.explanation}</p>}
                  {index < question.examples.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="constraints" className="mt-4">
              {question.constraints && (
                <ul className="space-y-2">
                  {question.constraints.map((constraint, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{constraint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Code Editor Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Code Editor</h3>
                <div className="flex items-center space-x-2">
                  <Select value={currentLanguage} onValueChange={onLanguageChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {question.supportedLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleRun} disabled={isRunning} className="trivio-button">
                    <Play className="mr-2 h-4 w-4" />
                    {isRunning ? "Running..." : "Run"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CodeEditor language={currentLanguage} value={currentCode} onChange={onCodeChange} height="400px" />
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Test Results</h3>
            </CardHeader>
            <CardContent>
              {!testResults ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Run your code to see test results</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {passedTests}/{totalTests} tests passed
                    </span>
                    <Badge variant={passedTests === totalTests ? "default" : "destructive"}>
                      {passedTests === totalTests ? "All Passed" : "Some Failed"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {testResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-3 rounded-lg border ${
                          result.passed
                            ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                            : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Test {index + 1}</span>
                          <div className="flex items-center space-x-2">
                            {result.executionTime && (
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {result.executionTime}ms
                              </span>
                            )}
                            {result.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </div>
                        <div className="text-xs space-y-1">
                          <div>
                            <span className="text-muted-foreground">Input:</span>
                            <pre className="mt-1 p-2 bg-muted rounded text-xs font-mono">{result.input}</pre>
                          </div>
                          {!result.passed && (
                            <>
                              <div>
                                <span className="text-muted-foreground">Expected:</span>
                                <pre className="mt-1 p-2 bg-muted rounded text-xs font-mono">
                                  {result.expectedOutput}
                                </pre>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Got:</span>
                                <pre className="mt-1 p-2 bg-muted rounded text-xs font-mono">{result.actualOutput}</pre>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={onSubmit}
            className="w-full trivio-button"
            disabled={!testResults || passedTests !== totalTests}
          >
            Submit Solution
          </Button>
        </div>
      </div>
    </div>
  )
}
