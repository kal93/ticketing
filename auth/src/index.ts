import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signUpRouter } from './routes/sign-up';
import { signOutRouter } from './routes/sign-out';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const log = console.log;

const app = express();
app.use(json());

app.use(signUpRouter);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/auth');
    // await mongoose.connect('mongodb://auth-mongo-srv:27017/auth'); // check cluster ip service for mongodb for url
    log('Connected to Mongo DB');
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    log(chalk.bgGreenBright.bold.black('\t\n Auth running on port 3000 \n'));
  });
};

start();
