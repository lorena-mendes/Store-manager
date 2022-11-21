const validateProductId = (req, res, next) => {
  const sales = req.body;

  const productId = sales.some((sale) => sale.productId === undefined);
  
  if (productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validateProductQuantity = (req, res, next) => {
  const sales = req.body;

  const productQuantity = sales.some((sale) => sale.quantity === undefined);

  if (productQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;

  const quantity = sales.some((sale) => sale.quantity <= 0);

  if (quantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateProductIdSingleItem = (req, res, next) => {
  const sales = req.body;

  const productId = sales.some((sale) => sale.productId === 1);

  if (productId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateProductId,
  validateProductQuantity,
  validateQuantity,
  validateProductIdSingleItem,
};