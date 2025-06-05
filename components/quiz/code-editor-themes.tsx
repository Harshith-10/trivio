import { EditorView } from "@codemirror/view"

// Light theme matching our design system
export const trivioLightTheme = EditorView.theme(
  {
    "&": {
      color: "hsl(var(--foreground))",
      backgroundColor: "hsl(var(--background))",
      fontSize: "14px",
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    },
    ".cm-content": {
      caretColor: "hsl(var(--primary))",
      padding: "16px",
      minHeight: "100%",
    },
    ".cm-focused": {
      outline: "2px solid hsl(var(--ring))",
      outlineOffset: "2px",
    },
    ".cm-focused .cm-cursor": {
      borderLeftColor: "hsl(var(--primary))",
      borderLeftWidth: "2px",
    },
    ".cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "hsl(var(--primary) / 0.2)",
    },
    ".cm-selectionBackground": {
      backgroundColor: "hsl(var(--muted))",
    },
    ".cm-gutters": {
      backgroundColor: "hsl(var(--muted) / 0.5)",
      color: "hsl(var(--muted-foreground))",
      border: "none",
      borderRight: "1px solid hsl(var(--border))",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
    },
    ".cm-activeLine": {
      backgroundColor: "hsl(var(--accent) / 0.5)",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 8px",
      minWidth: "32px",
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "hsl(var(--muted))",
      border: "1px solid hsl(var(--border))",
      color: "hsl(var(--muted-foreground))",
    },
    ".cm-tooltip": {
      backgroundColor: "hsl(var(--popover))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "6px",
      color: "hsl(var(--popover-foreground))",
    },
    ".cm-searchMatch": {
      backgroundColor: "hsl(var(--primary) / 0.2)",
      outline: "1px solid hsl(var(--primary))",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "hsl(var(--primary) / 0.4)",
    },
  },
  { dark: false },
)

// Dark theme matching our design system
export const trivioDarkTheme = EditorView.theme(
  {
    "&": {
      color: "hsl(var(--foreground))",
      backgroundColor: "hsl(var(--background))",
      fontSize: "14px",
      fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    },
    ".cm-content": {
      caretColor: "hsl(var(--primary))",
      padding: "16px",
      minHeight: "100%",
    },
    ".cm-focused": {
      outline: "2px solid hsl(var(--ring))",
      outlineOffset: "2px",
    },
    ".cm-focused .cm-cursor": {
      borderLeftColor: "hsl(var(--primary))",
      borderLeftWidth: "2px",
    },
    ".cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "hsl(var(--primary) / 0.3)",
    },
    ".cm-selectionBackground": {
      backgroundColor: "hsl(var(--muted))",
    },
    ".cm-gutters": {
      backgroundColor: "hsl(var(--muted) / 0.3)",
      color: "hsl(var(--muted-foreground))",
      border: "none",
      borderRight: "1px solid hsl(var(--border))",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
    },
    ".cm-activeLine": {
      backgroundColor: "hsl(var(--accent) / 0.3)",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 8px",
      minWidth: "32px",
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "hsl(var(--muted))",
      border: "1px solid hsl(var(--border))",
      color: "hsl(var(--muted-foreground))",
    },
    ".cm-tooltip": {
      backgroundColor: "hsl(var(--popover))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "6px",
      color: "hsl(var(--popover-foreground))",
    },
    ".cm-searchMatch": {
      backgroundColor: "hsl(var(--primary) / 0.2)",
      outline: "1px solid hsl(var(--primary))",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "hsl(var(--primary) / 0.4)",
    },
    // Dark-specific syntax highlighting adjustments
    ".cm-keyword": { color: "#ff79c6" },
    ".cm-atom": { color: "#bd93f9" },
    ".cm-number": { color: "#bd93f9" },
    ".cm-def": { color: "#50fa7b" },
    ".cm-variable": { color: "#f8f8f2" },
    ".cm-variable-2": { color: "#8be9fd" },
    ".cm-variable-3": { color: "#ffb86c" },
    ".cm-property": { color: "#50fa7b" },
    ".cm-operator": { color: "#ff79c6" },
    ".cm-comment": { color: "#6272a4" },
    ".cm-string": { color: "#f1fa8c" },
    ".cm-string-2": { color: "#f1fa8c" },
    ".cm-meta": { color: "#f8f8f2" },
    ".cm-qualifier": { color: "#50fa7b" },
    ".cm-builtin": { color: "#8be9fd" },
    ".cm-bracket": { color: "#f8f8f2" },
    ".cm-tag": { color: "#ff79c6" },
    ".cm-attribute": { color: "#50fa7b" },
    ".cm-hr": { color: "#f8f8f2" },
    ".cm-link": { color: "#8be9fd" },
  },
  { dark: true },
)

// Light theme syntax highlighting
export const trivioLightSyntaxTheme = EditorView.theme(
  {
    ".cm-keyword": { color: "#d73a49" },
    ".cm-atom": { color: "#005cc5" },
    ".cm-number": { color: "#005cc5" },
    ".cm-def": { color: "#6f42c1" },
    ".cm-variable": { color: "#24292e" },
    ".cm-variable-2": { color: "#005cc5" },
    ".cm-variable-3": { color: "#e36209" },
    ".cm-property": { color: "#005cc5" },
    ".cm-operator": { color: "#d73a49" },
    ".cm-comment": { color: "#6a737d" },
    ".cm-string": { color: "#032f62" },
    ".cm-string-2": { color: "#032f62" },
    ".cm-meta": { color: "#24292e" },
    ".cm-qualifier": { color: "#6f42c1" },
    ".cm-builtin": { color: "#005cc5" },
    ".cm-bracket": { color: "#24292e" },
    ".cm-tag": { color: "#22863a" },
    ".cm-attribute": { color: "#6f42c1" },
    ".cm-hr": { color: "#24292e" },
    ".cm-link": { color: "#005cc5" },
  },
  { dark: false },
)
