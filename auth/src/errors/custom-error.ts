import { ValidationError } from 'express-validator';

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    code: string;
    field?: string;
    value?: string;
    message: string;
    description?: string;
  }[];
}
