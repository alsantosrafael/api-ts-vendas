import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
	public async execute(): Promise<Product[] | undefined> {
		const productsRepository = getCustomRepository(ProductRepository);

		const productsList = productsRepository.find();

		return productsList;
	}
}

export default ListProductService;
