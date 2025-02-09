import type React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface PastePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  originalContent: string
  cleanedContent: string
  onPaste: (content: string) => void
}

const PastePreviewModal: React.FC<PastePreviewModalProps> = ({
  isOpen,
  onClose,
  originalContent,
  cleanedContent,
  onPaste,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Paste Preview</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Original Content</h3>
              <div className="border p-2 h-64 overflow-auto" dangerouslySetInnerHTML={{ __html: originalContent }} />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Cleaned Content</h3>
              <div className="border p-2 h-64 overflow-auto" dangerouslySetInnerHTML={{ __html: cleanedContent }} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onPaste(originalContent)}>Paste Original</Button>
          <Button onClick={() => onPaste(cleanedContent)}>Paste Cleaned</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PastePreviewModal

