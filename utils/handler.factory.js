const QueryFeatures = require('./query-features');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
      data.photo = req.file.filename;
    }

    const doc = await Model.create(data);

    res.status(201).json({
      message: 'success',
      data: doc,
    });
  });

exports.getAll = (Model, ...populate) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.collectionId) {
      filter = { collection: req.param.collectionId };
    }

    const filters = new QueryFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const query = filters.query;

    if (populate) {
      populate.forEach((item) => query.populate(item));
    }

    const doc = await filters.query.orFail(
      new AppError('There is no data to show', 404)
    );

    res.status(200).json({
      message: 'success',
      data: doc,
      size: doc.length,
    });
  });

exports.getOne = (Model, ...populate) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populate) {
      populate.forEach((item) => query.populate(item));
    }

    const doc = await query.orFail(
      new AppError('There is no data to show', 404)
    );

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      message: 'success',
      data: doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
      data.photo = req.file.filename;
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      message: 'success',
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    await doc.remove();

    res.status(204).json({
      message: 'success',
      data: null,
    });
  });
