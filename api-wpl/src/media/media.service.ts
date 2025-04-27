import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';
import { Serie } from './serie.entity';
import { VideoGame } from './videoGame.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateSerieDto } from './dto/create-serie.dto';
import { CreateVideoGameDto } from './dto/create-videoGame.dto';


/**
 * Service pour gérer les médias (Movie, Serie, VideoGame)
 */
@Injectable()
export class MediaService {
  private movies: Movie[] = [];
  private series: Serie[] = [];
  private videoGames: VideoGame[] = [];

  createMovie(createMovieDto: CreateMovieDto): Movie {
    const movie: Movie = {
      id: uuidv4(), // génère un id unique
      ...createMovieDto, // copie tous les autres champs du DTO
    };
    // enregistre movie dans la base
    return movie;
  }

  createSerie(createSerieDto: CreateSerieDto): Serie {
    const serie: Serie = {
        id: uuidv4(),
        ...createSerieDto,
    };
    return serie;
  }

  createVideoGame(createVideoGameDto: CreateVideoGameDto): VideoGame {
    const videoGame: VideoGame = {
        id: uuidv4(),
        ...createVideoGameDto,
        plateform: []
    };
    return videoGame;
  }

  findAllMovies() {
    return this.movies;
  }

  findAllSeries() {
    return this.series;
  }

  findAllVideoGames() {
    return this.videoGames;
  }
}
function uuidv4(): string {
    throw new Error('Function not implemented.');
}

