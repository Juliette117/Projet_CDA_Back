import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Neo4jService } from '../../../neo4j/neo4j.service';
import { Media } from '../../../libs/shared-lib/src/entities/media.entity';
import { Team } from '../../../libs/shared-lib/src/entities/team.entity'


@Injectable()
export class MediaService {
  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>
  ) {}

  // Créer un média (BDD + Neo4j)
  async createMedia(dto: CreateMediaDto): Promise<Media> {
    const media = this.mediaRepo.create({
      title: dto.title,
      synopsis: dto.synopsis,
      type: dto.type,
      genres: dto.genres,
      tags: dto.tags,
      language: dto.language,
      duration: dto.duration,
      releaseYear: dto.releaseYear,
      image: dto.image
    });

    // // Lier les équipes si fournies
    // if (dto.teamIds?.length) {
    //   media.teams = await this.teamRepo.findBy({ id: In(dto.teamIds) });
    // }

    const saved = await this.mediaRepo.save(media);

    // Création du noeud Neo4j
    await this.neo4jService.write(
      `
      CREATE (m:Media {
        id: $id, title: $title, type: $type, releaseYear: $releaseYear
      })
      `,
      {
        id: saved.id,
        title: saved.title,
        type: saved.type,
        releaseYear: saved.releaseYear
      }
    );

    return saved;
  }

  // Mise à jour d’un média
  async updateMedia(id: number, dto: UpdateMediaDto): Promise<Media> {
    const media = await this.mediaRepo.findOneBy({ id });
    if (!media) throw new NotFoundException(`Media with id ${id} not found`);

    const updated = Object.assign(media, dto);
    const result = await this.mediaRepo.save(updated);

    // Mettre à jour Neo4j
    await this.neo4jService.write(
      `
      MATCH (m:Media {id: $id})
      SET m.title = $title, m.type = $type, m.releaseYear = $releaseYear
      `,
      {
        id: result.id,
        title: result.title,
        type: result.type,
        releaseYear: result.releaseYear
      }
    );

    return result;
  }

  // Suppression d’un média (BDD + Neo4j)
  async deleteMedia(id: number): Promise<void> {
    const media = await this.mediaRepo.findOneBy({ id });
    if (!media) throw new NotFoundException(`Media ${id} introuvable`);
    await this.mediaRepo.delete(id);

    // Supprimer aussi le noeud Neo4j
    await this.neo4jService.write(
      `MATCH (m:Media {id: $id}) DETACH DELETE m`,
      { id }
    );
  }

  // Lire tous les médias
  async findAll(): Promise<Media[]> {
    return this.mediaRepo.find({
      relations: ['teams'],
      order: { id: 'DESC' }
    });
  }

  async findAllMovies(): Promise<Media[]> {
    return this.mediaRepo.find({ where: { type: 'movie' } });
  }

  async findAllSeries(): Promise<Media[]> {
    return this.mediaRepo.find({ where: { type: 'serie' } });
  }

  async findAllVideoGames(): Promise<Media[]> {
    return this.mediaRepo.find({ where: { type: 'videogame' } });
  }

  // Lire un seul média avec ses équipes
  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepo.findOne({
      where: { id },
      relations: ['teams']
    });
    if (!media) throw new NotFoundException(`Média ${id} introuvable`);
    return media;
  }
}