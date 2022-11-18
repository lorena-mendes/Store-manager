const express = require('express');
const productsController = require('../controllers/products.controller');

const validateProducts = require('../middlewares/validateProducts');

const router = express.Router();

router.get('/', productsController.gettAllProducts);
router.get('/:id', productsController.getProductsById);

router.post('', validateProducts, productsController.insertNewProduct);

module.exports = router;