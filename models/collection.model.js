const mongoose = require('mongoose');
const slugify = require('slugify');

const { removeOldFile } = require('../utils/common.util');

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Collection must have name!'],
      unique: [true, 'Collection already exists!'],
      trim: true,
      // TODO: Find solution to update slug after update name
      immutable: [true, 'Can not change collection name'],
    },
    description: {
      type: String,
      required: [true, 'Product must have a description!'],
    },
    photo: String,
    slug: String,
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

collectionSchema.index({ slug: 1 });

collectionSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

collectionSchema.pre(/^findOneAnd/, async function (next) {
  this.old = await this.findOne();
  next();
});

collectionSchema.post(/^findOneAnd/, async function (newDoc, next) {
  const oldDoc = await this.old;

  if (!oldDoc) return next();

  if (oldDoc.photo !== newDoc.photo) {
    const photoPath = `uploads/img/collections/${oldDoc.photo}`;
    removeOldFile(photoPath);
  }

  next();
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
