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
      this.httpService.post('http://localhost:3001/auth/register', data),
    );
    return response.data;
  }

  // LOGIN → auth-service
  async loginUser(data: any) {
    const response = await firstValueFrom(
      this.httpService.post('http://localhost:3001/auth/login', data),
    );
    return response.data;
  }

  // GET all users → user-service
  async getAllUsers() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3002/users'),
    );
    return response.data;
  }

  // GET current user (me) → user-service
  async getCurrentUser(authHeader: string) {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3002/users/me', {
        headers: {
          Authorization: authHeader,
        },
      }),
    );
    return response.data;
  }
}
