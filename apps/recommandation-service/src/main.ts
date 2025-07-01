import { NestFactory } from '@nestjs/core';
import { RecommandationServiceModule } from './recommandation-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RecommandationServiceModule);
  await app.listen(3005, '0.0.0.0');
}
bootstrap();
