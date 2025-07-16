import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { formatError, validateEnvVariables } from './domain/core/utils/env';

async function bootstrap() {
  try {
    validateEnvVariables();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.error(formatError(error));
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'job-finder-postgresql',
      'https://www.linkedin.com',
      'https://www.welcometothejungle.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(3000);
}

void bootstrap();
