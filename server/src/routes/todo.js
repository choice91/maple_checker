import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import todoCtrl from '../controllers/todo';

const todoRouter = express.Router();

todoRouter
  .route('/quest')
  .all(authJWT)
  .get(asyncHandler(todoCtrl.getQuestData))
  .post(asyncHandler(todoCtrl.addCharacter));
todoRouter
  .route('/quest/done')
  .all(authJWT)
  .post(asyncHandler(todoCtrl.questComplete));
todoRouter
  .route('/quest/reset')
  .all(authJWT)
  .post(asyncHandler(todoCtrl.resetQuestData));
todoRouter
  .route('/quest/:questId')
  .all(authJWT)
  .put(asyncHandler(todoCtrl.updateNickname))
  .delete(asyncHandler(todoCtrl.deleteCharacter));

export default todoRouter;
