// const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// const db = process.env.DATABASE;
// mongoose.connect(db, {
//   seNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {});
