import { z } from "zod";

export const createTokenSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
