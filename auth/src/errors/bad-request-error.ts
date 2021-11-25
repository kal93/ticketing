import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;
  /**
   *
   */
  constructor(public message: string, public code: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [
      {
        code: this.code,
        message: this.message,
      },
    ];
  }
}
