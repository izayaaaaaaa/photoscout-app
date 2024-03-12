import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // automatically remove any properties that do not have a matching DTO property
    }),
  ); // global pipe to validate incoming requests (validate the request body using the class-validator package
  await app.listen(3333);
}
bootstrap();
