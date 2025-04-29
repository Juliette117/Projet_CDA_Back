import { Playlist } from 'src/playlist/playlist.entity';
import { Media } from './media.entity';

export class Serie extends Media {
  seasonPlaylist: Map<number, Playlist>;
  season: number;
}
