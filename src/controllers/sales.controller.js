const salesService = require('../services/sales.service');

const savedNewSales = async (req, res) => {
  const newSales = req.body;
  const { type, message } = await salesService.insertNewSale(newSales);

  return res.status(type).json(message);
};

const gettAllSales = async (_req, res) => {
  const { type, message } = await salesService.listAllSales();
  if (type) {
    return res.status(404).json(message);
  }
  return res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.listSalesById(id);
  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.remove(id);

  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(type).json(message);
};

module.exports = {
  savedNewSales,
  gettAllSales,
  getSalesById,
  deleteSale,
};