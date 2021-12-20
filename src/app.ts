import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = fastify({
  logger: {
    level: 'info', // error, trace, debug, warn
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },

    file: './log.txt', // Will use pino.destination()
  },
});

app.addHook('preHandler', async (req: FastifyRequest, reply: FastifyReply) => {
  if (req.body) {
    req.log.info({ body: req.body, params: req.params }, 'parsed body');
    reply.log.info({ body: req.body }, 'parsed body');
  }
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
