import express from 'express';

import { postJoin, idCheck, postLogin, logout } from '../controllers/user';
import authCtrl from '../controllers/auth';
import { home } from '../controllers/home';
import { asyncHandler, isLoggedIn } from '../middlewares';

const rootRouter = express.Router();

rootRouter.route('/').all(isLoggedIn).get(asyncHandler(home));
rootRouter.route('/login').post(asyncHandler(postLogin));
rootRouter.route('/logout').get(logout);
rootRouter.route('/join').post(asyncHandler(postJoin));
rootRouter.route('/id-check').post(asyncHandler(idCheck));
rootRouter.route('/refresh').get(asyncHandler(authCtrl.reissueToken));

export default rootRouter;
