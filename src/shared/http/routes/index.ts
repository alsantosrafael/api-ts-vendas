import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
	return response.json({ message: 'Chegou na rota principal!' });
});

export default routes;
