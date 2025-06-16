import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  // Récupérer tous les médias
  @Get('medias')
  async getAllMedias() {
    return this.neo4jService.getAllMedias();
  }

  // Ajoute une relation entre médias
  @Post('medias/:fromId/relations/:toId')
  createRelation(
    @Param('fromId') fromId: string,
    @Param('toId') toId: string,
    @Body() body: { relation: string },
  ) {
    return this.neo4jService.createMediaRelation(+fromId, +toId, body.relation);
  }

  // Récupère les médias liés par une relation donnée
  @Get('medias/:mediaId/relations/:relationType')
  getRelatedMedias(
    @Param('mediaId') mediaId: string,
    @Param('relationType') relation: string,
  ) {
    return this.neo4jService.getRelatedMedias(+mediaId, relation);
  }

  // Récupérer les playlists liées à un média
  @Get('medias/:id/playlists')
  async getMediaPlaylists(@Param('id') id: string) {
    return this.neo4jService.getPlaylistsByMediaId(+id);
  }

  // Ajouter une relation entre un média et une playlist
  @Post('medias/:id/relate')
  async relateToPlaylist(
    @Param('id') mediaId: string,
    @Body() body: { playlistId: number },
  ) {
    return this.neo4jService.relateMediaToPlaylist(+mediaId, body.playlistId);
  }

  // Autre relation possible : media -> music
  @Post('medias/:id/relate-music')
  async relateToMusic(
    @Param('id') mediaId: string,
    @Body() body: { musicId: number },
  ) {
    return this.neo4jService.relateMediaToMusic(+mediaId, body.musicId);
  }

  @Delete('medias/:mediaId/playlists/:playlistId')
  removePlaylistRelation(
    @Param('mediaId') mediaId: string,
    @Param('playlistId') playlistId: string,
  ) {
    return this.neo4jService.removePlaylistRelation(+mediaId, +playlistId);
  }

  @Delete('medias/:mediaId/musics/:musicId')
  removeMusicRelation(
    @Param('mediaId') mediaId: string,
    @Param('musicId') musicId: string,
  ) {
    return this.neo4jService.removeMusicRelation(+mediaId, +musicId);
  }
}
