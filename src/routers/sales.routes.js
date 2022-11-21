const express = require('express');
const salesController = require('../controllers/sales.controller');

const {
  validateProductId,
  validateProductQuantity,
  validateQuantity,
} = require('../middlewares/validateSales');

const router = express.Router();

router.post('',
  validateProductId,
  validateProductQuantity,
  validateQuantity,
  salesController.savedNewSales);

module.exports = router;
