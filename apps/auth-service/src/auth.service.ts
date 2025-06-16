import {
  ConflictException,
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
      // ✅ Hashage du mot de passe



      const newUser = { ...dto };

      const response = await firstValueFrom(
        this.httpService.post('/users', newUser).pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 409) {
              throw new ConflictException('Cet email est déjà utilisé.');
            }
            throw error;
          }),
        ),
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 409) {
        throw new ConflictException(error.response.data?.message || 'Conflit');
      }

      this.logger.error('Erreur lors de l’enregistrement', error);
      throw new InternalServerErrorException(
        'Erreur serveur lors de l’enregistrement',
      );
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
