import express from 'express';

import rootRoutes from './root.js';

import { localsMiddleware } from '../middlewares.js';

const router = express.Router();

router.use(localsMiddleware);
router.use('/', rootRoutes);

export default router;
