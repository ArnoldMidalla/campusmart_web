import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Parse cookies from incoming requests — required for HTTP-only JWT cookie
  app.use(cookieParser());

  // Global prefix so all routes are /api/...
  app.setGlobalPrefix('api');

  // Reject any request body that contains fields not in the DTO,
  // and strip unknown properties before they reach service logic
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // strip unknown properties
      forbidNonWhitelisted: true, // throw if unknown properties are sent
      transform: true,        // auto-transform primitives (e.g. string → number)
    }),
  );

  // CORS — allow the Next.js frontend to send cookies cross-origin
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true, // required for cookies to be sent cross-origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 4000);
  console.log(`Backend running on http://localhost:${process.env.PORT ?? 4000}/api`);
}

bootstrap();