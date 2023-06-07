const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: '돈룩업 백엔드 서버', // by default: 'REST API'
    description: 'API 명세서', // by default: ''
  },
  host: 'localhost:5001', // by default: 'localhost:3000'
  basePath: '/', // by default: '/'
  schemes: ['http'], // by default: ['http']
  consumes: ['application/json'], // by default: ['application/json']
  produces: ['application/json'], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '', // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routers/userRouter.js', './src/routers/weatherRouter.js', './src/routers/kakaoRouter.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
