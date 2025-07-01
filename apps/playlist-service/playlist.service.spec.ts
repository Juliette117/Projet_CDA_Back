import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './src/entities/playlist.entity';
import { PlaylistService } from './src/playlist.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let repo: jest.Mocked<Repository<Playlist>>;

  const mockPlaylist: Playlist = {
    name: '',
  } as Playlist;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        {
          provide: getRepositoryToken(Playlist),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
    repo = module.get(getRepositoryToken(Playlist));
  });

  describe('create', () => {
    it('should create a new playlist', async () => {
      repo.findOne.mockResolvedValueOnce(null); // No existing playlist
      repo.create.mockReturnValue(mockPlaylist);
      repo.save.mockResolvedValueOnce(mockPlaylist);

      const result = await service.create({
        mediaId: 'media1',
        seasonNumber: 1,
        name: '',
        musicIds: [],
      });

      expect(result).toEqual(mockPlaylist);
      expect(repo.create).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalledWith(mockPlaylist);
    });

    it('should throw ConflictException if playlist exists', async () => {
      repo.findOne.mockResolvedValueOnce(mockPlaylist); // Already exists

      await expect(
        service.create({
          mediaId: 'media1',
          seasonNumber: 1,
          name: '',
          musicIds: [],
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all playlists', async () => {
      repo.find.mockResolvedValueOnce([mockPlaylist]);

      const result = await service.findAll();

      expect(result).toEqual([mockPlaylist]);
      expect(repo.find).toHaveBeenCalledWith({ relations: ['musics'] });
    });
  });

  describe('findOne', () => {
    it('should return one playlist by ID', async () => {
      repo.findOne.mockResolvedValueOnce(mockPlaylist);

      const result = await service.findOne('1');
      expect(result).toEqual(mockPlaylist);
    });

    it('should throw NotFoundException if not found', async () => {
      repo.findOne.mockResolvedValueOnce(null);

      await expect(service.findOne('42')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByMedia', () => {
    it('should return a playlist by media and season', async () => {
      repo.findOne.mockResolvedValueOnce(mockPlaylist);

      const result = await service.findByMedia('media1', 1);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { mediaId: 'media1', seasonNumber: 1 },
      });
      expect(result).toEqual(mockPlaylist);
    });

    it('should return null if none found', async () => {
      repo.findOne.mockResolvedValueOnce(null);

      const result = await service.findByMedia('mediaX');
      expect(result).toBeNull();
    });
  });
});
