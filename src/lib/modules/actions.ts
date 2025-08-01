"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "../supabase"

export async function createModule(formData: FormData) {
    const name = formData.get("name") as string

    if (!name?.trim()) return

    await supabase.from("modules").insert({ name: name.trim() })
    revalidatePath('/admin/modules')
}

export async function deleteModule(name: string) {
    await supabase.from("modules").delete().eq("name", name)
    revalidatePath('/admin/modules')
}