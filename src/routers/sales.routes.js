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

router.get('/', salesController.gettAllSales);
router.get('/:id', salesController.getSalesById);

router.put('/:id', validateProductId,
  validateProductQuantity,
  validateQuantity, salesController.updateSales);

router.delete('/:id', salesController.deleteSale);

module.exports = router;
