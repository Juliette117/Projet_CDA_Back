// src/media/entities/serie.entity.ts
import { Media } from './media.entity';

export class Serie extends Media {
  numberOfSeasons!: number;
  numberOfEpisodes!: number;
  seasonPlaylistIds?: string[];
  override type: 'serie' = 'serie';
}
