import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import {
  addCharacter,
  getBossData,
  bossCheck,
  deleteCharacter,
  updateNickname,
  resetBossData,
} from '../controllers/boss';

const bossRouter = express.Router();

bossRouter
  .route('/')
  .all(authJWT)
  .get(asyncHandler(getBossData))
  .post(asyncHandler(addCharacter));
bossRouter.route('/done').all(authJWT).post(asyncHandler(bossCheck));
bossRouter.route('/reset').all(authJWT).post(asyncHandler(resetBossData));
bossRouter
  .route('/:bossId')
  .all(authJWT)
  .put(asyncHandler(updateNickname))
  .delete(asyncHandler(deleteCharacter));

export default bossRouter;
