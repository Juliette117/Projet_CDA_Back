import { Controller, Get } from '@nestjs/common';
import { RecommandationServiceService } from './recommandation-service.service';

@Controller()
export class RecommandationServiceController {
  constructor(private readonly recommandationServiceService: RecommandationServiceService) {}

  @Get()
  getHello(): string {
    return this.recommandationServiceService.getHello();
  }
}
