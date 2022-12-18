import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import {
  questComplete,
  getDailyQuest,
  saveNickname,
  updateNickname,
  deleteCharacter,
} from '../controllers/quest';

const questRouter = express.Router();

questRouter
  .route('/')
  .all(authJWT)
  .get(asyncHandler(getDailyQuest))
  .post(asyncHandler(questComplete))
  .put(asyncHandler(updateNickname));
questRouter
  .route('/:questId')
  .all(authJWT)
  .delete(asyncHandler(deleteCharacter));
questRouter.route('/nickname').all(authJWT).post(asyncHandler(saveNickname));

export default questRouter;
