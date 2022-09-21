import Products from '../interfaces/products.interface';
import { productsModel } from '../models/products.model';

const productsService = {

  async postProduct(product: Products): Promise<Products> {
    const result = await productsModel.postProduct(product);
    return result;
  },
};

export default productsService;