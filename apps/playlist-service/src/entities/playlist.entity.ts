import { Music } from './music.entity';

export class Playlist {
  id!: string;
  name!: string;
  mediaId!: string;
  seasonNumber?: number;
  createdAt!: Date;
  musics!: Music[];
}
