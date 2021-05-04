const config = require('../resources/ui-config.json');

exports.getConfig = (req, res, next) => {
  res.status(200).json({
    message: 'success',
    data: config,
  });
};
