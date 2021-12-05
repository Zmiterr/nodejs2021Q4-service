// const path = require('path');
// const YAML = require('yamljs');

const fastify = require('fastify');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = fastify({
  logger: true,
});
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });

userRouter.forEach((route) => {
  app.route(route);
});
boardRouter.forEach((route) => {
  app.route(route);
});
taskRouter.forEach((route) => {
  app.route(route);
});

app.get('/', async () => 'Service is running!');

module.exports = app;
