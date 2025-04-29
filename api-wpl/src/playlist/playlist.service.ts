import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/playlist/music/music.entity';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistsRepository: Repository<Playlist>,
    @InjectRepository(Music)
    private musicsRepository: Repository<Music>,
  ) {}

  create(name: string) {
    const playlist = this.playlistsRepository.create({ name });
    return this.playlistsRepository.save(playlist);
  }

  findAll() {
    return this.playlistsRepository.find({ relations: ['musics'] });
  }

  async addMusicToPlaylist(playlistId: number, musicId: number) {
    const playlist = await this.playlistsRepository.findOne({
      where: { id: playlistId },
      relations: ['musics'],
    });
    const music = await this.musicsRepository.findOne({
      where: { id: musicId },
    });

    if (playlist && music) {
      playlist.musics.push(music);
      return this.playlistsRepository.save(playlist);
    }
    throw new Error('Playlist ou Music non trouvée');
  }
}
