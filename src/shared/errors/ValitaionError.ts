import { AppError } from "./AppError";

export class ValitaionError extends AppError {
  constructor(message: string, details?: Array<unknown>) {
    super(message, "VALIDATION_ERROR", 400, details);
    Object.setPrototypeOf(this, ValitaionError.prototype);
  }
}
