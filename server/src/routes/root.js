import express from 'express';

import {
  getJoin,
  postJoin,
  idCheck,
  getLogin,
  postLogin,
  logout,
} from '../controllers/user';
import { home } from '../controllers/home';
import { asyncHandler, isLoggedIn } from '../middlewares';

const rootRouter = express.Router();

rootRouter.route('/').all(isLoggedIn).get(asyncHandler(home));
rootRouter.route('/login').get(getLogin).post(asyncHandler(postLogin));
rootRouter.route('/logout').get(logout);
rootRouter.route('/join').get(getJoin).post(asyncHandler(postJoin));
rootRouter.route('/id-check').post(asyncHandler(idCheck));

// module.exports = rootRouter;
export default rootRouter;
