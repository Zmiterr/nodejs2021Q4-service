import fastify from 'fastify';
import boardRouter from 'resources/boards/board.router';
import taskRouter from 'resources/tasks/task.router';
import userRouter from 'resources/users/user.router';

const app = fastify({
  logger: true,
});

// server.register(require('fastify-swagger'), {
//   exposeRoute: true,
//   routePrefix: '/doc',
//   mode: 'static',
//   specification: {
//     path: './doc/api.yaml',
//   },
//   swagger: {
//     info: { title: 'fastify-api' },
//   },
// });

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
  // @ts-ignore
  app.route(route);
});

// boardRouter.forEach((route) => {
//   app.route(route);
// });
// taskRouter.forEach((route) => {
//   app.route(route);
// });

app.get('/', async () => 'Service is running!');

// module.exports = server;
export default app;
