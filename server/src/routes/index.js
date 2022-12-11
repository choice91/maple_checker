import express from 'express';

import rootRouter from './root';
import questRouter from './quest';

const router = express.Router();

router.use('/', rootRouter);
router.use('/quest', questRouter);

export default router;
