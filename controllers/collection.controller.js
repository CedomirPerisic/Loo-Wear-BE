const multer = require('multer');
const sharp = require('sharp');

const AppError = require('../utils/app-error');

const AppGlobals = require('../resources/app.globals');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/img/collections');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     const name = req.body.name.replace(' ', '-');
//     cb(null, `collection-${name}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require('../utils/handler.factory');

const Collection = require('../models/collection.model');

exports.uploadPhoto = upload.single('photo');
exports.resizePhoto = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  req.file.filename = `collection-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(AppGlobals.thumbnailWidth, AppGlobals.thumbnailHeight)
    .toFormat(AppGlobals.imageFormat)
    .jpeg({ quality: AppGlobals.imageQuality })
    .toFile(`uploads/img/collections/${req.file.filename}`);

  next();
};

exports.createCollection = createOne(Collection);
exports.getAllCollections = getAll(Collection, 'products');
exports.getCollection = getOne(Collection, 'products');
exports.updateCollection = updateOne(Collection);
exports.deleteCollection = deleteOne(Collection);
