import { CustomError } from './custom-error';
import chalk from 'chalk';
export class DbConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error while connecting to database.';
  /**
   *
   */
  constructor() {
    super(chalk.red('Error while connecting to database.')); // Passing in string only for loggin purposes i.e throw new Error()
    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        code: '',
        message: this.reason,
      },
    ];
  }
}
