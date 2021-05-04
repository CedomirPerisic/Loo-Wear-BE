const { Router } = require('express');
const { getConfig } = require('../controllers/config.controller');

const route = Router();

route.get('/', getConfig);

module.exports = route;
