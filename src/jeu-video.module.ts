import { Module } from '@nestjs/common';
import { JeuVideoService } from './service/jeu-video.service';
import { JeuVideoController } from './jeu-video.controller';

@Module({
  providers: [JeuVideoService],
  controllers: [JeuVideoController]
})
export class JeuVideoModule {}
