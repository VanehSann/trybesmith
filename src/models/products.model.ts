import { ResultSetHeader, RowDataPacket } from 'mysql2';
import Products from '../interfaces/products.interface';
import connection from './connection';

export const productsModel = {
  async postProduct(product: Products): Promise<Products> {
    const { name, amount } = product;
    const sql = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)';

    const [result] = await connection.query<ResultSetHeader>(sql, [name, amount]);
    return {
      id: result.insertId,
      name,
      amount,
    };
  },
  async getProducts(): Promise<Products[]> {
    const sql = 'SELECT * from Trybesmith.Products';

    const result = await connection.query<RowDataPacket[]>(sql);
    const [rows] = result;
    return rows as Products[];
  },
};

export default productsModel;