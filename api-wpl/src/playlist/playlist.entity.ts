import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Music } from './music/music.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

@Entity()
export class Playlist {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.favoritePlaylists)
  favoritedBy: User[];

  @ApiProperty()
  @ManyToMany(() => Music, (music) => music.playlists)
  @JoinTable()
  musics: Music[];
}