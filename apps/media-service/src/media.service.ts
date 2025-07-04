import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'apps/neo4j/neo4j.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { randomUUID } from 'crypto';
import { parse } from 'date-fns';
import neo4j from 'neo4j-driver';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

@Injectable()
export class MediaService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async create(createDto: CreateMediaDto): Promise<any> {
    const session = this.neo4jService
      .getDriver()
      .session({ defaultAccessMode: neo4j.session.WRITE });
    const id = createDto.id ?? randomUUID();
    const label = capitalize(createDto.type);

    const mediaProps = {
      ...createDto,
      id,
      type: createDto.type,
    };

    try {
      const tx = session.beginTransaction();

      await tx.run(`CREATE (m:Media:${label}) SET m += $props`, {
        props: mediaProps,
      });

      if (Array.isArray(createDto.actors)) {
        const validActors = createDto.actors.filter(
          (a) => typeof a === 'string' && a.trim() !== '',
        );

        for (const actor of validActors) {
          await tx.run(
            `MERGE (a:Actor {name: $name})
       WITH a MATCH (m:Media {id: $mediaId})
       MERGE (a)-[:ACTED_IN]->(m)`,
            { name: actor.trim(), mediaId: id },
          );
        }
      }

      if (createDto.director) {
        await tx.run(
          `MERGE (d:Director {name: $name})
           WITH d MATCH (m:Media {id: $mediaId})
           MERGE (d)-[:DIRECTED]->(m)`,
          { name: createDto.director, mediaId: id },
        );
      }

      if (createDto.composer) {
        await tx.run(
          `MERGE (c:Composer {name: $name})
           WITH c MATCH (m:Media {id: $mediaId})
           MERGE (c)-[:COMPOSED]->(m)`,
          { name: createDto.composer, mediaId: id },
        );
      }

      await tx.commit();
      await session.close();

      const result = await this.neo4jService.read(
        `MATCH (m:Media {id: $id}) RETURN m`,
        { id },
      );
      return result.records[0]?.get('m').properties;
    } catch (error: any) {
      console.error('Erreur Neo4j create:', error);
      throw new Error('Erreur lors de la création du média');
    }
  }
  async findAll(filters: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    genre?: string;
  }) {
    const { page = 1, limit = 10, search, type, genre } = filters;
    let query = 'MATCH (m:Media)';
    const params: any = {};
    const conditions: string[] = [];

    if (type) {
      query = `MATCH (m:Media:${capitalize(type)})`;
      conditions.push('m.type = $type');
      params.type = type;
    }

    if (genre) {
      conditions.push('m.genre CONTAINS $genre');
      params.genre = genre;
    }

    if (search) {
      conditions.push('m.title CONTAINS $search');
      params.search = search;
    }

    if (conditions.length) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' RETURN m SKIP $skip LIMIT $limit';
    params.skip = neo4j.int((page - 1) * limit);
    params.limit = neo4j.int(limit);

    const result = await this.neo4jService.read(query, params);
    return result.records.map((r) => r.get('m').properties);
  }

  async findOne(id: string) {
    const result = await this.neo4jService.read(
      `MATCH (m:Media {id: $id}) RETURN m`,
      { id },
    );
    if (!result.records.length) throw new Error(`Média ${id} introuvable`);
    return result.records[0].get('m').properties;
  }

  async update(id: string, updateDto: UpdateMediaDto): Promise<any> {
    const session = this.neo4jService
      .getDriver()
      .session({ defaultAccessMode: neo4j.session.WRITE });

    const props = {
      ...updateDto,
    };

    try {
      const tx = session.beginTransaction();

      await tx.run(`MATCH (m:Media {id: $id}) SET m += $props`, { id, props });

      // Supprimer les anciennes relations
      await tx.run(
        `MATCH (a:Actor)-[r:ACTED_IN]->(m:Media {id: $id}) DELETE r`,
        { id },
      );

      // Recréer les nouvelles relations acteurs
      if (Array.isArray(updateDto.actors)) {
        const validActors = updateDto.actors.filter(
          (a) => typeof a === 'string' && a.trim() !== '',
        );

        for (const actor of validActors) {
          await tx.run(
            `MERGE (a:Actor {name: $name})
       WITH a MATCH (m:Media {id: $id})
       MERGE (a)-[:ACTED_IN]->(m)`,
            { name: actor.trim(), id },
          );
        }
      }

      await tx.commit();
      await session.close();

      const result = await this.neo4jService.read(
        `MATCH (m:Media {id: $id}) RETURN m`,
        { id },
      );
      return result.records[0]?.get('m').properties;
    } catch (err) {
      console.error('Erreur update Neo4j:', err);
      throw new Error('Échec de la mise à jour du média');
    }
  }

  async remove(id: string) {
    await this.neo4jService.write(`MATCH (m:Media {id: $id})-[r]-() DELETE r`, {
      id,
    });
    await this.neo4jService.write(`MATCH (m:Media {id: $id}) DELETE m`, { id });
  }
}
