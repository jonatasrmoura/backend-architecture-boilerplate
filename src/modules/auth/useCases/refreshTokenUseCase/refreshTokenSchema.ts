import { z } from "zod";

export const refreshTokenSchema = z.object({
  refresh_token: z.uuid("Refresh token inválido"),
});

export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>;
