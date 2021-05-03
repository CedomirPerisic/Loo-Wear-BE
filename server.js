const app = require('./app');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// SWAGGER ------------------------------------------------------------
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDefinition = require('./resources/swagger-options.json');

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// MONGODB ----------------------------------------------------------------
const dbConnection = process.env.MONGODB.replace(
  '<username>',
  process.env.MONGODB_USERNAME
).replace('<password>', process.env.MONGODB_PASSWORD);

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('DB connected successfully!');
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {});
