import { Request, Response } from 'express';
import productsService from '../services/products.service';

const productsController = {

  async postProduct(req: Request, res: Response) {
    const result = await productsService.postProduct(req.body);
    res.status(201).json(result);
  },

};

export default productsController;