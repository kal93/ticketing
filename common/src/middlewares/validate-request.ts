import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

/**
 * This is a normal express middleware. Here we're trying to produce/throw an error not capture it.
 * Capturing is done by error handling middleware.
 * @param req
 * @param res
 * @param next
 */
export const validateRequestMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};
