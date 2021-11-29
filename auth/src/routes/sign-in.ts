import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequestMiddleWare } from '../middlewares/validate-request';
import { User } from '../models/user';
import { PasswordService } from '../services/password';
const log = console.log;

const router = express.Router();

router.post(
  '/api/users/signIn',
  [
    body('email').isEmail().withMessage('Email must be valid.'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must enter a password.'),
  ],
  validateRequestMiddleWare,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('User not authorized', 'UNAUHTORIZED');
    }
    const passwordMatch = await PasswordService.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentials', 'INVALID_CREDS');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! // ! tells typescript this env variable is defined. We added this check at the startup of app.
    );
    // Store it on session object in req. This will gets sent over in the cookie to browsers.
    req.session = { jwt: userJwt };
    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
