import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user';
import { BadRequestError, validateRequestMiddleWare } from '@ticketjd/common';

const log = console.log;

const router = express.Router();

router.post(
  '/api/users/signUp',
  // middleware run in sequence
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequestMiddleWare,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already in use', 'EMAIL_IN_USE');
    }
    const user = User.build({ email, password });
    await user.save();
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! // ! tells typescript this env variable is defined. We added this check at the startup of app.
    );
    // Store it on session object in req
    req.session = { jwt: userJwt };
    res.status(201).send(user);
  }
);

export { router as signUpRouter };
