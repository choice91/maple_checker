import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import todoCtrl from '../controllers/todo';

const todoRouter = express.Router();

todoRouter
  .route('/')
  .all(authJWT)
  .get(asyncHandler(todoCtrl.getTodoData))
  .post(asyncHandler(todoCtrl.addCharacter));
todoRouter.route('/check').all(authJWT).post(asyncHandler(todoCtrl.todoCheck));
todoRouter
  .route('/reset')
  .all(authJWT)
  .post(asyncHandler(todoCtrl.resetQuestData));
todoRouter
  .route('/:todoId')
  .all(authJWT)
  .put(asyncHandler(todoCtrl.updateNickname))
  .delete(asyncHandler(todoCtrl.deleteCharacter));

export default todoRouter;
