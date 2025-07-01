import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Neo4jModule } from 'apps/neo4j/neo4j.module';

@Module({
  imports: [Neo4jModule],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
