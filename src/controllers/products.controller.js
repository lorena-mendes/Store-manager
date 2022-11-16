const productsOfSevice = require('../services/products.service');

const gettAllProducts = async (_req, res) => {
  const { type, message } = await productsOfSevice.listAllProducts();
  if (type) {
    return res.status(404).json(message);
  }
  return res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsOfSevice.listProductsById(id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  gettAllProducts,
  getProductsById,
};