import express from 'express';
const log = console.log;

const router = express.Router();

router.post('/api/users/signOut', (req, res) => {
  res.status(200).send({
    msg: 'Hi there',
  });
});

export { router as signOutRouter };
