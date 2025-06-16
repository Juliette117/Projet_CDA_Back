import { NestFactory } from '@nestjs/core';
import { RecommandationServiceModule } from './recommandation-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RecommandationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
