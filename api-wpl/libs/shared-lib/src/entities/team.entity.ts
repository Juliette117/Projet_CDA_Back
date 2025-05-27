import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Music } from './music.entity';
import { Media } from './media.entity';





@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Exemple : "Christopher Nolan", "Hans Zimmer"

  @Column()
  role: string; // Exemple : "acteur", "réalisateur", "compositeur", "éditeur"

  @Column({ nullable: true })
  type?: 'person' | 'group'; // Pour distinguer artiste solo / collectif

  @ManyToMany(() => Media, media => media.teams)
  medias: Media[];

  @ManyToMany(() => Music, music => music.teams)
  musics: Music[];
}