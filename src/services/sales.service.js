const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const validateId = async (sales) => {
  const salesId = sales.map((sale) => sale.productId);

  const validProduct = await Promise.all(salesId.map(async (id) => {
    const product = await productsModel.listProductsById(id);
    return product;
  }));

  const messageError = { message: 'Product not found' };

  for (let index = 0; index < validProduct.length; index += 1) {
    if (!validProduct[index]) {
      return { type: 404, message: messageError };
    }
  }
  return {};
};

const insertNewSale = async (sales) => {
  const notFoundId = await validateId(sales);
  if (notFoundId.message) {
    return notFoundId;
  }

  const saleId = await salesModel.insertSale();

  const savedSales = await Promise.all(sales
    .map((sale) => salesModel.insertSaleProducts(saleId, sale.productId, sale.quantity)));
  
  const result = { id: saleId, itemsSold: sales };
  if (savedSales.length >= 1) {
    return { type: 201, message: result };
  }
};

const listAllSales = async () => {
  const sales = await salesModel.listAllSales();
  return { type: null, message: sales };
};

const listSalesById = async (id) => {
  const sales = await salesModel.listSalesById(id);

  if (sales <= 0) {
    return { type: true, message: 'Sale not found' };
  }
  return { type: null, message: sales };
};

const remove = async (id) => {
  const sale = await salesModel.deleteSale(id);

  if (!sale) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: 204, message: '' };
};

module.exports = {
  insertNewSale,
  listAllSales,
  listSalesById,
  remove,
};