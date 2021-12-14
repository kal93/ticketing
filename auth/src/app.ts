import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import chalk from 'chalk';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signUpRouter } from './routes/sign-up';
import { signOutRouter } from './routes/sign-out';
import { errorHandler, NotFoundError } from '@ticketjd/common';

const log = console.log;

const app = express();
// Set  trust proxy because traffic is being proxied to this app thro' ingress-nginx load balancer.
// Express is aware by default of proxy connections. So make it trusted one.
app.set('trust proxy', true);
app.use(json());

const ISDEV = process.env.NODE_ENV === 'dev';
const ISTEST = process.env.NODE_ENV === 'test';

const ISPROD = ISDEV || ISTEST ? false : true;

app.use(
  cookieSession({
    // disable encryption as we'll be using JWT inside the cookie
    signed: false,
    secure: ISPROD, // setting it to true only allows for https connections.
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

export { app };
