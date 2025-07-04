import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MediaModule } from './media.module';


async function bootstrap() {
  const app = await NestFactory.create(MediaModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    const logger = new Logger();
  await app.listen(3003,'0.0.0.0');
  logger.log('✅ media-service écoute sur http://localhost:3003');
}
bootstrap();
