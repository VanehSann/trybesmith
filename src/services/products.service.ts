import Products from '../interfaces/products.interface';
import { productsModel } from '../models/products.model';

const productsService = {

  async postProduct(product: Products): Promise<Products> {
    const result = await productsModel.postProduct(product);
    return result;
  },
  async getProducts(): Promise<Products[]> {
    const result = await productsModel.getProducts();
    return result;
  },
};

export default productsService;