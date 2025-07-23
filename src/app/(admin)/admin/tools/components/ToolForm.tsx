'use client'

import { createTool } from "@/lib/tools/actions"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react"

export default function ToolForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Tool</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Tool</DialogTitle>
        <form ref={formRef} action={async (formData) => {
          await createTool(formData)
          formRef.current?.reset()
        }} className="flex flex-col gap-4">
          <Input name="name" placeholder="Tool name" required />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
