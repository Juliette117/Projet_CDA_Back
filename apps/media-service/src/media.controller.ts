import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async create(@Body() dto: CreateMediaDto) {
    try {
      return await this.mediaService.create(dto);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erreur inconnue',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('genre') genre?: string,
  ) {
    try {
      console.log('GET /media');


      return await this.mediaService.findAll({
        page: +page,
        limit: +limit,
        search,
        type,
        genre,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error instanceof Error ? error.message : 'Erreur inconnue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.mediaService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Introuvable',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMediaDto) {
    try {
      return await this.mediaService.update(id, dto);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erreur inconnue',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.mediaService.remove(id);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erreur inconnue',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
