import { z } from "zod";

export const RegisterUserSchema = z.object({

    name: z.string(),
    email: z.string().min(5).email(),
    password: z.string().min(8).max(32)

});

export type UserRequestData = z.infer<typeof RegisterUserSchema>