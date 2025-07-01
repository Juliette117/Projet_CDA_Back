import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'apps/neo4j/neo4j.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async create(createDto: CreateMediaDto): Promise<any> {
    console.log('Payload reçu :', createDto);
    const query = `
      CREATE (m:Media: ${createDto.type})
      SET m += $props
      RETURN m
    `;

    try {
      const result = await this.neo4jService.write(query, { props: createDto });
      console.log('Résultat Neo4j :', result);
      return result.records[0]?.get('m').properties;
    } catch (error) {
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
  }): Promise<any[]> {
    const { page = 1, limit = 10, search, type, genre } = filters;

    let query = 'MATCH (m:Media)';
    const conditions: string[] = [];
    const params: any = {};

    if (type) {
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

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' RETURN m SKIP $skip LIMIT $limit';
    params.skip = (page - 1) * limit;
    params.limit = limit;

    const result = await this.neo4jService.read(query, params);
    return result.records.map((r) => r.get('m').properties);
  }

  async findOne(id: string): Promise<any> {
    const result = await this.neo4jService.read(
      'MATCH (m:Media {id: $id}) RETURN m',
      { id },
    );
    const record = result.records[0];
    if (!record) throw new Error(`Media ${id} introuvable`);
    return record.get('m').properties;
  }

  async update(id: string, updateDto: UpdateMediaDto): Promise<any> {
    const result = await this.neo4jService.write(
      `
      MATCH (m:Media {id: $id})
      SET m += $props
      RETURN m
    `,
      { id, props: updateDto },
    );
    return result.records[0]?.get('m').properties;
  }

  async remove(id: string): Promise<void> {
    await this.neo4jService.write('MATCH (m:Media {id: $id}) DELETE m', { id });
  }
}
