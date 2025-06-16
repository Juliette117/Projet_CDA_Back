import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const logger = new Logger;
  await app.listen(3001);
  logger.log('✅ auth-service écoute sur http://localhost:3001');
}
bootstrap();