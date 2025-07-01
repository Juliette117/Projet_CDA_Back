import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  Headers
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Request } from 'express';
import { JwtAuthGuard } from '@app/shared/guards/jwt-auth.guard';

@Controller()
export class ApiGatewayController {
  constructor(private readonly gatewayService: ApiGatewayService) {}

  // Inscription → auth-service
  @Post('auth/register')
  async register(@Body() data: any) {
    return this.gatewayService.registerUser(data);
  }

  // Connexion → auth-service
  @Post('auth/login')
  async login(@Body() data: any) {
    return this.gatewayService.loginUser(data);
  }

  // Tous les utilisateurs → user-service
  @Get('users')
  async getUsers() {
    return this.gatewayService.getAllUsers();
  }

  // Détail de l'utilisateur connecté → user-service
  @UseGuards(JwtAuthGuard)
  @Get('users/me')
  getMe(@Req() req: Request) {
    const authHeader = req.headers['authorization'] || '';
    return this.gatewayService.getCurrentUser(authHeader);
  }

  // ========== MEDIA ==========
  @Get('media')
  getAllMedia() {
    return this.gatewayService.getAllMedia();
  }

  @Get('media/:id')
  getMediaById(@Param('id') id: string) {
    return this.gatewayService.getMediaById(id);
  }

  // ========== MOVIES ==========
  @Get('media/movies')
  getAllMovies() {
    return this.gatewayService.getAllMediaByType('movie');
  }

  @Get('media/movies/:id')
  getMovieById(@Param('id') id: string) {
    return this.gatewayService.getMediaById(id);
  }

  @Post('media/movies')
  createMovie(@Body() body: any, @Headers('authorization') auth: string) {
    return this.gatewayService.createMedia(auth, { ...body, type: 'movie' });
  }

  @Put('media/movies/:id')
  updateMovie(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('authorization') auth: string,
  ) {
    return this.gatewayService.updateMedia(id, body, auth);
  }

  @Delete('media/movies/:id')
  deleteMovie(@Param('id') id: string, @Headers('authorization') auth: string) {
    return this.gatewayService.deleteMedia(id, auth);
  }

  // ========== SERIES ==========
  @Get('media/series')
  getAllSeries() {
    return this.gatewayService.getAllMediaByType('serie');
  }

  @Get('media/series/:id')
  getSeriesById(@Param('id') id: string) {
    return this.gatewayService.getMediaById(id);
  }

  @Post('media/series')
  createSeries(@Body() body: any, @Headers('authorization') auth: string) {
    return this.gatewayService.createMedia(auth, { ...body, type: 'serie' });
  }

  @Put('media/series/:id')
  updateSeries(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('authorization') auth: string,
  ) {
    return this.gatewayService.updateMedia(id, body, auth);
  }

  @Delete('media/series/:id')
  deleteSeries(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    return this.gatewayService.deleteMedia(id, auth);
  }

  // ========== VIDEOGAMES ==========
  @Get('media/videogames')
  getAllVideogames() {
    return this.gatewayService.getAllMediaByType('videogame');
  }

  @Get('media/videogames/:id')
  getVideogameById(@Param('id') id: string) {
    return this.gatewayService.getMediaById(id);
  }

  @Post('media/videogames')
  createVideogame(@Body() body: any, @Headers('authorization') auth: string) {
    return this.gatewayService.createMedia(auth, { ...body, type: 'videogame' });
  }

  @Put('media/videogames/:id')
  updateVideogame(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('authorization') auth: string,
  ) {
    return this.gatewayService.updateMedia(id, body, auth);
  }

  @Delete('media/videogames/:id')
  deleteVideogame(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    return this.gatewayService.deleteMedia(id, auth);
  }
}