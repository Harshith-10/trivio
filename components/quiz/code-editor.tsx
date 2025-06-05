"use client"

import { useEffect, useState } from "react"
import { basicSetup } from "codemirror"
import { EditorView } from "@codemirror/view"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { java } from "@codemirror/lang-java"
import { cpp } from "@codemirror/lang-cpp"
import { useTheme } from "next-themes"
import { trivioLightTheme, trivioDarkTheme, trivioLightSyntaxTheme } from "./code-editor-themes"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  height?: string
  readOnly?: boolean
}

export function CodeEditor({ language, value, onChange, height = "300px", readOnly = false }: CodeEditorProps) {
  const { theme, resolvedTheme } = useTheme()
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

    // Determine if we should use dark theme
    const isDark = resolvedTheme === "dark" || theme === "dark"

    // Create theme extensions based on current theme
    const themeExtensions = isDark ? [trivioDarkTheme] : [trivioLightTheme, trivioLightSyntaxTheme]

    // Create editor view
    const view = new EditorView({
      doc: value,
      extensions: [
        basicSetup,
        getLanguageExtension(language),
        ...themeExtensions,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString())
          }
        }),
        EditorView.theme({
          "&": {
            height: height,
            borderRadius: "0.375rem",
          },
          ".cm-scroller": {
            fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
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
  }, [editorElement, language, theme, resolvedTheme, height, readOnly])

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
    <div className="relative border rounded-md overflow-hidden bg-background">
      <div ref={setEditorElement} className="w-full overflow-auto" style={{ height }} />
      <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded border">
        {language}
      </div>
    </div>
  )
}
