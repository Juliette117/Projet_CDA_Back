import { Body, Controller, Post, Logger } from '@nestjs/common';
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
    return this.authService.register(dto);
  }

  // ✅ POST /auth/login
  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    this.logger.log(`🔑 Tentative de connexion pour ${credentials.email}`);
    return this.authService.login(credentials);
  }
}