import { Module } from '@nestjs/common';
import { JeuVideoService } from './services/jeu-video.service';
import { JeuVideoController } from './jeu-video.controller';

@Module({
  providers: [JeuVideoService],
  controllers: [JeuVideoController]
})
export class JeuVideoModule {}
