import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "minimum 4 character" })
      .max(24, { message: "maximum 24 character" })
      .regex(/^[a-zA-Z]/, { message: "must start with a letter" }),
    password: z
      .string()
      .min(8, { message: "minimum 8 character" })
      .max(24, { message: "maximum 24 character" })
      .regex(/[a-z]/, { message: "must include at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "must include at least one uppercase letter" })
      .regex(/\d/, { message: "must include at least one number" })
      .regex(/[!@#$%]/, {
        message: "must include at least one special character: ! @ # $ %",
      }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "password doe's not match",
    path: ["confirmPassword"],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;
