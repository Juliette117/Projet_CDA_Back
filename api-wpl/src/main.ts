import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  })

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
        brokers: ['10.0.0.30:29092'], //  IP
        retry: {
          retries: 30,   // <= Réessayer 30 fois
          initialRetryTime: 3000, // 3 secondes
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