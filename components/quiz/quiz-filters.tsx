"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const categories = ["Science", "History", "Mathematics", "Arts & Culture", "Music", "Sports", "Technology", "Gaming"]

const difficulties = ["Easy", "Medium", "Hard"]

export function QuizFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [duration, setDuration] = useState([5, 60])
  const [questionCount, setQuestionCount] = useState([10, 50])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setSelectedDifficulties([...selectedDifficulties, difficulty])
    } else {
      setSelectedDifficulties(selectedDifficulties.filter((d) => d !== difficulty))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedDifficulties([])
    setDuration([5, 60])
    setQuestionCount([10, 50])
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedDifficulties.length > 0

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Badge variant="secondary">{selectedCategories.length + selectedDifficulties.length}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3 flex items-center">
            Categories
            {selectedCategories.length > 0 && (
              <Badge variant="outline" className="ml-2 text-xs">
                {selectedCategories.length}
              </Badge>
            )}
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Difficulty */}
        <div>
          <h3 className="font-medium mb-3 flex items-center">
            Difficulty
            {selectedDifficulties.length > 0 && (
              <Badge variant="outline" className="ml-2 text-xs">
                {selectedDifficulties.length}
              </Badge>
            )}
          </h3>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox
                  id={difficulty}
                  checked={selectedDifficulties.includes(difficulty)}
                  onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                />
                <Label htmlFor={difficulty} className="text-sm cursor-pointer">
                  {difficulty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Duration */}
        <div>
          <h3 className="font-medium mb-3">Duration (minutes)</h3>
          <div className="px-2">
            <Slider value={duration} onValueChange={setDuration} max={60} min={5} step={5} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{duration[0]} min</span>
              <span>{duration[1]} min</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Question Count */}
        <div>
          <h3 className="font-medium mb-3">Number of Questions</h3>
          <div className="px-2">
            <Slider
              value={questionCount}
              onValueChange={setQuestionCount}
              max={50}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{questionCount[0]} questions</span>
              <span>{questionCount[1]} questions</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Clear filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full" disabled={!hasActiveFilters}>
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
