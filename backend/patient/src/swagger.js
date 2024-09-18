const swaggerJsDoc = require('swagger-jsdoc');
import path from 'path';
import { APP_NAME } from './config';

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'defaults API',
      version: '1.0.0',
      description: 'Medical System Auth api microservice',
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: `/${APP_NAME}/api/`,
        description: 'Local Dev',
      },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    schemes: ['http', 'https'],
    components: {
      schemas: {
        Id: {
          properties: {
            _id: {
              type: 'string',
              format: 'bson',
              example: '5e1ce060da17eb0011ac1c08',
            },
          },
        },
        
      },
    },
  },
  apis: [path.resolve(__dirname, './routers/*.js')],
};

export const swaggerJsDocs = swaggerJsDoc(swaggerOptions);
