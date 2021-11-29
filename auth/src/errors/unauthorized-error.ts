import { CustomError } from './custom-error';

export class UnAuthoriedError extends CustomError {
  statusCode = 401;
  message = 'Unathorized';

  constructor() {
    super('UnAuthorized');
    Object.setPrototypeOf(this, UnAuthoriedError.prototype);
  }

  serializeErrors() {
    return [
      {
        code: 'UNAUTHORIZED',
        message: 'Unauthorized.',
      },
    ];
  }
}
