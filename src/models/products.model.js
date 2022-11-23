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
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return {
    id,
    name,
  };
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = {
  listAllProducts,
  listProductsById,
  insert,
  updateProductById,
  deleteProduct,
};