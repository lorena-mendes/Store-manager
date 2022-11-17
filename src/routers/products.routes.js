const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsController.gettAllProducts);
router.get('/:id', productsController.getProductsById);

router.post('', productsController.insertNewProduct);

module.exports = router;