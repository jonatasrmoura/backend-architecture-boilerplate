import z from "zod";

export const paginationQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive("Página deve ser maior que 0")
    .default(1),
  limit: z.coerce
    .number()
    .int()
    .positive("Limite deve ser maior que 0")
    .max(100, "O limite máximo é 100 registros")
    .default(20),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
