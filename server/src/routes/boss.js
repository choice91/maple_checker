import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import { addCharacterToBossDB, getBossData } from '../controllers/boss';

const bossRouter = express.Router();

bossRouter
  .route('/')
  .all(authJWT)
  .get(asyncHandler(getBossData))
  .post(asyncHandler(addCharacterToBossDB));

export default bossRouter;
