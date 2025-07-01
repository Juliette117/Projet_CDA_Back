// src/playlist/entities/playlist.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Music } from './music.entity';

@Entity()
export class Playlist {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  // Lien vers un média
  @Column()
  mediaId!: string;

  @Column({ nullable: true })
  seasonNumber?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => Music, { cascade: true })
  @JoinTable()
  musics!: Music[];
}
