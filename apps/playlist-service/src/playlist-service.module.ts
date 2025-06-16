import { Module } from '@nestjs/common';
import { PlaylistServiceController } from './playlist-service.controller';
import { PlaylistServiceService } from './playlist-service.service';

@Module({
  imports: [],
  controllers: [PlaylistServiceController],
  providers: [PlaylistServiceService],
})
export class PlaylistServiceModule {}
