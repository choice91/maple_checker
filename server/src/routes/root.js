import express from 'express';

import { postJoin, idCheck, postLogin, logout } from '../controllers/user';
import { home } from '../controllers/home';
import { asyncHandler, isLoggedIn } from '../middlewares';

const rootRouter = express.Router();

rootRouter.route('/').all(isLoggedIn).get(asyncHandler(home));
rootRouter.route('/login').post(asyncHandler(postLogin));
rootRouter.route('/logout').get(logout);
rootRouter.route('/join').post(asyncHandler(postJoin));
rootRouter.route('/id-check').post(asyncHandler(idCheck));

export default rootRouter;
