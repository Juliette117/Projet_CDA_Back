import { Body, Controller, Get, Param, Post } from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';
import { AddMusicToPlaylistDto } from './dto/add-music-to-playlist.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PlaylistService } from './playlist.service';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistsService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto.name);
  }

  @Get()
  findAll() {
    return this.playlistsService.findAll();
  }

  @Post(':id/music')
  addMusic(@Param('id') id: number, @Body() addMusicDto: AddMusicToPlaylistDto) {
    return this.playlistsService.addMusicToPlaylist(id, addMusicDto.musicId);
  }
}