import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '../enums/role.enum';
import { Playlist } from './playlist.entity';
import { Music } from './music.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ type: 'enum', enum: RoleName, default: RoleName.User })
  role: RoleName;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @ManyToMany(() => Playlist, (playlist) => playlist.favoritedBy)
  @JoinTable()
  favoritePlaylists: Playlist[];

  @ApiProperty()
  @ManyToMany(() => Music)
  @JoinTable()
  favoriteMusics: Music[];
}