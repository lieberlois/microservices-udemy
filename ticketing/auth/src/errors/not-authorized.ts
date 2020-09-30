import { CustomError } from "./custom-error";

export class NotAuthorized extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not authorized");

    // Extending built in class
    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
