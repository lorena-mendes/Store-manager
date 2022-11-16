const productsOfModel = require('../models/products.model');

const listAllProducts = async () => {
  const products = await productsOfModel.listAllProducts();
  return { type: null, message: products };
};

const listProductsById = async (id) => {
  const product = await productsOfModel.listProductsById(id);
  
  if (!product) {
    return { type: true, message: 'Product not found' };
  }
  return { type: null, message: product };
};

module.exports = {
  listAllProducts,
  listProductsById,
};