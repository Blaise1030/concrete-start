import { z } from "zod";

type TLoginSchema = z.infer<typeof LoginSchema>;
const LoginSchema = z.object({
  email: z.string().email('Has to be valid email').min(1, "Your email is required."),
  password: z.string().min(6, "Password has to be more than 6 characters."),
});


export { type TLoginSchema, LoginSchema }