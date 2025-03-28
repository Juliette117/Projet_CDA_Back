import { Test, TestingModule } from '@nestjs/testing';
import { JeuVideoService } from './jeu-video.service';

describe('JeuVideoService', () => {
  let service: JeuVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JeuVideoService],
    }).compile();

    service = module.get<JeuVideoService>(JeuVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
