import { z } from "zod";

const signInValidate = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signUpValidate = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignUpSchema = z.infer<typeof signUpValidate>;
type SigninSchema = z.infer<typeof signInValidate>;

export { signInValidate, signUpValidate, type SigninSchema, type SignUpSchema };
