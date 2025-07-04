import { Media, MediaType } from './media.entity';

export class Movie extends Media {
  playlistId?: string;
  override type = MediaType.MOVIE;
}
