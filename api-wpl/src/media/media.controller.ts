import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateSerieDto } from './dto/create-serie.dto';
import { CreateVideoGameDto } from './dto/create-videoGame.dto';
import { AttachPlaylistDto } from './dto/attach-playlist.dto';
import { AttachSeasonPlaylistDto } from './dto/attach-season-playlist.dto';

@ApiTags('medias')
@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('movie')
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.mediaService.createMovie(createMovieDto);
  }

  @Post('serie')
  createSerie(@Body() createSerieDto: CreateSerieDto) {
    return this.mediaService.createSerie(createSerieDto);
  }

  @Post('videogame')
  createVideoGame(@Body() createVideoGameDto: CreateVideoGameDto) {
    return this.mediaService.createVideoGame(createVideoGameDto);
  }

  @Get('movies')
  findAllMovies() {
    return this.mediaService.findAllMovies();
  }

  @Get('series')
  findAllSeries() {
    return this.mediaService.findAllSeries();
  }

  @Get('videogames')
  findAllVideoGames() {
    return this.mediaService.findAllVideoGames();
  }

  @Post('movie/:id/playlist')
  attachPlaylistToMovie(@Param('id') id: number, @Body() dto: AttachPlaylistDto) {


}

@Post('videogame/:id/playlist')
attachPlaylistToVideoGame(@Param('id') id: number, @Body() dto: AttachPlaylistDto) {

}

@Post('serie/:id/season')
attachPlaylistToSerieSeason(@Param('id') id: number, @Body() dto: AttachSeasonPlaylistDto) {

}
}