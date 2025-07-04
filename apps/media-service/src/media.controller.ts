import {
  Controller, Get, Post, Body, Param, Query,
  Patch, Delete, Req, UseGuards, HttpException, HttpStatus
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { JwtAuthGuard } from '@app/shared/guards/jwt-auth.guard';
import { RolesGuard } from '@app/shared/guards/role.guard';
import { Roles } from '@app/shared/decorators/role.decorator';
import { Request } from 'express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // FILMS
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('movies')
  createMovie(@Body() dto: CreateMediaDto, @Req() req: Request) {
    return this.createTypedMedia(dto, 'movie', req);
  }

  @Get('movies')
  getMovies() {
    return this.mediaService.findAll({ type: 'movie' });
  }

  // SÉRIES
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('series')
  createSeries(@Body() dto: CreateMediaDto, @Req() req: Request) {
    return this.createTypedMedia(dto, 'serie', req);
  }

  @Get('series')
  getSeries() {
    return this.mediaService.findAll({ type: 'serie' });
  }

  // JEUX VIDÉO
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('videogames')
  createVideogame(@Body() dto: CreateMediaDto, @Req() req: Request) {
    return this.createTypedMedia(dto, 'videogame', req);
  }

  @Get('videogames')
  getVideoGames() {
    return this.mediaService.findAll({ type: 'videogame' });
  }

  // Lister tous les médias avec filtres
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('genre') genre?: string,
  ) {
    return this.mediaService.findAll({
      page: parseInt(page.toString(), 10),
      limit: parseInt(limit.toString(), 10),
      search,
      type,
      genre,
    });
  }

  // Détail
  @Get(':id')
  async findOne(@Param('id') id: string, @Query('type') type?: string) {
    try {
      return await this.mediaService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Introuvable',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Modifier
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMediaDto) {
    return this.mediaService.update(id, dto);
  }

  // Supprimer
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }

  private async createTypedMedia(dto: CreateMediaDto, type: string, req: Request) {
    const user = req.user as any;
    return this.mediaService.create({ ...dto, type });
  }
}