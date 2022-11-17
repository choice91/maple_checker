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

const rootRouter = express.Router();

rootRouter.get('/', getLogin);

rootRouter.get('/login', getLogin);
rootRouter.post('/login', postLogin);
rootRouter.get('/logout', logout);

rootRouter.get('/join', getJoin);
rootRouter.post('/join', postJoin);

rootRouter.post('/id-check', idCheck);

rootRouter.get('/home', home);

module.exports = rootRouter;
