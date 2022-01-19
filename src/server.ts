import { createConnection } from 'typeorm';
import app, { logger } from './app';
import 'reflect-metadata';
import env from './common/config';

(async () => {
  try {
    await createConnection({
      type: 'postgres',
      // TODO dont forget change it to 'postgres' for docker
      host: 'localhost',
      port: Number(env.POSTGRES_PORT),
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      synchronize: true,
      dropSchema: true,
      cache: false,
      migrationsRun: false,
      entities: ['src/resources/**/*.model.ts'],
      migrations: ['src/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    });
    await app.listen(env.PORT, '0.0.0.0');
  } catch (err) {
    app.log.error(err);
    logger.error(String(err));
    process.exit(1);
  }
})();
