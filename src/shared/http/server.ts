import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import logger from '@shared/logger';

AppDataSource.initialize()
  .then(function () {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(routes);

    app.use((error: Error, request: Request, response: Response) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'Error',
          message: error.message,
        });
      }

      return response.status(500).json({
        status: 'Error',
        message: 'Internal server error',
      });
    });

    app.listen(3333, () => {
      logger('Server started on port! 3333');
    });
  })
  .catch(function (e) {
    logger(e);
  });
