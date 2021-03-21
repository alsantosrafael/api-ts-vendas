import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const createSession = new CreateSessionService();

		const authentication = await createSession.execute({ email, password });

		return response.json(authentication);
	}
}
export default SessionsController;
