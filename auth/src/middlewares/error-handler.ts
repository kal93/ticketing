import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

const log = console.log;

/**
 * This is an error handling middleware. Express distinguishes between normal middleware and error handling one
 * based on number of arguments. Error handling middleware has err as first argument.This is an error capturing middleware.
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ errors: err.serializeErrors(), warnings: [], messages: [] });
  }
  res.status(400).send({
    errors: [{ message: 'Something went wrong.' }],
    warnings: [],
    messages: [],
  });
};
