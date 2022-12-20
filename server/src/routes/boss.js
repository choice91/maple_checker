import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import {
  addCharacterToBossDB,
  getBossData,
  bossCheck,
} from '../controllers/boss';

const bossRouter = express.Router();

bossRouter
  .route('/')
  .all(authJWT)
  .get(asyncHandler(getBossData))
  .post(asyncHandler(addCharacterToBossDB));
bossRouter.route('/done').all(authJWT).post(asyncHandler(bossCheck));

export default bossRouter;
