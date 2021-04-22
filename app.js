const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const FilesystemBackend = require('i18next-fs-backend');

// const multer = require('multer');
// const upload = multer({
//   dest: 'uploads/',
// });

const app = express();

// CORS:
const corsOptions = {
  origin: 'http://localhost:4200',
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
app.use(express.json({ limit: '10kb' }));

// i18n
i18next
  .use(FilesystemBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallback: 'en',
    load: 'languageOnly',
    saveMissing: false
  });

app.use(i18nextMiddleware.handle(i18next));

// Routes:
app.get('/', (req, res) => {
  const lang = req.language;
  console.log(lang);
  res.json({
    message: 'success',
    data: {
      test: req.t('translation:hello'),
    },
  });
});

module.exports = app;
