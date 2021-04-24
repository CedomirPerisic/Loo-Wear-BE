import express, { json } from 'express';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import i18next from 'i18next';
import { LanguageDetector, handle } from 'i18next-http-middleware';
import FilesystemBackend from 'i18next-fs-backend';

import productRoutes from './routes/product.route.js';

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
app.use(json({ limit: '10kb' }));

// i18n
i18next
  .use(FilesystemBackend)
  .use(LanguageDetector)
  .init({
    // debug: process.env.NODE_ENV === 'development',
    // saveMissing: true,
    backend: {
      loadPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.missing.json'
    },
    supportedLngs: ['en', 'sr'],
    fallbackLng: 'en',
    load: 'languageOnly',
    ns: ['common', 'message'],
    defaultNS: 'common'
  });

app.use(handle(i18next));

// Routes:

app.use('/product', productRoutes);

app.get('/', (req, res) => {
  const lang = req.language;
  console.log(lang);
  res.json({
    message: req.t('message:success'),
    data: {
      test: req.t('hello'),
    },
  });
});

export default app;
