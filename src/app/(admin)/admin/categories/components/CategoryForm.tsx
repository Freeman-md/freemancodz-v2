'use client'

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { createCategory } from "@/lib/categories/actions"

export default function CategoryForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Category</Button>
      </DialogTrigger>
      <DialogContent aria-description="Create Category Form">
        <DialogTitle>Add Category</DialogTitle>
        <form ref={formRef} action={async (formData) => {
          await createCategory(formData)
          formRef.current?.reset()
        }} className="flex flex-col gap-4">
          <Input name="name" placeholder="Cateory name" required />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
