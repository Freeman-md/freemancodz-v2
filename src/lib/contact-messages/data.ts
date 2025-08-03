import { ContactMessage } from "@/types/contact-message";
import { supabase } from "../supabase";

export async function getContactMessages(filter: "all" | "read" | "unread" = "all"): Promise<ContactMessage[]> {
    let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false });

    if (filter === "read") query = query.eq("read", true);
    
    if (filter === "unread") query = query.eq("read", false);

    const { data, error } = await query;

    if (error) throw error;

    return data as ContactMessage[];
}
