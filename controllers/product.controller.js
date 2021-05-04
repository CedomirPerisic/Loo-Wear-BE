const Product = require('../models/product.model');
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require('../utils/handler.factory');

exports.addProduct = createOne(Product);
