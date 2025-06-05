"use client"

import { useEffect, useState } from "react"
import { basicSetup } from "codemirror"
import { EditorView } from "@codemirror/view"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { java } from "@codemirror/lang-java"
import { cpp } from "@codemirror/lang-cpp"
import { oneDark } from "@codemirror/theme-one-dark"
import { useTheme } from "next-themes"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  height?: string
  readOnly?: boolean
}

export function CodeEditor({ language, value, onChange, height = "300px", readOnly = false }: CodeEditorProps) {
  const { theme } = useTheme()
  const [editorElement, setEditorElement] = useState<HTMLDivElement | null>(null)
  const [editorView, setEditorView] = useState<EditorView | null>(null)

  // Get language extension based on selected language
  const getLanguageExtension = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
      case "js":
        return javascript()
      case "python":
      case "py":
        return python()
      case "java":
        return java()
      case "cpp":
      case "c++":
        return cpp()
      default:
        return javascript()
    }
  }

  // Initialize editor when the element is available
  useEffect(() => {
    if (!editorElement) return

    // Clean up any existing editor
    if (editorView) {
      editorView.destroy()
    }

    // Create theme extension
    const isDark = theme === "dark"
    const themeExtension = isDark ? [oneDark] : []

    // Create editor view
    const view = new EditorView({
      doc: value,
      extensions: [
        basicSetup,
        getLanguageExtension(language),
        ...themeExtension,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString())
          }
        }),
        EditorView.theme({
          "&": {
            height: height,
            fontSize: "14px",
            borderRadius: "0.375rem",
          },
          ".cm-scroller": {
            fontFamily: "monospace",
          },
          "&.cm-editor.cm-focused": {
            outline: "2px solid hsl(var(--ring))",
            outlineOffset: "2px",
          },
        }),
        EditorView.editable.of(!readOnly),
      ],
      parent: editorElement,
    })

    setEditorView(view)

    return () => {
      view.destroy()
    }
  }, [editorElement, language, theme])

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorView && value !== editorView.state.doc.toString()) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: value,
        },
      })
    }
  }, [value, editorView])

  return (
    <div className="relative border rounded-md overflow-hidden">
      <div
        ref={setEditorElement}
        className={`w-full ${theme === "dark" ? "bg-gray-900" : "bg-white"} overflow-auto`}
        style={{ height }}
      />
      <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
        {language}
      </div>
    </div>
  )
}
