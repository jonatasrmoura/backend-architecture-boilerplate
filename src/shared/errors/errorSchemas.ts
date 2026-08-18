import z from "zod";

// Shared API Error Details
export const ErrorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;

// Shared API Error Response Schema
export const StandardErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(ErrorDetailSchema).optional(),
  }),
});

export type StandardErrorResponse = z.infer<typeof StandardErrorResponseSchema>;

// HealthCheck Response Schema (Required by apps/api foundation)
export const HealthCheckResponseSchema = z.object({
  status: z.string(),
  timestamp: z.string().datetime().optional(),
});

export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;
