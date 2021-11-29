import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 *
 */
interface UserPayLoad {
  email: string;
  id: string;
}

/**
 * Extend the existing type definition file (.d.ts) to update the type of Request to include
 * currentUser.
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayLoad;
    }
  }
}
/**
 * @description Determines whether or not user is logged in. Used as middleware for api routes.
 * @param req
 * @param res
 * @param next
 * @returns req with currentUser object appended.
 */
export const currentUserMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payLoad = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayLoad; // provide information to ts to allow extension of existing type definition.
    req.currentUser = payLoad;
  } catch (error) {}
  next();
};
