import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

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

  // Global exception filter to catch unhandled exceptions and format them as JSON
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global interceptor to wrap all responses in a consistent format
  app.useGlobalInterceptors(new TransformInterceptor());

  // CORS — allow the Next.js frontend to send cookies cross-origin
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true, // required for cookies to be sent cross-origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger API docs available at /api/docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CampusMart API')
    .setDescription('API documentation for CampusMart')
    .setVersion('1.0')
    .build()

  await app.listen(process.env.PORT ?? 4000);
  console.log(`Backend running on http://localhost:${process.env.PORT ?? 4000}/api`);
}

bootstrap();