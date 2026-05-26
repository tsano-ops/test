import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Security
  app.use(helmet.default());
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  // Global prefix
  const prefix = config.get<string>('API_PREFIX', '/api/v1');
  app.setGlobalPrefix(prefix);

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = config.get<number>('API_PORT', 4000);
  await app.listen(port);
  console.log(`\n🚀 PlanAfter API running at http://localhost:${port}${prefix}`);
  console.log(`📋 Environment: ${config.get('NODE_ENV', 'development')}\n`);
}

bootstrap();
