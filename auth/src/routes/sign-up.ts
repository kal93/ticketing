import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const log = console.log;

const router = express.Router();

router.post(
  '/api/users/signUp',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error('wrong!!!!');
    }
    throw new Error('error connnecting to db...');
    const { email, password } = req.body;
    // res.status(200).send({
    //   msg: 'Hi there',
    // });
  }
);

export { router as signUpRouter };
