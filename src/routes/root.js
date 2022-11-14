const express = require('express');

const { getLogin } = require('../controllers/root');

const rootRouter = express.Router();

rootRouter.get('/', getLogin);

module.exports = rootRouter;
