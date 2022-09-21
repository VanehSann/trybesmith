// interfaces
import jwt from 'jsonwebtoken';
import Orders from '../interfaces/orders.interface';
import Products from '../interfaces/products.interface';
import Users from '../interfaces/users.interface';
// models
import { productsModel } from '../models/products.model';

const JWT_SECRET = 'JWT_SECRET'; 

const productsService = {

  async postProduct(product: Products): Promise<Products> {
    const result = await productsModel.postProduct(product);
    return result;
  },
  async getProducts(): Promise<Products[]> {
    const result = await productsModel.getProducts();
    return result;
  },
  // users
  async postUsers(user: Users): Promise<Users> {
    const result = await productsModel.postUsers(user);

    // token
    const token = jwt.sign(result, JWT_SECRET, { expiresIn: '1h' });
    return { ...result, token };
  },
  async getOrders(): Promise<Orders[]> {
    const result = await productsModel.getOrders();
    return result;
  },

};

export default productsService;