const connection = require('./connection');

const listAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const listProductsById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?',
    [id]);
  return result;
};

module.exports = {
  listAllProducts,
  listProductsById,
};