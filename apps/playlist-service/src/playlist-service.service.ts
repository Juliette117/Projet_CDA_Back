import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaylistServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
