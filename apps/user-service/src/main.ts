import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  const logger = new Logger();
  await app.listen(3002);
  logger.log('✅ user-service écoute sur http://localhost:3002');
}
bootstrap();