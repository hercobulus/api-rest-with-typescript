import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from '@shared/http/routes';
import createConnection from '@shared/typeorm';
import logger from '@shared/logger';
import errorHandler from './middlewares/errorHandler';
import { errors } from 'celebrate';

createConnection()
  .then(function () {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(routes);
    app.use(errors());
    app.use(errorHandler);

    app.listen(3333, () => {
      logger('Server started on port! 3333');
    });
  })
  .catch(function (e) {
    logger(e);
  });
