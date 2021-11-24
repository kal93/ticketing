import { Request, Response, NextFunction } from 'express';
const log = console.log;

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log('Oooppsss....');
  res.status(400).send({ message: err.message });
};
