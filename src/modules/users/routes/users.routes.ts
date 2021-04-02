import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import Joi from 'joi';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const usersController = new UsersController();

const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			password: Joi.string().required(),
			email: Joi.string().required().email(),
		},
	}),
	usersController.create,
);

usersRouter.patch(
	'/avatar',
	isAuthenticated,
	upload.single('avatar'),
	usersAvatarController.update,
);

export default usersRouter;
