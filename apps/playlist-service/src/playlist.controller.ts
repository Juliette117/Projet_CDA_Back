import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseUUIDPipe,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';


@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  /**
   * POST /playlists
   * Crée une playlist (par média ou par saison si série)
   */
  @Post()
  async create(@Body() createDto: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistService.create(createDto);
  }

  /**
   * GET /playlists
   * Récupère toutes les playlists
   */
  @Get()
  async findAll(): Promise<Playlist[]> {
    return this.playlistService.findAll();
  }

  /**
   * GET /playlists/:id
   * Récupère une playlist par ID
   */
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Playlist> {
    return this.playlistService.findOne(id);
  }

  /**
   * GET /playlists/by-media?mediaId=...&seasonNumber=...
   * Récupère la playlist associée à un média (+ saison si série)
   */
  @Get('/by-media')
  async findByMedia(
    @Query('mediaId') mediaId: string,
    @Query('seasonNumber') seasonNumber?: string,
  ): Promise<Playlist | null> {
    const season = seasonNumber !== undefined ? parseInt(seasonNumber, 10) : undefined;
    return this.playlistService.findByMedia(mediaId, season);
  }

  /**
   * PATCH /playlists/:id
   * Met à jour une playlist
   */
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    return this.playlistService.update(id, updateDto);
  }

  /**
   * DELETE /playlists/:id
   * Supprime une playlist
   */
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.playlistService.remove(id);
  }
}
