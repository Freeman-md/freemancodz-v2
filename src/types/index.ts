export type FormState = {
    success: boolean;
    errors: Record<string, string[]>;
    values: Record<string, unknown>;
}