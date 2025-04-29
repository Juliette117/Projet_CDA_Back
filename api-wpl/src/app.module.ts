import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './user/role/role.module';
import { MusicModule } from './playlist/music/music.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Désactiver en prod
    }),

    UserModule,
    AuthModule,
    RoleModule,
    PlaylistModule,
    MusicModule,
  ],
})
export class AppModule {}