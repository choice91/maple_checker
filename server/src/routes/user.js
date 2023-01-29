import express from 'express';

import { asyncHandler, authJWT } from '../middlewares';
import userCtrl from '../controllers/user';

const userRouter = express.Router();

userRouter
  .route('/profile')
  .all(authJWT)
  .get(asyncHandler(userCtrl.getUserProfile));

export default userRouter;
