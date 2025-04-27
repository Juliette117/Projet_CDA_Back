import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Music } from './music.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Playlist {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToMany(() => Music)
  @JoinTable()
  musics: Music[];
}