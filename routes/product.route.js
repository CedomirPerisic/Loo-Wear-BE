import { Router } from 'express';
import { addProduct } from '../controllers/product.controller.js';

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

export default router;
