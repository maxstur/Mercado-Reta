const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.path = './src/productos.json';
  }

  async getProducts(limit) {
    const rawData = await fs.readFile(this.path, 'utf-8');
    const products = JSON.parse(rawData);

    if (limit) {
      return products.slice(0, limit);
    }

    return products;
  }

  async getProductById(id) {
    const rawData = await fs.readFile(this.path, 'utf-8');
    const products = JSON.parse(rawData);

    const product = products.find((p) => p.id === id);

    if (!product) {
      throw new Error('Producto no encontrado.');
    }

    return product;
  }
}

module.exports = ProductManager;
