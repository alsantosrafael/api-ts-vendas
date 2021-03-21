import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().required().email(),
			password: Joi.string().required(),
		},
	}),
	sessionsController.create,
);

export default sessionsRouter;