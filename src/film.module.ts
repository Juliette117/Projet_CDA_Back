import { Module } from '@nestjs/common';
import { FilmService } from './service/film.service';
import { FilmController } from './controller/film.controller';

@Module({
  providers: [FilmService],
  controllers: [FilmController]
})
export class FilmModule {}
