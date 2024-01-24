const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.path = "./src/productos.json";
    this.products = null;
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const rawData = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(rawData);
      console.log("Productos cargados correctamente.");
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      throw error; // Lanzar el error para detener la ejecución
    }
  }

  async getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }

    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }

    return product;
  }
}

module.exports = ProductManager;
