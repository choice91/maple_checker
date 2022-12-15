import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import {
  questComplete,
  getDailyQuest,
  saveNickname,
  deleteCharacter,
} from '../controllers/quest';

const questRouter = express.Router();

questRouter
  .route('/')
  .all(authJWT)
  .get(asyncHandler(getDailyQuest))
  .post(asyncHandler(questComplete));
questRouter.route('/:nickname').all(authJWT).delete(deleteCharacter);
questRouter.route('/nickname').all(authJWT).post(asyncHandler(saveNickname));

export default questRouter;
