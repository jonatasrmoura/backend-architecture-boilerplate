import { z } from "zod";
import { isValidCPF } from "@modules/users/utils/isValidCPF";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email({ message: "Invalid email format" }),
  document: z.string().refine((val) => isValidCPF(val), {
    message: "Invalid CPF document format or digits",
  }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
