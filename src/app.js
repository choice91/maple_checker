const express = require('express');
const logger = require('morgan');
const path = require('path');

const routes = require('./routes/index');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'client')));

app.use('/', routes);

app.get('/', (req, res, next) => {
  res.render('login');
});

module.exports = app;
