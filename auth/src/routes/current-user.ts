import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUserMiddleWare } from '@ticketjd/common';
import { requireAuthMiddleWare } from '@ticketjd/common';

const log = console.log;

const router = express.Router();

router.get('/api/users/currentUser', currentUserMiddleWare, (req, res) => {
  const locale = req.headers['accept-language'];
  const locales = locale?.split(';').join(',').split(',');
  const currentUser = req.currentUser || null;
  res.status(200).send({ currentUser, locales });
});

export { router as currentUserRouter };
