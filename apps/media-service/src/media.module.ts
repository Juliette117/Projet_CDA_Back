import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Neo4jModule } from 'apps/neo4j/neo4j.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/shared/guards/role.guard';
import { AuthModule } from 'apps/auth-service/src/auth.module';

@Module({
 imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'neo4j', // ou 'localhost' si hors docker
      port: 7687,
      username: 'neo4j',
      password: 'wpl_pass',
    }),
    AuthModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
