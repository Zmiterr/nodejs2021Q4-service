import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import * as fs from 'fs';
import pinoms from 'pino-multi-stream';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const streams = [
  { stream: fs.createWriteStream('log.txt') },
  { level: 'error', stream: fs.createWriteStream('error.txt') },
];
// @ts-ignore
export const logError = pinoms({ streams });
logError.info('this will be written to log.txt');
logError.error('this will be written to error.txt');

const app = fastify({
  logger: {
    level: process.env.LOG_LEVEL, // error, trace, debug, warn (see other in PR)
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

process.on('uncaughtException', (error) => {
  logError.error(`Process on uncaughtException error = ${error.stack}`);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logError.error(`Process on unhandledRejection error = ${String(error)}`);
  process.exit(1);
});

export default app;
