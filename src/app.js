import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import routes from './routes/index.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use('/static', express.static(process.cwd() + '/src/client'));
app.use('/', routes);

export default app;
