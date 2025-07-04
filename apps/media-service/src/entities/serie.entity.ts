import { Media, MediaType } from './media.entity';

export class Serie extends Media {
  numberOfSeasons!: number;
  numberOfEpisodes!: number;
  seasonPlaylistIds?: string[];
  override type = MediaType.SERIE;
}
