"use server"

import { revalidatePath } from "next/cache";
import { supabase } from "../supabase";
import { z } from 'zod'
import { ContactMessageInput } from "@/types/contact-message";
import { createClient } from "@/utils/supabase/client";
import { FormState } from "@/types";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const ContactMessageSchema = z.object({
    name: z.string().min(3, "Your name is required"),
    email: z.string().email("Your email is invalid"),
    message: z.string().min(10, "Your message must contain at least 10 character(s)"),
})

const resend = new Resend(process.env.RESEND_API_KEY);

export async function markContactMessageAsRead(id: string) {
    const { error } = await supabase.from("contact_messages").update({ read: true }).eq("id", id);

    if (error) throw error;

    revalidatePath('/admin/contact-messages')
}

export async function submitContactMessage(prevState: FormState, formData: FormData) {
    const { success, error: safeParseError, data: contactMessage } = ContactMessageSchema.safeParse({
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        message: formData.get("message")?.toString() || "",
    })

    if (!success) {
        return {
            success,
            errors: safeParseError.flatten().fieldErrors as Record<string, string[]>,
            values: contactMessage as unknown as ContactMessageInput
        }
    }

    const supabase = createClient()

    const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert(contactMessage)

    if (supabaseError) {
        return {
            success: false,
            errors: { form: ["Your message was not sent."] } as Record<string, string[]>,
            values: contactMessage as unknown as ContactMessageInput
        };
    }

    await resend.emails.send({
        from: 'Freeman Contact <contact@freemanmadudili.com>',
        to: ['freemanmadudili@gmail.com'],
        subject: `New message from ${contactMessage.name}`,
        replyTo: contactMessage.email,
        react: EmailTemplate(contactMessage)
    });


    return {
        success: true,
        errors: {},
        values: {}
    }

}