import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      skipMissingProperties: false,
    }),
  );

  // Angular
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API WPL')
    .setDescription('Documentation pour l’API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('wpl-api', app, document);

  // Kafka
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'wpl-backend',
        brokers: ['kafka:29092'],

        retry: {
          retries: 30,
          initialRetryTime: 3000,
        },
      },
      consumer: {
        groupId: 'wpl-group',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
