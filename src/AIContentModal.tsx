"use client"

import type React from "react"
import { useState } from "react"

interface AIContentModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (prompt: string) => void
}

const AIContentModal: React.FC<AIContentModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    onGenerate(prompt)
    setPrompt("")
  }

  return (
    <div className="ai-content-modal">
      <h3>Generate AI Content</h3>
      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for AI content generation..."
          rows={4}
        />
        <div className="modal-actions">
          <button type="button" onClick={handleSubmit}>
            Generate
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIContentModal

