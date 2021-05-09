const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name!'],
      unique: [true, 'Product with this name already exist!'],
      trim: true,
    },
    collectionId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Collection',
      required: [true, 'Product must belong to a collection'],
      immutable: true,
      validate: {
        validator: async function (value) {
          const doc = await mongoose.model('Collection').findById(value);
          if (!doc) {
            return Promise.resolve(false);
          }
        },
        message: 'There is no selected collection!',
      },
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
          description: String,
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
  },
  {
    timestamp: true,
    strict: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

productSchema.index({ slug: 1 });
productSchema.index({ collection: 1 });

productSchema.virtual('stock').get(function () {
  if (this.sizes.length === 0) return 0;
  return this.sizes.reduce(
    (accumulator, currentValue) => (accumulator.stock += currentValue.stock)
  );
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.post('save', async function (doc, next) {
  await mongoose.model('Collection').findByIdAndUpdate(this.collectionId, {
    $push: { products: doc._id },
  });
  next();
});

productSchema.post('remove', async function (doc, next) {
  await mongoose.model('Collection').findByIdAndUpdate(this.collectionId, {
    $pull: { products: doc._id },
  });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
