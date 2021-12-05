const fastify = require('fastify');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = fastify({
  logger: true,
});

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: './doc/api.yaml',
  },
  swagger: {
    info: { title: 'fastify-api' },
  },
});

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });
const routes = [...userRouter, ...boardRouter, ...taskRouter];
routes.forEach((route) => {
  app.route(route);
});
// boardRouter.forEach((route) => {
//   app.route(route);
// });
// taskRouter.forEach((route) => {
//   app.route(route);
// });

app.get('/', async () => 'Service is running!');

module.exports = app;
