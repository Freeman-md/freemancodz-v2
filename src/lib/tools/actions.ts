import { revalidatePath } from "next/cache"
import { supabase } from "../supabase"

export async function createTool(formData: FormData) {
    const name = formData.get("name") as string

    if (!name?.trim()) return

    await supabase.from("tools").insert({ name: name.trim() })
    revalidatePath('/admin/tools')
}

export async function deleteTool(name: string) {
    await supabase.from("tools").delete().eq("name", name)
    revalidatePath('/admin/tools')
}