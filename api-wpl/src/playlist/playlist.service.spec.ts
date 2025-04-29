import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Music } from './music/music.entity';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

describe('PlaylistsService', () => {
  let service: PlaylistService;
  let playlistRepository: Repository<Playlist>;
  let musicRepository: Repository<Music>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        {
          provide: getRepositoryToken(Playlist),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Music),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
    playlistRepository = module.get<Repository<Playlist>>(getRepositoryToken(Playlist));
    musicRepository = module.get<Repository<Music>>(getRepositoryToken(Music));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a playlist', async () => {
    const createSpy = jest.spyOn(playlistRepository, 'create').mockReturnValue({ name: 'Playlist 1' } as any);
    const saveSpy = jest.spyOn(playlistRepository, 'save').mockResolvedValue({ id: 1, name: 'Playlist 1' } as any);

    const playlist = await service.create('Playlist 1');
    expect(createSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
    expect(playlist).toEqual({ id: 1, name: 'Playlist 1' });
  });

  it('should add music to a playlist', async () => {
    const playlist = { id: 1, musics: [] } as unknown as Playlist;
    const music = { id: 1 } as Music;

    jest.spyOn(playlistRepository, 'findOne').mockResolvedValue(playlist);
    jest.spyOn(musicRepository, 'findOne').mockResolvedValue(music);
    const saveSpy = jest.spyOn(playlistRepository, 'save').mockResolvedValue(playlist);

    const result = await service.addMusicToPlaylist(1, 1);
    expect(result.musics.length).toBe(1);
    expect(saveSpy).toHaveBeenCalled();
  });
});