import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SerieService } from '../services/serie.service';
import { CreateSerieDto } from 'src/models/dto/create-serie.dto';

@Controller('series')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Post()
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }

  @Get()
  findAll() {
    return this.serieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serieService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serieService.remove(+id);
  }
}