import { z } from "zod";

export const itemByIdSchema = z.object({
  id: z.uuid("Invalid param!"),
});

export type ItemById = z.infer<typeof itemByIdSchema>;
