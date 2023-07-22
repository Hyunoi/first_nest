import { ValidationPipe } from '@nestjs/common';  // Nest에서 제공하는 pipe 사용하기
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
    }));  // 전역으로 유효성 검사
  await app.listen(3000);
}
bootstrap();
