import express from 'express';

import rootRouter from './root';
import todoRouter from './todo';
import bossRouter from './boss';
import userRouter from './user';

const router = express.Router();

router.use('/', rootRouter);
router.use('/todo', todoRouter);
router.use('/boss', bossRouter);
router.use('/user', userRouter);

export default router;
