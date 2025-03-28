import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'neo4j-driver';
import { Neo4jModule } from './neo4j/neo4j.module';
import { UsersModule } from './users.module';
import { FilmModule } from './film.module';
import { SerieModule } from './serie.module';
import { JeuVideoModule } from './jeu-video.module';
import { User } from './models/entities/user.entity';
import { Film } from './models/entities/film.entity';
import { Serie } from './models/entities/serie.entity';
import { JeuVideo } from './models/entities/jeu-video.entity';

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