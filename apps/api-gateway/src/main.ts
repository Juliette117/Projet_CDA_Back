import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // ✅ CORS pour frontend Angular
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // ✅ Pipe de validation global pour transformer et capturer les erreurs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const logger = new Logger('Gateway');
  await app.listen(3000, '0.0.0.0');
  logger.log('Gateway accessible sur http://localhost:3000');
}
bootstrap();