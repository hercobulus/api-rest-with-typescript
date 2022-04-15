import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersRepository {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = listUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}
