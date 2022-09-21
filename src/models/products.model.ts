import { ResultSetHeader, RowDataPacket } from 'mysql2';
import Orders from '../interfaces/orders.interface';
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
  async getOrders(): Promise<Orders[]> {
    const sql = `SELECT a.id, a.userId, JSON_ARRAYAGG(b.id) AS productsIds
    FROM Trybesmith.Orders AS a
    INNER JOIN Trybesmith.Products AS b ON b.orderId = a.id
    GROUP BY a.id
    ORDER BY a.userId;`;

    const result = await connection.query<RowDataPacket[]>(sql);
    const [rows] = result;
    return rows as Orders[];
  },
};

export default productsModel;

// https://trybecourse.slack.com/archives/C027T2VU8U8/p1648757991790929 DICA
// JSON_ARRAYAGG()
// https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg DOC