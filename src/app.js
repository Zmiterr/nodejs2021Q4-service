const express = require('express');
 const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

// const Fastify = require('fastify');
// const ExpressPlugin = require('fastify-express');
const userRouter = require('./resources/users/user.router');



   const app = express();
   const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

  app.use(express.json());

   app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });
  app.use('/users', userRouter);




 module.exports = app;
// const app2 = async () => {
//   const app = Fastify({
//     logger: true,
//   });
//   await app.register(ExpressPlugin);
//
//   // const app = express();
//   // const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
//
//   app.use(express.json());
//
//   // app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//
//   app.use('/', (req, res, next) => {
//     if (req.originalUrl === '/') {
//       res.send('Service is running!');
//       return;
//     }
//     next();
//   });
//   app.use('/users', userRouter);
//   return app;
// };
// module.exports = app2();

