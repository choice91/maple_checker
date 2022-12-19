import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import { addCharacterToBossDB } from '../controllers/boss';

const bossRouter = express.Router();

bossRouter.route('/').all(authJWT).post(asyncHandler(addCharacterToBossDB));

export default bossRouter;
