// src/media/entities/videogame.entity.ts
import { Media } from './media.entity';

export class Videogame extends Media {
  platforms!: string[];
  studio?: string;
  playlistId?: string;

  override type: 'videogame' = 'videogame';
}
