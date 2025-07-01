export abstract class Media {
  id?: string;

  title!: string;
  description!: string;
  director?: string;
  actors?: string[];
  composer?: string;
  country?: string;
  posterUrl?: string;
  trailerUrl?: string;
  rating?: number;
  releaseDate?: Date;
  genre?: string[];
  createdAt!: Date;
  type!: 'movie' | 'serie' | 'videogame';
  // playlistId?: string;
}
