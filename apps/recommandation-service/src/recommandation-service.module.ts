import { Module } from '@nestjs/common';
import { RecommandationServiceController } from './recommandation-service.controller';
import { RecommandationServiceService } from './recommandation-service.service';

@Module({
  imports: [],
  controllers: [RecommandationServiceController],
  providers: [RecommandationServiceService],
})
export class RecommandationServiceModule {}
