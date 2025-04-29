import { Playlist } from 'src/playlist/playlist.entity';
import { Media } from './media.entity';

export class Movie extends Media {
    playlist: Playlist;
  
}
