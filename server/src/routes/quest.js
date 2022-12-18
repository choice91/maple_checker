import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import {
  questComplete,
  getDailyQuest,
  addCharacter,
  updateNickname,
  deleteCharacter,
} from '../controllers/quest';

const questRouter = express.Router();

questRouter
  .route('/')
  .all(authJWT)
  .get(asyncHandler(getDailyQuest))
  .post(asyncHandler(addCharacter))
  .put(asyncHandler(updateNickname));
questRouter
  .route('/:questId')
  .all(authJWT)
  .delete(asyncHandler(deleteCharacter));
questRouter.route('/done').all(authJWT).post(asyncHandler(questComplete));

export default questRouter;
