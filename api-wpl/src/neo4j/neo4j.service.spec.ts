import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jService } from './neo4j.service';

describe('Neo4jService', () => {
  let service: Neo4jService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Neo4jService,
        {
          provide: Neo4jService,
          useValue: {
            write: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<Neo4jService>(Neo4jService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a media', async () => {
    const spy = jest.spyOn(neo4jService, 'write');
    await service.createMedia('Inception', 'Dream movie', 'Movie');
    expect(spy).toHaveBeenCalled();
  });

  it('should create a playlist', async () => {
    const spy = jest.spyOn(neo4jService, 'write');
    await service.createPlaylist('Playlist 1');
    expect(spy).toHaveBeenCalled();
  });

  it('should create a music', async () => {
    const spy = jest.spyOn(neo4jService, 'write');
    await service.createMusic('Time', 'Hans Zimmer', 270);
    expect(spy).toHaveBeenCalled();
  });

  it('should link media to playlist', async () => {
    const spy = jest.spyOn(neo4jService, 'write');
    await service.linkMediaToPlaylist('Inception', 'Playlist 1');
    expect(spy).toHaveBeenCalled();
  });

  it('should link playlist to music', async () => {
    const spy = jest.spyOn(neo4jService, 'write');
    await service.linkPlaylistToMusic('Playlist 1', 'Time');
    expect(spy).toHaveBeenCalled();
  });
});
