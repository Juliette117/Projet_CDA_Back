import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Charge les variables d’environnement depuis un .env local à ce service
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    // JWT Configuration
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const expiresIn = config.get<string>('JWT_EXPIRES_IN') || '3000s';

        if (!secret) {
          throw new Error('JWT_SECRET manquant dans le fichier .env');
        }

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),

    // Configuration pour communiquer avec le user-service
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('USER_URL') || 'http://localhost:3002',
        timeout: 5000,
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Logger],
})
export class AuthModule {}