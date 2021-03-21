import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token?: string;
}
class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		const isPasswordCorrect = compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		return {
			user,
		};
	}
}
export default CreateSessionService;
