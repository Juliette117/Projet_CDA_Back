import { Controller, Get } from '@nestjs/common';
import { PlaylistServiceService } from './playlist-service.service';

@Controller()
export class PlaylistServiceController {
  constructor(private readonly playlistServiceService: PlaylistServiceService) {}

  @Get()
  getHello(): string {
    return this.playlistServiceService.getHello();
  }
}
