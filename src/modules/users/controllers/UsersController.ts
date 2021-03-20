import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';

export default class UsersController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listUsersServicde = new ListUsersService();

		const users = await listUsersServicde.execute();

		return response.json(users);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;
		const createUserService = new CreateUserService();

		const newUser = await createUserService.execute({
			name,
			email,
			password,
		});
		return response.json(newUser);
	}
}
