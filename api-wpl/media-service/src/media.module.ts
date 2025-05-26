import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Team } from '../../shared-lib/entities/team.entity';
import { Media } from './media.entity';
import { Neo4jModule } from '../../neo4j/neo4j.module';



@Module({
  imports: [TypeOrmModule.forFeature([Media, Team]), Neo4jModule],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}