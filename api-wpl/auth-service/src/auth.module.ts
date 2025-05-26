import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../src/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../user-service/src/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RoleModule } from '../../user-service/src/role/role.module';
import { UserService } from '../../user-service/src/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../shared-lib/entities/user.entity';
import { Role } from '../../shared-lib/entities/role.entity';
import { CreateUserDto } from '../../shared-lib/dto/create-user.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, CreateUserDto]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'jwt_secret',
      signOptions: { expiresIn: '2h' },
    }),
    UserModule,
    RoleModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
