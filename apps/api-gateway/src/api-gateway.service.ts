import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);

  constructor(private readonly httpService: HttpService) {}

  // REGISTER → auth-service
  async registerUser(data: any) {
    const response = await firstValueFrom(
      this.httpService.post('http://auth-service:3001/auth/register', data),
    );
    return response.data;
  }

  // LOGIN → auth-service
  async loginUser(data: any) {
    const response = await firstValueFrom(
      this.httpService.post('http://auth-service:3001/auth/login', data),
    );
    return response.data;
  }

  // GET all users → user-service
  async getAllUsers() {
    const response = await firstValueFrom(
      this.httpService.get('http://user-service:3002/users'),
    );
    return response.data;
  }

  // GET current user (me) → user-service
  async getCurrentUser(authHeader: string) {
    const response = await firstValueFrom(
      this.httpService.get('http://user-service:3002/users/me', {
        headers: {
          Authorization: authHeader,
        },
      }),
    );
    return response.data;
  }

  // Appelle media-service pour récupérer tous les médias
  async getAllMedia() {
    const res$ = this.httpService.get('http://media-service:3003/media');
    const { data } = await firstValueFrom(res$);
    return data;
  }

  // récupérer tous les médias par type
  async getAllMediaByType(type: 'movie' | 'serie' | 'videogame') {
    const res$ = this.httpService.get(
      `http://media-service:3003/media?type=${type}`,
    );
    const { data } = await firstValueFrom(res$);
    return data;
  }

  // Appelle media-service pour récupérer un média
  async getMediaById(id: string) {
    const res$ = this.httpService.get(`http://media-service:3003/media/${id}`);
    const { data } = await firstValueFrom(res$);
    return data;
  }

  // Appelle media-service pour créer un film (en passant le token)
  async createMovie(authHeader: string, payload: any) {
    const res$ = this.httpService.post(
      'http://media-service:3003/media/movies',
      payload,
      {
        headers: { Authorization: authHeader },
      },
    );
    const { data } = await firstValueFrom(res$);
    return data;
  }

  // Appelle media-service pour créer une série (en passant le token)
  async createSerie(authHeader: string, payload: any) {
    const res$ = this.httpService.post(
      'http://media-service:3003/media/series',
      payload,
      {
        headers: { Authorization: authHeader },
      },
    );
    const { data } = await firstValueFrom(res$);
    return data;
  }

   // Appelle media-service pour créer une série (en passant le token)
  async createVideoGame(authHeader: string, payload: any) {
    const res$ = this.httpService.post(
      'http://media-service:3003/media/videogames',
      payload,
      {
        headers: { Authorization: authHeader },
      },
    );
    const { data } = await firstValueFrom(res$);
    return data;
  }

  // PATCH /media/:id
  async updateMedia(id: string, payload: any, authHeader: string) {
    const res$ = this.httpService.patch(
      `http://media-service:3003/media/${id}`,
      payload,
      {
        headers: { Authorization: authHeader },
      },
    );
    const { data } = await firstValueFrom(res$);
    return data;
  }

  // DELETE /media/:id
  async deleteMedia(id: string, authHeader: string) {
    const res$ = this.httpService.delete(
      `http://media-service:3003/media/${id}`,
      {
        headers: { Authorization: authHeader },
      },
    );
    const { data } = await firstValueFrom(res$);
    return data;
  }
}
