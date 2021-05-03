const { Router } = require('express');
const { addProduct } = require('../controllers/product.controller');

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
router.route('/').post(addProduct);

module.exports = router;
