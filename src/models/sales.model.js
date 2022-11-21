const camelize = require('camelize');
const connection = require('../db/connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
  );
  return insertId;
};

const insertSaleProducts = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
    );
  return result;
};

const listAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS s
ON sp.sale_id = s.id`,
  );
  return camelize(result);
};

const listSalesById = async (id) => {
  const [result] = await
    connection.execute(
      `SELECT s.date, sp.product_id, sp.quantity 
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ?`,
      [id],
    );
  return camelize(result);
};

module.exports = {
  insertSale,
  insertSaleProducts,
  listAllSales,
  listSalesById,
};
