import { ContactMessage } from "@/types/contact-message";
import { createClient } from "@/utils/supabase/server";

export async function getContactMessages(filter: "all" | "read" | "unread" = "all"): Promise<ContactMessage[]> {
    const supabase = await createClient()

    let query = supabase.from("contact_messages").select("*").order("inserted_at", { ascending: false });

    if (filter === "read") query = query.eq("read", true);
    
    if (filter === "unread") query = query.eq("read", false);

    const { data, error } = await query;

    if (error) throw error;

    return data as ContactMessage[] ?? [];
}
