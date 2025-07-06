import { Playlist } from './playlist.entity';

export class Music {
  id!: string;
  name!: string;
  artist!: string;
  duration?: number;
  playlists?: Playlist[];
}
