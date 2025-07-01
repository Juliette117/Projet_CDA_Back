import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from 'apps/neo4j/neo4j.module';
import { MediaModule } from './media.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Neo4jModule,
    MediaModule,
  ],
})
export class AppModule {}
