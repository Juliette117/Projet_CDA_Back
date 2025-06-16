import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistServiceController } from './playlist-service.controller';
import { PlaylistServiceService } from './playlist-service.service';

describe('PlaylistServiceController', () => {
  let playlistServiceController: PlaylistServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistServiceController],
      providers: [PlaylistServiceService],
    }).compile();

    playlistServiceController = app.get<PlaylistServiceController>(PlaylistServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(playlistServiceController.getHello()).toBe('Hello World!');
    });
  });
});
