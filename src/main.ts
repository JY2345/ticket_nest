import { ValidationPipe, BadRequestException } from '@nestjs/common'; 
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) => `${error.property}에 대한 검증 오류: ${Object.values(error.constraints).join(", ")}`
        );
        return new BadRequestException(messages);
      },
    }),
  );

  await app.listen(3000);
}

bootstrap();
