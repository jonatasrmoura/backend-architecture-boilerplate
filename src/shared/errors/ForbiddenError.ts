import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
  constructor(message = "Acesso negado ao recurso.") {
    super(message, "FORBIDDEN", 403);
  }
}
