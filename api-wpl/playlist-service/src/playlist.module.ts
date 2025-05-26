import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist } from '../../shared-lib/entities/playlist.entity';
import { Music } from '../../shared-lib/entities/music.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Music])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}