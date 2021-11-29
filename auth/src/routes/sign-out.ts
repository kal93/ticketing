import express from 'express';
import cookieSession from 'cookie-session';
const log = console.log;

const router = express.Router();

router.post('/api/users/signOut', (req, res) => {
  req.session = null;
  res.status(200).send({});
});

export { router as signOutRouter };
