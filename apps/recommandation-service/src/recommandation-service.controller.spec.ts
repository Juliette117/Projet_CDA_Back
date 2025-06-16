import { Test, TestingModule } from '@nestjs/testing';
import { RecommandationServiceController } from './recommandation-service.controller';
import { RecommandationServiceService } from './recommandation-service.service';

describe('RecommandationServiceController', () => {
  let recommandationServiceController: RecommandationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecommandationServiceController],
      providers: [RecommandationServiceService],
    }).compile();

    recommandationServiceController = app.get<RecommandationServiceController>(RecommandationServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(recommandationServiceController.getHello()).toBe('Hello World!');
    });
  });
});
