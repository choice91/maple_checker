import express from 'express';

import rootRoutes from './root';
import questRouter from './quest';

import { localsMiddleware } from '../middlewares';

const router = express.Router();

router.use(localsMiddleware);
router.use('/', rootRoutes);
router.use('/quest', questRouter);

export default router;
