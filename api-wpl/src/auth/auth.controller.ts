import { Controller, Post, Body,  Get, Req, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(
      signupDto.email,
      signupDto.username,
      signupDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      
    }
  }
}