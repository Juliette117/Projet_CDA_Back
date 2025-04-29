import { Controller, Get, Post, Body } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('musics')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  create(@Body('title') title: string, @Body('artist') artist: string) {
    return this.musicService.createMusic(title, artist);
  }

  @Get()
  findAll() {
    return this.musicService.findAllMusics();
  }
}