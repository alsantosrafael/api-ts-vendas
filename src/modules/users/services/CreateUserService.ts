import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	name: string;
	password: string;
	email: string;
}
export default class CreateUserService {
	public async execute({ name, password, email }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);
		const emailExists = await usersRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Email already in use.');
		}

		const user = usersRepository.create({
			name,
			password,
			email,
		});

		await usersRepository.save(user);

		return user;
	}
}
