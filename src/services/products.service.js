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

const insertNewProduct = async (name) => {
  const newProduct = await productsOfModel.insert(name);
  const savedNewProduct = await productsOfModel.listProductsById(newProduct);

  return { type: null, message: savedNewProduct };
};

const updateProduct = async (name, id) => {
  const product = await productsOfModel.listProductsById(id);
  // console.log(product);

  if (!product) {
    return { type: 404, message: 'Product not found' };
  }

  const update = await productsOfModel.updateProductById(name, id);
  console.log(update);
  return { type: null, message: update };
};

module.exports = {
  listAllProducts,
  listProductsById,
  insertNewProduct,
  updateProduct,
};