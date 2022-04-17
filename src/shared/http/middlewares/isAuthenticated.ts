import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  id: string;
  name: string;
  iat: number;
  exp: number;
  sub: string;
}
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { id, name } = decodedToken as ITokenPayload;

    request.user = {
      id: id,
      name: name,
    };

    return next();
  } catch (e) {
    throw new AppError('Invalid JWT token');
  }
}
