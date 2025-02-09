"use client"

import type React from "react"
import { useRef, type FormEvent } from "react"
import RichTextEditor, { type RichTextEditorRef } from "./RichTextEditor"

const ExampleForm: React.FC = () => {
  const editorRef = useRef<RichTextEditorRef>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const content = editorRef.current?.getContent()
    console.log("Submitted content:", content)
    // Here you would typically send the content to your server
    // For example: await fetch('/api/submit', { method: 'POST', body: JSON.stringify({ content }) });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Example Form</h2>
      <RichTextEditor ref={editorRef} initialValue="<p>Start typing here...</p>" />
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  )
}

export default ExampleForm

