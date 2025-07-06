import { NestFactory } from '@nestjs/core';
import { PlaylistModule } from './playlist.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PlaylistModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    const logger = new Logger();
  await app.listen(3004,'0.0.0.0');
  logger.log('✅ playlist-service écoute sur http://localhost:3004');
}
bootstrap();
