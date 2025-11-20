// utils/validator.ts

/**
 * Custom error class for validation failures.
 * This allows for specific error handling in API routes or other parts of the application.
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function requireBodyField(body: Record<string, unknown>, field: string): void {
  if (!body) {
    throw new ValidationError("Request body is missing.");
  }
  if (typeof body[field] === "undefined" || body[field] === null || (typeof body[field] === 'string' && (body[field] as string).trim() === "")) {
    throw new ValidationError(`Field '${field}' is required and cannot be empty.`);
  }
}
