import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { catchError, firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  // ✅ Création
  async register(dto: CreateUserDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('/users', dto).pipe(
          catchError((error: AxiosError) => {
            const status = error.response?.status;
            const message = (error.response?.data as any)?.message;

            console.error('🔴 Erreur Axios interceptée :', {
              status,
              message,
              data: error.response?.data,
            });

            if (status === 409) {
              throw new ConflictException(
                message || 'Conflit : utilisateur existant',
              );
            }

            throw new InternalServerErrorException(
              'Erreur lors de la communication avec user-service',
            );
          }),
        ),
      );

      return response.data;
    } catch (error: any) {
      console.error('🔴 Erreur finale dans register', {
        name: error.name,
        message: error.message,
        status: error?.status,
        stack: error.stack,
      });

      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Erreur interne dans AuthService');
    }
  }

  // ✅ Connexion
  async login({ email, password }: { email: string; password: string }) {
    // Récupération de l'utilisateur
    const response = await firstValueFrom(
      this.httpService.get(`/users/email/${email}`),
    );
    const user = response.data;

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    // Vérification du mot de passe hashé
    this.logger.warn('mot de passe fourni :', password);
    this.logger.warn('mot de passe stocké :', user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    this.logger.warn('✅ Comparaison :', isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    // Génération du token
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }
}
