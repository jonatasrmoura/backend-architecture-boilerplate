import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "Não autorizado.") {
    super(message, "AUTH_UNAUTHORIZED", 401);
  }
}
