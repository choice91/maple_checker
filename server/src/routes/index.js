import express from 'express';

import rootRouter from './root';
import todoRouter from './todo';
import bossRouter from './boss';

const router = express.Router();

router.use('/', rootRouter);
router.use('/todo', todoRouter);
router.use('/boss', bossRouter);

export default router;
