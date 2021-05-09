const { Router } = require('express');

const {
  uploadPhoto,
  createCollection,
  getAllCollections,
  getCollection,
  updateCollection,
  deleteCollection,
  resizePhoto,
} = require('../controllers/collection.controller');

const router = Router();

router
  .route('/')
  .get(getAllCollections)
  .post(uploadPhoto, resizePhoto, createCollection);
router
  .route('/:id')
  .get(getCollection)
  .patch(uploadPhoto, resizePhoto, updateCollection)
  .delete(deleteCollection);

module.exports = router;
