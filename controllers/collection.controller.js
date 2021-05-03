const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require('../utils/handler.factory');
const { Collection } = require('../models/collection.model');

exports.createCollection = createOne(Collection);
exports.getAllCollections = getAll(Collection);
exports.getCollection = getOne(Collection);
exports.updateCollection = updateOne(Collection);
exports.deleteCollection = deleteOne(Collection);
