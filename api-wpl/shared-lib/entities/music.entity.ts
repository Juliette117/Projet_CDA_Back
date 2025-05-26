import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from './playlist.entity';
import { Team } from './team.entity';


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

  @ManyToMany(() => Team, (team) => team.musics, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  teams: Team[];
}
