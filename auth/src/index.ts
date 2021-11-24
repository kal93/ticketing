import express from 'express';
import { json } from 'body-parser';
import chalk from 'chalk';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signUpRouter } from './routes/sign-up';
import { signOutRouter } from './routes/sign-out';
import { errorHandler } from './middlewares/error-handler';

const log = console.log;

const app = express();
app.use(json());

app.use(signUpRouter);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(errorHandler);

app.listen(3000, () => {
  log(chalk.bgGreenBright.black('Auth running on port 3000'));
});
