const mongoose = require('mongoose');
const slugify = require('slugify');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Collection must have name!'],
    unique: [true, 'Collection already exists!'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product must have a description!'],
  },
  image: String,
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

collectionSchema.index({ slug: 1 });

collectionSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

exports.Collection = mongoose.model('Collection', collectionSchema);
