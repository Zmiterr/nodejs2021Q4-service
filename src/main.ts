import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const isUseFastify = process.env.USE_FASTIFY === 'true';
  async function chooseFramework() {
    if (isUseFastify) {
      const fastifyAdapter = new FastifyAdapter();

      const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        fastifyAdapter,
      );
      app.enableCors();
      console.log('You has been started fastify app');
      return app;
    } else {
      console.log('You has been started express app');
      return await NestFactory.create(AppModule);
    }
  }
  const app = await chooseFramework();
  const { httpAdapter } = await app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
