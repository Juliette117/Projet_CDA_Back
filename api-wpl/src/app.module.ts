// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { UserModule } from '../user-service/src/user.module';
// import { RoleModule } from '../user-service/src/role/role.module';
// import { JwtModule } from '@nestjs/jwt';
// import { MediaModule } from '../media-service/src/media.module';
// import { Neo4jModule } from '../neo4j/neo4j.module';

// import { AuthModule } from '../auth-service/src/auth.module';
// import { MusicModule } from '../playlist-service/src/music/music.module';
// import { PlaylistModule } from '../playlist-service/src/playlist.module';;
// import { Neo4jController } from '../neo4j/neo4j.controller';
// import { MediaController } from '../media-service/src/media.controller';
// import { Team } from '../shared-lib/entities/team.entity';
// import { Media } from '../media-service/src/media.entity';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),

//     JwtModule.register({
//       secret: 'jwt_secret',
//       signOptions: { expiresIn: '2h' },
//     }),

//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT || '5432', 10),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       entities: [Media, Team],
//       autoLoadEntities: true,
//       synchronize: true, // Désactiver en prod
//     }),

//     UserModule,
//     AuthModule,
//     RoleModule,
//     PlaylistModule,
//     MusicModule,
//     MediaModule,
//     Neo4jModule,

//   ],
//   controllers: [Neo4jController, MediaController],
//   providers: [],
//   exports: [],
// })
// export class AppModule {}
