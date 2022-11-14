const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));

app.get('/', (req, res, next) => {
  res.render('login');
});

module.exports = app;
