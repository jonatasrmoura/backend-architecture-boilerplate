import { z } from "zod";

export const itemByIdSchema = z.object({
  id: z.uuid("Invalid param!"),
});

export type ItemId = z.infer<typeof itemByIdSchema>;
