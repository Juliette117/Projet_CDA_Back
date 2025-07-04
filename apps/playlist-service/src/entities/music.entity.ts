// src/music/entities/music.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Playlist } from './playlist.entity';


@Entity()
export class Music {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  artist!: string;

  @Column()
  duration?: number;

  @ManyToMany(() => Playlist, playlist => playlist.musics)
  playlists!: Playlist[];
}
