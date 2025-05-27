import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { AuthModule } from 'apps/auth-service/src/auth.module';
import { MediaController } from 'apps/media-service/src/media.controller';
import { MediaModule } from 'apps/media-service/src/media.module';
import { MusicModule } from 'apps/playlist-service/src/music/music.module';
import { PlaylistModule } from 'apps/playlist-service/src/playlist.module';
import { RoleModule } from 'apps/user-service/src/role/role.module';
import { UserModule } from 'apps/user-service/src/user.module';
import { Media } from 'libs/shared-lib/src/entities/media.entity';
import { Team } from 'libs/shared-lib/src/entities/team.entity';
import { Neo4jController } from 'neo4j/neo4j.controller';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    JwtModule.register({
      secret: 'jwt_secret',
      signOptions: { expiresIn: '2h' },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Media, Team],
      autoLoadEntities: true,
      synchronize: true, // Désactiver en prod
    }),

    UserModule,
    AuthModule,
    RoleModule,
    PlaylistModule,
    MusicModule,
    MediaModule,
    Neo4jModule,

  ],
  controllers: [Neo4jController, MediaController],
  providers: [],
  exports: [],
})
export class AppModule {}
