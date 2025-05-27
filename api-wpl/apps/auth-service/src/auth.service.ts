import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user-service/src/user.service';
import { RoleName } from '../../../libs/shared-lib/src/enums/role.enum';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Inscription d'un nouvel utilisateur
  async signup(
    email: string,
    username: string,
    password: string,
    role?: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const validRole = Object.values(RoleName);
    const assignedRole: RoleName = validRole.includes(role?.trim() as RoleName) ? (role!.trim() as RoleName) : RoleName.User;

    return this.userService.create({
      email,
      username,
      password: hashedPassword,
      role: assignedRole,
    });
    
  }

  // Connexion
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Utilisateur introuvable');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      throw new UnauthorizedException('Mot de passe incorrect');

    // sub = subject (à quoi fait référence le token)
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    };
  }
}
