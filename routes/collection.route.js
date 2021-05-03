const { Router } = require('express');
const {
  createCollection,
  getAllCollections,
  getCollection,
  updateCollection,
  deleteCollection,
} = require('../controllers/collection.controller');

const router = Router();

router.route('/').get(getAllCollections).post(createCollection);
router
  .route('/:id')
  .get(getCollection)
  .post(updateCollection)
  .delete(deleteCollection);

module.exports = router;
