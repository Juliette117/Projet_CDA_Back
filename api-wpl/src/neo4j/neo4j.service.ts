// src/neo4j/neo4j.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import neo4j, { Driver, Result } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly neo4jDriver: Neo4jService,
    private readonly neo4jService: Neo4jService,
    private driver: Driver,
  ) {}

  onModuleInit() {
    this.driver = neo4j.driver(
      'neo4j://localhost:7687',
      neo4j.auth.basic('neo4j', 'wpl_pass'),
    );
  }

  getSession() {
    return this.driver.session();
  }

  async write(cypher: string, params: any = {}): Promise<Result> {
    return this.neo4jDriver.write(cypher, params);
  }

  async read(cypher: string, params: any = {}): Promise<Result> {
    return this.neo4jDriver.read(cypher, params);
  }

  async createMedia(
    title: string,
    description: string,
    type: string,
  ): Promise<void> {
    const cypher = `
      CREATE (m:Media {title: $title, description: $description, type: $type})
      RETURN m
    `;
    await this.neo4jService.write(cypher, { title, description, type });
  }

  async createPlaylist(name: string): Promise<void> {
    const cypher = `
      CREATE (p:Playlist {name: $name})
      RETURN p
    `;
    await this.neo4jService.write(cypher, { name });
  }

  async createMusic(
    title: string,
    artist: string,
    duration: number,
  ): Promise<void> {
    const cypher = `
      CREATE (m:Music {title: $title, artist: $artist, duration: $duration})
      RETURN m
    `;
    await this.neo4jService.write(cypher, { title, artist, duration });
  }

  async linkMediaToPlaylist(
    mediaTitle: string,
    playlistName: string,
  ): Promise<void> {
    const cypher = `
      MATCH (m:Media {title: $mediaTitle}), (p:Playlist {name: $playlistName})
      CREATE (m)-[:HAS_PLAYLIST]->(p)
    `;
    await this.neo4jService.write(cypher, { mediaTitle, playlistName });
  }

  async linkPlaylistToMusic(
    playlistName: string,
    musicTitle: string,
  ): Promise<void> {
    const cypher = `
      MATCH (p:Playlist {name: $playlistName}), (m:Music {title: $musicTitle})
      CREATE (p)-[:INCLUDES]->(m)
    `;
    await this.neo4jService.write(cypher, { playlistName, musicTitle });
  }

  async onModuleDestroy() {
    await this.driver.close();
  }
}
