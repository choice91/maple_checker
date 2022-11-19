const express = require('express');

const {
  getJoin,
  postJoin,
  idCheck,
  getLogin,
  postLogin,
  logout,
} = require('../controllers/user');
const { home } = require('../controllers/home');
const { isLoggedIn } = require('../middlewares');

const rootRouter = express.Router();

rootRouter.route('/').all(isLoggedIn).get(home);
rootRouter.route('/login').get(getLogin).post(postLogin);
rootRouter.route('/logout').get(logout);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/id-check').post(idCheck);

module.exports = rootRouter;
