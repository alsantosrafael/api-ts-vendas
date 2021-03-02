import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
	id: string;
}
class ShowProductService {
	public async execute({ id }: IRequest): Promise<Product | undefined> {
		const productsRepository = getCustomRepository(ProductRepository);

		const foundProduct = await productsRepository.findOne(id);

		if (!foundProduct) {
			throw new AppError('No product was found.');
		}
		return foundProduct;
	}
}
export default ShowProductService;
