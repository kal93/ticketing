import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
import chalk from 'chalk';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  /**
   *
   */
  constructor(public errors: ValidationError[]) {
    super(chalk.red('Invalid request parameters.')); // Passing in string only for loggin purposes i.e throw new Error()
    // Needed only because we're extending a typescript class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((e) => {
      return {
        code: 'REQUEST_VALIDATION_ERR',
        field: e.param,
        value: e.value,
        message: e.msg,
      };
    });
  }
}
