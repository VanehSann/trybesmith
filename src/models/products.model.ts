import { ResultSetHeader, RowDataPacket } from 'mysql2';
import Products from '../interfaces/products.interface';
import Users from '../interfaces/users.interface';
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
  async postUsers(user: Users): Promise<Users> {
    const { username, classe, level, password } = user;
    const sql = 'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?,?,?,?)';

    await connection
      .query<ResultSetHeader>(sql, [username, classe, level, password]);
    return { username, classe, level, password };
  },
};

export default productsModel;