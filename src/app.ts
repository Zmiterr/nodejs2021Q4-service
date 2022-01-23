import fastify, { FastifyReply, FastifyRequest } from 'fastify';
// import * as fs from 'fs';
import pinoms from 'pino-multi-stream';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './resources/login/login.router';
import evn from './common/config';

const streams: pinoms.Streams = [
  { stream: process.stdout }, // an "info" level destination stream
  // { level: 'error', stream: process.stderr }, // an "error" level destination stream
  // { stream: fs.createWriteStream('info.stream.log') },
  // { level: 'fatal', stream: fs.createWriteStream('/fatal.stream.log') },
  { stream: pinoms.prettyStream() },
  { stream: pinoms.prettyStream({ prettyPrint: { colorize: true } }) },
];

export const logger = pinoms({
  level: evn.LOG_LEVEL,
  streams,
});

// logError.info('this will be written to log.txt');
// logError.error('this will be written to error.txt');

const app = fastify({
  logger: {
    level: process.env.LOG_LEVEL, // error, trace, debug, warn (see other in PR)
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
    // file: './logs/log.log', // Will use pino.destination()
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

const routes = [...userRouter, ...boardRouter, ...taskRouter, ...loginRouter];
routes.forEach((route: any) => {
  app.route(route);
});

app.get('/', async () => 'Service is running!');

process.on('uncaughtException', (error) => {
  logger.error(`Process on uncaughtException error = ${error.stack}`);
  // console.log(error);
  setTimeout(() => {
    process.exit(1);
  }, 100);
});

process.on('unhandledRejection', (error) => {
  logger.error(`Process on unhandledRejection error = ${String(error)}`);

  // console.log(error);
  setTimeout(() => {
    process.exit(1);
  }, 100);
});

// Promise.reject(Error('Oops!'));

export default app;
