import app from './app.js';

import dotenv from 'dotenv';
dotenv.config();

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Loo Wear API',
    version: '1.0.0',
    description: 'The Loo Wear shop open API',
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC',
    },
    contact: {
      name: 'Dragomir Urdov',
      email: 'dragomir.urdov@gmail.com',
      url: 'https://rs.linkedin.com/in/dragomir-urdov',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const port = process.env.PORT || 3000;
app.listen(port, () => {});
