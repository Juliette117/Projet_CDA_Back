import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from './music.entity';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) {}

  async createMusic(title: string, artist: string): Promise<Music> {
    const music = this.musicRepository.create({ title, artist });
    return this.musicRepository.save(music);
  }

  async findAllMusics(): Promise<Music[]> {
    return this.musicRepository.find();
  }
}