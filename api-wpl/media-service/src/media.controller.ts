import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Media } from './media.entity';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { JwtAuthGuard } from '../../auth-service/src/jwt-auth.guard';
import { RolesGuard } from '../../shared-lib/guards/role.guard';
import { Roles } from '../../shared-lib/decorators/role.decorator';
import { RoleName } from '../../shared-lib/enums/role.enum';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  async findAll() {
    return this.mediaService.findAll();
  }

  // FILMS
  @Get('movies')
  async findAllMovies() {
    return this.mediaService.findAllMovies();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.Admin)
  @Post('movies')
  async create(@Body() dto: CreateMediaDto) {
    return this.mediaService.createMedia(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.Admin)
  @Patch('movies/:id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.updateMedia(+id, updateMediaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.Admin)
  @Delete('movies/:id')
  delete(@Param('id') id: string) {
    return this.mediaService.deleteMedia(+id);
  }

  // SERIES
   @Get('series')
  async findAllSeries() {
    return this.mediaService.findAllSeries();
  }

  // JEUX VIDEO
   @Get('videogames')
  async findAllVideoGames() {
    return this.mediaService.findAllVideoGames();
  }
}
