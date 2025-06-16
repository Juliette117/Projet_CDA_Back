import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
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
}
