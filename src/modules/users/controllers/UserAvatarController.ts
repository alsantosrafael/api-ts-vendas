import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
	public async update(request: Request, response: Response): Promise<Response> {
		const updateAvatarService = new UpdateUserAvatarService();

		const { id: user_id } = request.user;
		const avatarFilename = request.file.filename;

		const updatedUser = await updateAvatarService.execute({
			user_id,
			avatarFilename,
		});

		return response.json(updatedUser);
	}
}
