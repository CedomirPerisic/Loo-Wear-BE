const Product = require('../models/product.model');
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require('../utils/handler.factory');

exports.getProducts = getAll(Product);
exports.getProduct = getOne(Product);
exports.addProduct = createOne(Product);
exports.updateProduct = updateOne(Product);
exports.removeProduct = deleteOne(Product);
