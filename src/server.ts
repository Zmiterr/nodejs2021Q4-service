import { createConnection } from 'typeorm';
import app, { logger } from './app';
import 'reflect-metadata';
import env from './common/config';

// const ormConfig = {
//   type: 'postgres',
//   host: 'postgres',
//   port: env.POSTGRES_PORT,
//   username: env.POSTGRES_USER,
//   password: env.POSTGRES_PASSWORD,
//   database: env.POSTGRES_DB,
//   synchronize: true,
//   entities: [
//     'src/resources/users/user.model.ts',
//     'src/resources/boards/board.model.ts',
//     'src/resources/tasks/task.model.ts',
//     'src/resources/columns/column.model.ts',
//   ],
// };
(async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'postgres',
      port: Number(env.POSTGRES_PORT),
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      synchronize: true,
      entities: [
        'src/resources/users/user.model.ts',
        'src/resources/boards/board.model.ts',
        'src/resources/tasks/task.model.ts',
        'src/resources/columns/column.model.ts',
      ],
    }).then(() => app.listen(env.PORT, '0.0.0.0'));
  } catch (err) {
    app.log.error(err);
    logger.error(String(err));
    process.exit(1);
  }
})();
