// app.js
const express = require("express");
const ProductManager = require("./ProductManager.js");

const app = express();
const port = 8080;

const productManager = new ProductManager();

// Bienvenida
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a Mercado-Reta :)</h1>");
});

// Obtener productos
app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  try {
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error interno del servidor" });
  }
});

// Obtener producto por ID
app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message || "Producto no encontrado" });
  }
});

// Manejo de errores global
app.use((err, res) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Error interno del servidor" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
