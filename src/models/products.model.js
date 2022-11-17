const connection = require('../db/connection');

const listAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const listProductsById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = (?)',
    [id]);
  return result;
};

const insert = async (product) => {
  const [{ newProduct }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product.name],
  );
  return newProduct;
};

module.exports = {
  listAllProducts,
  listProductsById,
  insert,
};