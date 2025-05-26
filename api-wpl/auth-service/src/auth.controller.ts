import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from "../../shared-lib/dto/create-user.dto";
import { RolesGuard } from '../../shared-lib/guards/role.guard';
import { Roles } from '../../shared-lib/decorators/role.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiResponse({ status: 201, description: 'Utilisateur inscrit avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(
      dto.email,
      dto.username,
      dto.password,
      dto.role,
    );
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Utilisateur connecté avec succès.',
  })
  @ApiResponse({ status: 401, description: 'Indentifiants invalides.' })
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
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dashboard/admin')
  @Roles('admin')
  getAdminDashboard(@Req() req) {
    console.log('REQ.USER =', req.user);
    return 'Dashboard admin';
  }
}
