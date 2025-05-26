import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../shared-lib/entities/user.entity';
import { Music } from './music.entity';

@Entity()
export class Playlist {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; 

  @ApiProperty()
  @Column()
  name: string;

  @Column({ nullable: true })
  mediaId: number; // FK vers Media

  @Column({ nullable: true })
  season: number; // uniquement utilisé si type = 'serie'

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.favoritePlaylists)
  favoritedBy: User[];

  @ApiProperty()
  @ManyToMany(() => Music, (music) => music.playlists)
  @JoinTable()
  musics: Music[];
}
