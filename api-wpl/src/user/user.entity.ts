import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role/role.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { Music } from 'src/playlist/music/music.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  username: string;

  @OneToMany(() => Role,(role) => role.user)
  @JoinTable()
  roles: Role[];

  @ApiProperty()
  @ManyToMany(() => Playlist, (playlist) => playlist.favoritedBy)
  @JoinTable()
  favoritePlaylists: Playlist[];

  @ApiProperty()
  @ManyToMany(() => Music)
  @JoinTable()
  favoriteMusics: Music[];
}