import express from 'express';
import { json } from 'body-parser';
import chalk from 'chalk';

const log = console.log;

const app = express();
app.use(json());

app.get('/api/users/currentUser', (req, res) => {
  res.status(200).send('Hi there');
});
app.listen(9000, () => {
  log(chalk.bgGreenBright.black('Auth running on port 9000'));
});
