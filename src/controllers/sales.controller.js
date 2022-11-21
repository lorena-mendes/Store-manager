const salesService = require('../services/sales.service');

const savedNewSales = async (req, res) => {
  const newSales = req.body;
  const { message } = await salesService.insertNewSale(newSales);

  return res.status(200).json(message);
};

const savedNewSalesProduct = async (req, res) => {
  const newProduct = req.body;
  const { message } = await salesService.insertNewSaleProduct(newProduct);

  return res.status(200).json(message);
};

module.exports = {
  savedNewSales,
  savedNewSalesProduct,
};