import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
	id: string;
	name: string;
	price: number;
	quantity: number;
}
class UpdateProductService {
	public async execute({
		id,
		name,
		price,
		quantity,
	}: IRequest): Promise<Product | undefined> {
		const productsRepository = getCustomRepository(ProductRepository);
		const oldProduct = await productsRepository.findOne(id);
		if (!oldProduct) {
			throw new AppError('No product was found.');
		}
		const productExists = await productsRepository.findByName(name);
		if (productExists) {
			throw new AppError('Product with this name already exists.');
		}

		await productsRepository.save({
			...oldProduct,
			name,
			price,
			quantity,
		});
		return oldProduct;
	}
}

export default UpdateProductService;
