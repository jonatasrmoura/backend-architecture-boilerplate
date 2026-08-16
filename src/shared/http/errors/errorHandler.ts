import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { ErrorDetail, StandardErrorResponse } from "./errorSchemas";
import { AppError } from "./AppError";

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    const details: Array<ErrorDetail> = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    const response: StandardErrorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Dados de entrada incorretos.",
        details,
      },
    };

    return reply.status(400).send(response);
  }

  if (error instanceof AppError) {
    const response: StandardErrorResponse = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details as
          | Array<{ field: string; message: string }>
          | undefined,
      },
    };

    return reply.status(error.statusCode).send(response);
  }

  console.error("🔥 Unhandled Error:", error);
  const response: StandardErrorResponse = {
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Ocorreu um erro interno no servidor.",
    },
  };

  return reply.status(500).send(response);
}
