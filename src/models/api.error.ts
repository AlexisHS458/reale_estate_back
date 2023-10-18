import { HttpStatus } from "../enums/http.enum.js";
export class ApiError extends Error {
  constructor(
    public status: HttpStatus,
    message: string,
    public meta?: object
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
