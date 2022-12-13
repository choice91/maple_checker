import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import routes from './routes';

const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) >= 0 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.use((error, req, res, next) => {
  const errorStatus = error.statusCode || 500;

  res.status(errorStatus).json({
    message: 'Server Error',
    error,
  });
});

export default app;
