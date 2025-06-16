import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from '@app/shared/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'secret',
        signOptions: { expiresIn: '1d' },
      }),
    }),
    HttpModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, JwtStrategy, JwtAuthGuard],
})
export class ApiGatewayModule {}