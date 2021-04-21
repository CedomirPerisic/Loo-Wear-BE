const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

// const multer = require('multer');
// const upload = multer({
//   dest: 'uploads/',
// });

const app = express();

dotenv.config();

app.use(express.json());
app.use(helmet());

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({
    message: 'success',
    data: {
      test: 'Test 😉',
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {});
