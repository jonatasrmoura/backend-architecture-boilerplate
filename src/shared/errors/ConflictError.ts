import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message = "Conflito de recursos.") {
    super(message, "RESOURCE_CONFLICT", 409);
  }
}
