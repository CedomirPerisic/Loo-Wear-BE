const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const i18next = require('i18next');
const { LanguageDetector, handle } = require('i18next-http-middleware');
const FilesystemBackend = require('i18next-fs-backend');

const { errorHandler } = require('./controllers/error.controller');

const productRoutes = require('./routes/product.route');
const collectionRoutes = require('./routes/collection.route');
const configRoutes = require('./routes/config.route');

const AppError = require('./utils/app-error');

const AppGlobals = require('./resources/app.globals');

const app = express();

// CORS:
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Security:
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser:
app.use(express.json({ limit: AppGlobals.reqBodyLimit }));

app.use(mongoSanitize());

// i18n
i18next
  .use(FilesystemBackend)
  .use(LanguageDetector)
  .init({
    // debug: process.env.NODE_ENV === 'development',
    // saveMissing: true,
    backend: {
      loadPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.missing.json',
    },
    supportedLngs: AppGlobals.supportedLngs,
    fallbackLng: AppGlobals.defaultLang,
    load: 'languageOnly',
    ns: AppGlobals.namespaces,
    defaultNS: AppGlobals.defaultNamespace,
  });

app.use(handle(i18next));

app.use(express.static(`${__dirname}/uploads`));

// Routes:
app.use('/collection', collectionRoutes);
app.use('/product', productRoutes);
app.use('/config', configRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling:
app.use(errorHandler);

module.exports = app;
