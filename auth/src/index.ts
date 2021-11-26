import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import chalk from 'chalk';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signUpRouter } from './routes/sign-up';
import { signOutRouter } from './routes/sign-out';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const log = console.log;

const app = express();
// Set  trust proxy because traffic is being proxied to this app thro' ingress-nginx load balancer.
// Express is aware by default of proxy connections. So make it trusted one.
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // disable encryption as we'll be using JWT inside the cookie
    signed: false,
    secure: false, // setting it to true only allows for https connections
  })
);

app.use(signUpRouter);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  // Before starting the app, throw an error if env variable is not set
  if (!process.env.JWT_KEY) {
    throw new Error(
      'Env variable JWT_KEY must be defined.Verify depl yaml files and k8 secrets.'
    );
  }
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/auth');
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth'); // check cluster ip service for mongodb for url
    log('Connected to Mongo DB');
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    log(chalk.bgGreenBright.bold.black('\t\n Auth running on port 3000 \n'));
  });
};

start();
