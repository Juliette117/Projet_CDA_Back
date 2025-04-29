import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from 'src/playlist/playlist.entity';

@Entity()
export class Music {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  artist: string;

  @ApiProperty()
  @Column()
  duration: number;

  @ApiProperty()
  @ManyToMany(() => Playlist, (playlist) => playlist.musics)
  playlists: Playlist[];
}