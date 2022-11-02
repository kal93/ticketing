import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnAuthoriedError } from '../errors/unauthorized-error';
/**
 * @description Determines whether or not user is logged in. Used as middleware for api routes.
 * @param req
 * @param res
 * @param next
 * @returns req with currentUser object appended.
 */
export const requireAuthMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnAuthoriedError();
  }
  next();
};
