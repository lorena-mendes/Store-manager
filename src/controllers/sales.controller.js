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

const updateSales = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const result = await salesService.updateSales(sales, id);

  if (result.type) {
    return res.status(result.type).json({ message: result.message });
  }

  const response = {
    saleId: id,
    itemsUpdated: result,
  };

  return res.status(200).json(response);
};

module.exports = {
  savedNewSales,
  gettAllSales,
  getSalesById,
  deleteSale,
  updateSales,
};