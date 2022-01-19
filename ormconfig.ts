import { ConnectionOptions } from 'typeorm';
import env from './src/common/config';
import Board from './src/resources/boards/board.model';
import Task from './src/resources/tasks/task.model';
import User from './src/resources/users/user.model';

export default {
  type: 'postgres',
  // TODO dont forget change it to 'postgres' for docker
  host: 'localhost',
  port: Number(env.POSTGRES_PORT),
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: false,
  dropSchema: true,
  cache: false,
  migrationsRun: true,
  entities: [User, Task, Board],
  migrations: ['src/migrations/*{.ts}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;
