import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'neo4j-driver';
import { UsersModule } from './users/users.module';
import { FilmModule } from './film/film.module';
import { SerieModule } from './serie/serie.module';
import { JeuVideoModule } from './jeu-video/jeu-video.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    FilmModule,
    SerieModule,
    JeuVideoModule,
  ],
  providers: [
    {
      provide: 'NEO4J',
      useFactory: () => createConnection(process.env.NEO4J_URI, {
        auth: { username: process.env.NEO4J_USER, password: process.env.NEO4J_PASSWORD },
      }),
    },
  ],
})
export class AppModule {}