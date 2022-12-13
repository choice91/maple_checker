import express from 'express';

import { asyncHandler, authJWT, isLoggedIn } from '../middlewares';
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
questRouter
  .route('/nickname')
  .all(isLoggedIn)
  .post(asyncHandler(saveNickname))
  .delete(asyncHandler(deleteCharacter));

export default questRouter;
