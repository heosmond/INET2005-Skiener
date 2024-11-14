import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import productRouter from './routes/products.js';

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
app.use('/api/products', productRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});