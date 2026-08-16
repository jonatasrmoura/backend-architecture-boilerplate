import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado.") {
    super(message, "RESOURCE_NOT_FOUND", 404);
  }
}
