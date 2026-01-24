import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").trim(),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .trim(),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
