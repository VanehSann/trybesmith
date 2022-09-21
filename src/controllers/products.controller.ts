import { Request, Response } from 'express';
import productsService from '../services/products.service';

const controllers = {

  async postProduct(req: Request, res: Response) {
    const result = await productsService.postProduct(req.body);
    res.status(201).json(result);
  },
  async getProducts(_req: Request, res: Response) {
    const result = await productsService.getProducts();
    res.status(200).json(result);
  },
  async postUsers(req: Request, res: Response) {
    const { token } = await productsService.postUsers(req.body);
    console.log(token);
    res.status(201).json({ token });
  },

};

export default controllers;