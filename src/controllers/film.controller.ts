import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FilmService } from '../services/film.service';
import { CreateFilmDto } from 'src/models/dto/create-film.dto';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmService.remove(+id);
  }
}