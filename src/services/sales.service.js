const salesModel = require('../models/sales.model');

const insertNewSale = async (sales) => {
  // console.log(sales);
  const saleId = await salesModel.insertSale();

  const savedSales = await Promise.all(sales
    .map((sale) => salesModel.insertSaleProducts(saleId, sale.productId, sale.quantity)));
  
  const result = { id: saleId, itemsSold: sales };
  if (savedSales.length >= 1) {
    return { type: 201, message: result };
  }
};

module.exports = {
  insertNewSale,
};