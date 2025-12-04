const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares);
app.use('/api', router);

app.get('/', (req, res) => {
  res.json({
    message: 'API Backend is running!',
    endpoints: {
      products: 'http://localhost:4000/api/products',
      singleProduct: 'http://localhost:4000/api/products/:id',
      createProduct: 'POST http://localhost:4000/api/products',
      updateProduct: 'PUT http://localhost:4000/api/products/:id',
      deleteProduct: 'DELETE http://localhost:4000/api/products/:id'
    }
  });
});

app.listen(PORT, () => {
  console.log(`\nBackend server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});