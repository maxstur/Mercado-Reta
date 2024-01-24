const express = require('express');
const ProductManager = require('./ProductManager.js');

const app = express();
const port = 8080;

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  try {
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
