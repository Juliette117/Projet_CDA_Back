import { Playlist } from 'src/playlist/playlist.entity';
import { Media } from './media.entity';

export class VideoGame extends Media {
  playlist: Playlist;
  plateform: string[];
}
