export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
    read: boolean;
    responded: boolean;
};

export type ContactMessageInput = Pick<ContactMessage, "name" | "email" | "message">