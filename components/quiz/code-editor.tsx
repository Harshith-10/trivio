"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  height?: string
  readOnly?: boolean
}

export function CodeEditor({ language, value, onChange, height = "300px", readOnly = false }: CodeEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.height = height
    }
  }, [height])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newValue = value.substring(0, start) + "  " + value.substring(end)
      onChange(newValue)

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  return (
    <div className="relative">
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        className="w-full p-4 font-mono text-sm bg-muted border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
        style={{ height }}
        placeholder={`Write your ${language} code here...`}
        spellCheck={false}
      />
      <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
        {language}
      </div>
    </div>
  )
}
