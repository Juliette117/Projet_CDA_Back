import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import neo4j, { Driver} from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  constructor() {}

  private driver!: Driver;

  onModuleInit() {
    this.driver = neo4j.driver(
      process.env.NEO4J_URI || 'bolt://neo4j:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USERNAME || 'neo4j',
        process.env.NEO4J_PASSWORD || 'wpl_pass',
      ),
    );
  }

  async read(query: string, params: any = {}) {
    const session = this.driver.session();
    try {
      return await session.run(query, params);
    } finally {
      await session.close();
    }
  }

 async write(cypher: string, params: any = {}) {
  const session = this.driver.session();
  try {
    return await session.writeTransaction(tx => tx.run(cypher, params));
  } finally {
    await session.close();
  }
}


  async onModuleDestroy() {
    await this.driver.close();
  }

  // Récupérer tous les médias
  async getAllMedias(): Promise<any[]> {
    const result = await this.read(`
      MATCH (m:Media) RETURN m
    `);
    return result.records.map((record) => record.get('m').properties);
  }

  // Créer une relation entre médias
  async createMediaRelation(fromId: number, toId: number, relation: string) {
    const result = await this.write(
      `
    MATCH (m:Media {id: $fromId}), (mr:Media {id: $toId})
    MERGE (m)-[r:${relation}]->(mr)
    RETURN m, r, mr
    `,
      { fromId, toId },
    );

    return {
      from: result.records[0].get('m').properties,
      to: result.records[0].get('mr').properties,
      relation: relation,
    };
  }

  // Récupère les médias liés à un média donné via une relation donnée
  async getRelatedMedias(mediaId: number, relation: string): Promise<any[]> {
    const result = await this.read(
      `
    MATCH (m:Media {id: $mediaId})-[:${relation}]->(related:Media)
    RETURN related
    `,
      { mediaId },
    );

    return result.records.map((record) => record.get('related').properties);
  }

  // Récupère les playlists liées à un média
  async getPlaylistsByMediaId(mediaId: number): Promise<any[]> {
    const result = await this.read(
      `
      MATCH (m:Media {id: $mediaId})-[:HAS_PLAYLIST]->(p:Playlist)
      RETURN p
      `,
      { mediaId },
    );
    return result.records.map((record) => record.get('p').properties);
  }

  // Créer une relation Media -> Playlist
  async relateMediaToPlaylist(mediaId: number, playlistId: number) {
    const result = await this.write(
      `
      MATCH (m:Media {id: $mediaId}), (p:Playlist {id: $playlistId})
      MERGE (m)-[:HAS_PLAYLIST]->(p)
      RETURN m, p
      `,
      { mediaId, playlistId },
    );
    return {
      media: result.records[0].get('m').properties,
      playlist: result.records[0].get('p').properties,
    };
  }

  // Créer une relation Media -> Music
  async relateMediaToMusic(mediaId: number, musicId: number) {
    const result = await this.write(
      `
      MATCH (m:Media {id: $mediaId}), (mu:Music {id: $musicId})
      MERGE (m)-[:INCLUDES]->(mu)
      RETURN m, mu
      `,
      { mediaId, musicId },
    );
    return {
      media: result.records[0].get('m').properties,
      music: result.records[0].get('mu').properties,
    };
  }

  // Supprimer la relation Media → Playlist
  async removePlaylistRelation(mediaId: number, playlistId: number) {
    await this.write(
      `
    MATCH (m:Media {id: $mediaId})-[r:HAS_PLAYLIST]->(p:Playlist {id: $playlistId})
    DELETE r
    `,
      { mediaId, playlistId },
    );
    return { message: 'Relation supprimée : Media → Playlist' };
  }

  // Supprimer la relation Media → Music
  async removeMusicRelation(mediaId: number, musicId: number) {
    await this.write(
      `
    MATCH (m:Media {id: $mediaId})-[r:INCLUDES]->(mu:Music {id: $musicId})
    DELETE r
    `,
      { mediaId, musicId },
    );
    return { message: 'Relation supprimée : Media → Music' };
  }
}
