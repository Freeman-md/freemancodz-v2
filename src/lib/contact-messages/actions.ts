"use server"

import { revalidatePath } from "next/cache";
import { supabase } from "../supabase";

export async function markContactMessageAsRead(id: string) {
    const { error } = await supabase.from("contact_messages").update({ read: true }).eq("id", id);

    if (error) throw error;

    revalidatePath('/admin/contact-messages')
}