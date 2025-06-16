import { NestFactory } from '@nestjs/core';
import { PlaylistServiceModule } from './playlist-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PlaylistServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
