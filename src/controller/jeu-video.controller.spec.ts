import { Test, TestingModule } from '@nestjs/testing';
import { JeuVideoController } from './jeu-video.controller';

describe('JeuVideoController', () => {
  let controller: JeuVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JeuVideoController],
    }).compile();

    controller = module.get<JeuVideoController>(JeuVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
