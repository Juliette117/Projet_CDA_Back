import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/services/user.service'; 

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('login')
  async login(@Body() { email, password }: { email: string, password: string }) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    return this.authService.login(user);
  }
}