"use server"

import { supabase } from "../supabase";

export async function markContactMessageAsRead(id: string) {
    const { error } = await supabase.from("contact_messages").update({ read: true }).eq("id", id);

    if (error) throw error;

    return true;
}