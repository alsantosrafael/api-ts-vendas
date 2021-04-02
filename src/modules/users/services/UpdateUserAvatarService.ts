import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';
import User from '../typeorm/entities/User';

interface IRequest {
	avatarFilename: string;
	user_id: string;
}

export default class UpdateUserAvatarSercice {
	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);

		const userExists = await usersRepository.findById(user_id);

		if (!userExists) {
			throw new AppError('User not found.', 404);
		}

		if (userExists.avatar) {
			const userAvatarFilePath = path.join(
				uploadConfig.directory,
				userExists.avatar,
			);

			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		userExists.avatar = avatarFilename;

		await usersRepository.save(userExists);

		return userExists;
	}
}
