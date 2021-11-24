import express from 'express';
const log = console.log;

const router = express.Router();

router.get('/api/users/currentUser', (req, res) => {
  res.status(200).send({
    msg: 'Hi there',
  });
});

export { router as currentUserRouter };
