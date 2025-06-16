import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
  const logger = new Logger('Gateway');
  await app.listen(3000);
  logger.log('Gateway accessible sur http://localhost:3000');
}
bootstrap();