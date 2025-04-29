import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Music } from './music/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Music])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}