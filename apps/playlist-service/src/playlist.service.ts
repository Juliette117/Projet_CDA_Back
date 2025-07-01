import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  /**
   * Crée une nouvelle playlist pour un média.
   * Si le média est une série, une playlist par saison est autorisée.
   * Si ce n'est pas une série, une seule playlist est autorisée.
   */
  async create(createDto: CreatePlaylistDto): Promise<Playlist> {
    const existing = await this.findByMedia(createDto.mediaId, createDto.seasonNumber);

    if (existing) {
      throw new ConflictException('Une playlist existe déjà pour ce média.');
    }

    const playlist = this.playlistRepository.create({
      ...createDto,
      createdAt: new Date(),
    });

    return await this.playlistRepository.save(playlist);
  }

  /**
   * Récupère toutes les playlists.
   */
  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepository.find({ relations: ['musics'] });
  }

  /**
   * Récupère une playlist par ID.
   */
  async findOne(id: string): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist ${id} introuvable`);
    }

    return playlist;
  }

  /**
   * Récupère une playlist par mediaId.
   */
  async findByMedia(mediaId: string, seasonNumber?: number): Promise<Playlist | null> {
    const where: any = { mediaId };

    if (seasonNumber !== undefined) {
      where.seasonNumber = seasonNumber;
    }

    return await this.playlistRepository.findOne({ where });
  }

  /**
   * Met à jour une playlist.
   */
  async update(id: string, updateDto: UpdatePlaylistDto): Promise<Playlist> {
    const playlist = await this.findOne(id);
    Object.assign(playlist, updateDto);
    return await this.playlistRepository.save(playlist);
  }

  /**
   * Supprime une playlist.
   */
  async remove(id: string): Promise<void> {
    const result = await this.playlistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Playlist ${id} introuvable pour suppression`);
    }
  }
}
