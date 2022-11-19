const express = require('express');

const rootRoutes = require('./root');

const { localsMiddleware } = require('../middlewares');

const router = express.Router();

router.use(localsMiddleware);
router.use('/', rootRoutes);

module.exports = router;
