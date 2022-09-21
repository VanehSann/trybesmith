import express from 'express';
import controllers from './controllers/products.controller';

const app = express();

app.use(express.json());
app.post('/products', controllers.postProduct);
app.get('/products', controllers.getProducts);
app.post('/users', controllers.postUsers);

export default app;
