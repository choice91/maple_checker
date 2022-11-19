import express from 'express';

import rootRoutes from './root';

import { localsMiddleware } from '../middlewares';

const router = express.Router();

router.use(localsMiddleware);
router.use('/', rootRoutes);

export default router;
