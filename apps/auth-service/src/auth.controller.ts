import {
  Body,
  Controller,
  Post,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  // ✅ POST /auth/register
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    this.logger.log(`🔐 Tentative d'enregistrement de ${dto.email}`);
    try {
      return await this.authService.register(dto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      const err = error as Error; // ✅ cast pour accéder à .message et .stack
      this.logger.error(`🧨 Erreur inconnue : ${err.message}`, err.stack);
      throw new InternalServerErrorException('Erreur interne du serveur');
    }
  }

  // ✅ POST /auth/login
  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    this.logger.log(`🔑 Tentative de connexion pour ${credentials.email}`);
    return this.authService.login(credentials);
  }
}
