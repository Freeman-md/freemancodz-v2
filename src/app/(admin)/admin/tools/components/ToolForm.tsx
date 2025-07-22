"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"

export function ToolForm({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState("")

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim())
      setName("")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Tool</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Tool</DialogTitle>
        <div className="flex flex-col gap-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tool name" />
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
