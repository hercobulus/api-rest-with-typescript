import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import User from '../typeorm/entities/User';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = await sign(
      {
        id: user.id,
        name: user.name,
      },
      authConfig.jwt.secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return { user, token } as IResponse;
  }
}

export default CreateSessionService;
