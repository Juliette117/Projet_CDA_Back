import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistController } from './src/playlist.controller';
import { PlaylistService } from './src/playlist.service';


describe('PlaylistController', () => {
  let controller: PlaylistController;
  let service: PlaylistService;

  const mockPlaylist = {
    id: '1',
    name: 'Inception',
    isPublic: true,
  };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockPlaylist]),
    findOne: jest.fn().mockResolvedValue(mockPlaylist),
    create: jest.fn().mockResolvedValue(mockPlaylist),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [
        {
          provide: PlaylistService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all playlists', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockPlaylist]);
  });

  it('should return a playlist by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockPlaylist);
  });

//   it('should create a playlist', async () => {
//     const dto = { name: 'Chill', isPublic: true };
//     const result = await controller.create(dto);
//     expect(result).toEqual(mockPlaylist);
//   });

  it('should delete a playlist', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ affected: 1 });
  });
});
