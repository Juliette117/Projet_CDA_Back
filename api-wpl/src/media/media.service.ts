import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';
import { Serie } from './serie.entity';
import { VideoGame } from './videoGame.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateSerieDto } from './dto/create-serie.dto';
import { CreateVideoGameDto } from './dto/create-videoGame.dto';
import { v4 as uuidv4 } from 'uuid';
import { Playlist } from 'src/playlist/playlist.entity';


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
      ...createMovieDto,
      playlist: new Playlist
    };
    // enregistre movie dans la base
    return movie;
  }

  createSerie(createSerieDto: CreateSerieDto): Serie {
    const serie: Serie = {
      id: uuidv4(),
      ...createSerieDto,
      seasonPlaylist: new Map()
    };
    return serie;
  }

  createVideoGame(createVideoGameDto: CreateVideoGameDto): VideoGame {
    const videoGame: VideoGame = {
      id: uuidv4(),
      ...createVideoGameDto,
      plateform: [],
      playlist: new Playlist
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


