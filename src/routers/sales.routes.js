const express = require('express');
const salesController = require('../controllers/sales.controller');

const {
  validateProductId,
  validateProductQuantity,
  validateQuantity,
  validateProductIdSingleItem,
} = require('../middlewares/validateSales');

const router = express.Router();

router.post('',
  validateProductId,
  validateProductQuantity,
  validateQuantity,
  validateProductIdSingleItem,
  salesController.savedNewSales);

module.exports = router;
