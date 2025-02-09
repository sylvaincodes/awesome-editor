"use client"
import { forwardRef, useImperativeHandle, useRef } from "react"
import AwesomeEditor from "./AwesomeEditor"

export interface RichTextEditorRef {
  getContent: () => string
  setContent: (content: string) => void
}

const RichTextEditor = forwardRef<
  RichTextEditorRef,
  { value?: string; onChange?: (value: string) => void; className?: string }
>(({ value = "", onChange, className }, ref) => {
  const editorRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current?.innerHTML || "",
    setContent: (newContent: string) => {
      editorRef.current?.innerHTML = newContent
    },
  }))

  return <AwesomeEditor value={value} onChange={onChange} className={className} ref={editorRef} />
})

RichTextEditor.displayName = "RichTextEditor"

export default RichTextEditor

