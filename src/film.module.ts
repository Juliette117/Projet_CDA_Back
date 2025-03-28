import { Module } from '@nestjs/common';
import { FilmService } from './services/film.service';
import { FilmController } from './controllers/film.controller';

@Module({
  providers: [FilmService],
  controllers: [FilmController]
})
export class FilmModule {}
