import { NestFactory } from '@nestjs/core';
import { PlaylistServiceModule } from './playlist.module';

async function bootstrap() {
  const app = await NestFactory.create(PlaylistServiceModule);
  await app.listen(3004, '0.0.0.0');
}
bootstrap();
