import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Neo4jService } from './neo4j.service';

@ApiTags('neo4j')
@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jMediaService: Neo4jService) {}

  @Post('media')
  createMedia(@Body() body: { title: string; description: string; type: string }) {
    return this.neo4jMediaService.createMedia(body.title, body.description, body.type);
  }

  @Post('playlist')
  createPlaylist(@Body() body: { name: string }) {
    return this.neo4jMediaService.createPlaylist(body.name);
  }

  @Post('music')
  createMusic(@Body() body: { title: string; artist: string; duration: number }) {
    return this.neo4jMediaService.createMusic(body.title, body.artist, body.duration);
  }

  @Post('media/playlist')
  linkMediaToPlaylist(@Body() body: { mediaTitle: string; playlistName: string }) {
    return this.neo4jMediaService.linkMediaToPlaylist(body.mediaTitle, body.playlistName);
  }

  @Post('playlist/music')
  linkPlaylistToMusic(@Body() body: { playlistName: string; musicTitle: string }) {
    return this.neo4jMediaService.linkPlaylistToMusic(body.playlistName, body.musicTitle);
  }
}