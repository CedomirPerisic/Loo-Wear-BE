const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name!'],
    unique: [true, 'Product with this name already exist!'],
    trim: true,
  },
  collection: {
    type: mongoose.Schema.ObjectId,
    ref: 'Collection',
    required: [true, 'Product must belong to a collection'],
  },
  slug: String,
  price: {
    type: Number,
    required: [true, 'A product must have price!'],
  },
  sizes: {
    type: [
      {
        name: {
          type: String,
          enum: ['XS', 'S', 'M', 'L', 'XL', 'UNI'],
        },
        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    validate: {
      validator: function (val) {
        if (val.length > 1 && val.some((item) => item.name === 'UNI')) {
          return true;
        }
      },
      message: 'Universal size can not have another size value!',
    },
  },
  description: {
    type: String,
    required: [true, 'Product must have a description!'],
  },
  images: [String],
  colors: [
    {
      name: String,
      color: [String],
      image: String,
    },
  ],
  fabrics: [
    {
      name: String,
      description: String,
      percentage: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.index({ slug: 1 });
productSchema.index({ collection: 1 });

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
