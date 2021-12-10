import fastify from 'fastify';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

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

const routes = [...userRouter, ...boardRouter, ...taskRouter];
routes.forEach((route) => {
  // @ts-ignore
  app.route(route);
});

app.get('/', async () => 'Service is running!');

export default app;
