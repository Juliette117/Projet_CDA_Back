import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Neo4jModule } from 'apps/neo4j/neo4j.module';
import { AuthModule } from 'apps/auth-service/src/auth.module';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'neo4j', 
      port: 7687,
      username: 'neo4j',
      password: 'wpl_pass',
    }),
    AuthModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
