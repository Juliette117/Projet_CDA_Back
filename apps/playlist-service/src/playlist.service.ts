import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'apps/neo4j/neo4j.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { randomUUID } from 'crypto';
import { AddMusicDto } from './dto/add-music.dto';
import { UpdateMusicDto } from './dto/update-music-dto';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

@Injectable()
export class PlaylistService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async create(dto: CreatePlaylistDto) {
    const playlistId = randomUUID();

    let seasonClause = '';
    let matchClause = `MATCH (m:${capitalize(dto.mediaType)}) WHERE m.id = $mediaId`;

    if (dto.mediaType === 'serie') {
      if (dto.seasonNumber === undefined) {
        throw new Error('Season number is required for series');
      }

      seasonClause = `
      MATCH (m:${capitalize(dto.mediaType)})-[:HAS_SEASON]->(s:Season {number: $season})
      WHERE m.id = $mediaId
      WITH s AS target
    `;

      // Vérifier qu’il n’existe pas déjà de playlist pour cette saison
      const checkQuery = `
      ${seasonClause}
      MATCH (target)-[:HAS_PLAYLIST]->(existing:Playlist)
      RETURN existing LIMIT 1
    `;

      const existing = await this.neo4jService.read(checkQuery, {
        mediaId: dto.mediaId,
        season: dto.seasonNumber,
      });

      if (existing.records.length > 0) {
        throw new Error('Playlist already exists for this season');
      }
    } else {
      // Vérifier qu’il n’existe pas déjà une playlist pour ce média
      const checkQuery = `
      MATCH (m:${capitalize(dto.mediaType)} {id: $mediaId})-[:HAS_PLAYLIST]->(p:Playlist)
      RETURN p LIMIT 1
    `;

      const existing = await this.neo4jService.read(checkQuery, {
        mediaId: dto.mediaId,
      });

      if (existing.records.length > 0) {
        throw new Error('Playlist already exists for this media');
      }
    }

    // Création de la playlist
    const createQuery =
      dto.mediaType === 'serie'
        ? `
    MATCH (m:${capitalize(dto.mediaType)})-[:HAS_SEASON]->(s:Season {number: $season})
    WHERE m.id = $mediaId
    CREATE (p:Playlist {id: $id, name: $name})
    CREATE (s)-[:HAS_PLAYLIST]->(p)
    WITH p
    UNWIND $musicIds AS musicId
    MATCH (mu:Music {id: musicId})
    CREATE (p)-[:CONTAINS]->(mu)
    RETURN p
  `
        : `
    MATCH (m:${capitalize(dto.mediaType)} {id: $mediaId})
    CREATE (p:Playlist {id: $id, name: $name})
    CREATE (m)-[:HAS_PLAYLIST]->(p)
    WITH p
    UNWIND $musicIds AS musicId
    MATCH (mu:Music {id: musicId})
    CREATE (p)-[:CONTAINS]->(mu)
    RETURN p
  `;

    const params = {
      id: playlistId,
      name: dto.name,
      mediaId: dto.mediaId,
      musicIds: dto.musicIds,
      season: dto.seasonNumber,
    };

    await this.neo4jService.write(createQuery, params);
    return { message: 'Playlist created', id: playlistId };
  }


  async findAll() {
    const query = `
      MATCH (p:Playlist)
      OPTIONAL MATCH (p)-[:CONTAINS]->(m:Music)
      WITH p, collect(m {.*}) AS musics
      RETURN p {.*, musics: musics } AS playlist
    `;
    const result = await this.neo4jService.read(query);
    return result.records.map((r) => r.get('playlist'));
  }

  async findOne(id: string) {
    const query = `
      MATCH (p:Playlist {id: $id})
      OPTIONAL MATCH (p)-[:CONTAINS]->(m:Music)
      WITH p, collect(m {.*}) AS musics
      RETURN p {.*, musics: musics } AS playlist
    `;
    const result = await this.neo4jService.read(query, { id });
    return result.records[0]?.get('playlist') ?? null;
  }

  async update(id: string, dto: UpdatePlaylistDto) {
    const updates = [];
    const updateParams: any = { id };

    if (dto.name) {
      updates.push(`p.name = $name`);
      updateParams.name = dto.name;
    }

    const updateQuery = `
      MATCH (p:Playlist {id: $id})
      ${updates.length ? `SET ${updates.join(', ')}` : ''}
      RETURN p
    `;

    await this.neo4jService.write(updateQuery, updateParams);

    if (dto.musicIds) {
      const deleteRel = `
        MATCH (p:Playlist {id: $id})-[r:CONTAINS]->()
        DELETE r
      `;
      await this.neo4jService.write(deleteRel, { id });

      const addRel = `
        UNWIND $musicIds AS musicId
        MATCH (p:Playlist {id: $id})
        MATCH (m:Music {id: musicId})
        CREATE (p)-[:CONTAINS]->(m)
      `;
      await this.neo4jService.write(addRel, { id, musicIds: dto.musicIds });
    }

    return { message: 'Playlist updated' };
  }

  async remove(id: string) {
    const query = `
      MATCH (p:Playlist {id: $id})
      DETACH DELETE p
    `;
    await this.neo4jService.write(query, { id });
    return { message: 'Playlist deleted' };
  }

  // Musique
  async createMusic(dto: AddMusicDto) {
    const id = randomUUID();
    const query = `
    CREATE (m:Music {
      id: $id,
      name: $name,
      artist: $artist,
      duration: $duration,
      createdAt: datetime()
    })
    RETURN m
  `;
    await this.neo4jService.write(query, { id, ...dto });
    return { message: 'Music created', id };
  }

  async findAllMusics() {
    const query = `MATCH (m:Music) RETURN m ORDER BY m.createdAt DESC`;
    const result = await this.neo4jService.read(query);
    return result.records.map((r) => r.get('m').properties);
  }

  async findOneMusic(id: string) {
    const query = `MATCH (m:Music {id: $id}) RETURN m`;
    const result = await this.neo4jService.read(query, { id });
    return result.records[0]?.get('m').properties ?? null;
  }

  async updateMusic(id: string, dto: UpdateMusicDto) {
    const updates = [];
    const params: any = { id };

    if (dto.name) {
      updates.push('m.name = $name');
      params.name = dto.name;
    }
    if (dto.artist) {
      updates.push('m.artist = $artist');
      params.artist = dto.artist;
    }
    if (dto.duration !== undefined) {
      updates.push('m.duration = $duration');
      params.duration = dto.duration;
    }

    const query = `
    MATCH (m:Music {id: $id})
    ${updates.length ? `SET ${updates.join(', ')}` : ''}
    RETURN m
  `;
    await this.neo4jService.write(query, params);
    return { message: 'Music updated' };
  }

  async removeMusic(id: string) {
    const query = `MATCH (m:Music {id: $id}) DETACH DELETE m`;
    await this.neo4jService.write(query, { id });
    return { message: 'Music deleted' };
  }
}
