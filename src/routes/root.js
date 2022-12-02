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
import { isLoggedIn } from '../middlewares';

const rootRouter = express.Router();

rootRouter.route('/').all(isLoggedIn).get(home);
rootRouter.route('/login').get(getLogin).post(postLogin);
rootRouter.route('/logout').get(logout);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/id-check').post(idCheck);

// module.exports = rootRouter;
export default rootRouter;
