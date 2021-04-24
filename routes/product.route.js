const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(productController.addProduct)

module.exports = router;