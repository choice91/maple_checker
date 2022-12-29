import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import questCtrl from '../controllers/quest';

const questRouter = express.Router();

questRouter
  .route('/')
  .all(authJWT)
  .get(asyncHandler(questCtrl.getQuestData))
  .post(asyncHandler(questCtrl.addCharacter));
questRouter
  .route('/done')
  .all(authJWT)
  .post(asyncHandler(questCtrl.questComplete));
questRouter
  .route('/reset')
  .all(authJWT)
  .post(asyncHandler(questCtrl.resetQuestData));
questRouter
  .route('/:questId')
  .all(authJWT)
  .put(asyncHandler(questCtrl.updateNickname))
  .delete(asyncHandler(questCtrl.deleteCharacter));

export default questRouter;
