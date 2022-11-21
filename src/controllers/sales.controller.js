const salesService = require('../services/sales.service');

const savedNewSales = async (req, res) => {
  const newSales = req.body;
  const { type, message } = await salesService.insertNewSale(newSales);

  return res.status(type).json(message);
};

module.exports = {
  savedNewSales,
};