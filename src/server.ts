import { createConnection } from 'typeorm';
import app, { logger } from './app';
import 'reflect-metadata';
import env from './common/config';

(async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'q4',
      port: Number(env.POSTGRES_PORT),
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      synchronize: false,
      dropSchema: true,
      cache: false,
      migrationsRun: true,
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
