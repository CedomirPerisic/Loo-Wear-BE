const { Router } = require('express');
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  removeProduct,
} = require('../controllers/product.controller');

const router = Router();

/**
 * @swagger
 * /product:
 *  post:
 *    summary: Create new product
 *    description: Create new product for specific collection.
 *    tags:
 *      - product
 */
router.route('/').get(getProducts).post(addProduct);
router.route('/:id').get(getProduct).patch(updateProduct).delete(removeProduct);

module.exports = router;
