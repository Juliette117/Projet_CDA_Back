import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth-service/src/jwt-auth.guard';
import { Roles } from '../../../libs/shared-lib/src/decorators/role.decorator';
import { RolesGuard } from '../../../libs/shared-lib/src/guards/role.guard'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const userId = req.user.id; // injecté automatiquement par validate()
    return this.userService.findById(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dashboard/admin')
  @Roles('admin')
  getAdminDashboard() {
    return { message: 'Dashboard réservé aux administrateurs'}
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dashboard/moderator')
  @Roles('moderator')
  getModeratorDashboard() {
    return { message: 'Dashboard réservé aux modérateurs'}
  }
}
