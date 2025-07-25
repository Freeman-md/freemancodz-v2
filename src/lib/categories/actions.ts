"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "../supabase"

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string

    if (!name?.trim()) return

    await supabase.from("categories").insert({ name: name.trim() })
    revalidatePath('/admin/categories')
}

export async function deleteCategory(name: string) {
    await supabase.from("categories").delete().eq("name", name)
    revalidatePath('/admin/categories')
}