const express = require('express');

const rootRoutes = require('./root');

const router = express.Router();

router.use('/', rootRoutes);

module.exports = router;
