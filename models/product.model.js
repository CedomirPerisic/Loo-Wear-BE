const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name!'],
    unique: [true, 'Product with this name already exist!'],
    trim: true
  },
  slug: String,
  price: {
    type: Number,
    required: [true, 'A product must have price!']
  },
  size: {
    type: [String],
    enum: ['XS', 'S', 'M', 'L', 'XL']
  },
  description: {
    type: String,
    required: [true, 'Product must have a description!']
  },
  images: [String],
  colors: [{
    name: String,
    color: [String],
    image: String
  }],
  fabrics: [{
    name: String,
    description: String,
    percentage: Number
  }],
  instruction: {
    type: [String],
    enum: [
      'machine-washable',
      'wash-cold',
      'wash-warm',
      'wash-hot',
      'hand-wash',
      'do-not-bleach',
      'do-not-tumble-dry',
      'do-not-iron',
      'do-not-dry-clean'
    ]
  }
});

productSchema.index({ slug: 1 });

productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true});
  next();
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;