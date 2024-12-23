import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().refine(Boolean, { message: "username can't be empty" }),
  password: z.string().refine(Boolean, { message: "password can't be empty" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
