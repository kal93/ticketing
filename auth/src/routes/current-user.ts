import express from 'express';
const log = console.log;

const router = express.Router();

router.get('/api/users/currentUser', (req, res) => {
  const locale = req.headers['accept-language'];
  const locales = locale?.split(';').join(',').split(',');
  res.status(200).send({
    msg: 'Hi there....',
    locales,
  });
});

export { router as currentUserRouter };
