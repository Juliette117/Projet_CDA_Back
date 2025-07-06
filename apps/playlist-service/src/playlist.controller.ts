import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  async create(@Body() createDto: CreatePlaylistDto) {
    return await this.playlistService.create(createDto);
  }

  @Get()
  async findAll() {
    return await this.playlistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const playlist = await this.playlistService.findOne(id);
    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }
    return playlist;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdatePlaylistDto) {
    return await this.playlistService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.remove(id);
  }
}
