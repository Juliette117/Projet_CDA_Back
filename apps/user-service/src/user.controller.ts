import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
  ConflictException,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { UpdateUserDto } from '@app/shared/dto/update-user.dto';
import { CurrentUser } from '@app/shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '@app/shared/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    try {
      return await this.userService.create(dto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: 'Un utilisateur avec cet email existe déjà.',
            timestamp: new Date().toISOString(),
          },
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  // GET /users
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // ✅ Route pour accéder au profil de l'utilisateur connecté
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: any) {
    const currentUser = await this.userService.findOne(user.id);

    if (!currentUser) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    const { id, email, username, role } = currentUser;
    return { id, email, username, role };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return user;
  }

  // 📩 GET /users/email/:email
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  // PATCH /users/:id
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
