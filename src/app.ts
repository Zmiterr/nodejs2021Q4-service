import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = fastify({
  logger: {
    level: 'info',
    prettyPrint: true,
    file: './log.txt', // Will use pino.destination()
  },
});

// app.register(require('fastify-swagger'), {
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

const routes = [...userRouter, ...boardRouter, ...taskRouter];
routes.forEach((route) => {
  app.route(route);
});

app.get('/', async () => 'Service is running!');

export default app;
