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
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product],
  );
  return insertId;
};

const updateProductById = async (name, id) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return {
    id,
    name: result.name,
  };
};

module.exports = {
  listAllProducts,
  listProductsById,
  insert,
  updateProductById,
};