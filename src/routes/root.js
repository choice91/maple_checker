const express = require('express');

const {
  getJoin,
  postJoin,
  idCheck,
  getLogin,
  postLogin,
} = require('../controllers/user');

const rootRouter = express.Router();

rootRouter.route('/login').get(getLogin).post(postLogin);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/id-check').post(idCheck);

module.exports = rootRouter;
