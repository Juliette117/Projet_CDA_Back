// src/media/entities/movie.entity.ts
import { Media } from './media.entity';

export class Movie extends Media {
  duration?: number;
  playlistId?: string;
  override type: 'movie' = 'movie';
}
