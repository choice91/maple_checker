import express from 'express';

import rootRouter from './root';
import questRouter from './quest';
import bossRouter from './boss';

const router = express.Router();

router.use('/', rootRouter);
router.use('/quest', questRouter);
router.use('/boss', bossRouter);

export default router;
