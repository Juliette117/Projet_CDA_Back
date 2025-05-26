import { Playlist } from '../../shared-lib/entities/playlist.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../shared-lib/entities/team.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  synopsis: string;

  @Column()
  type: 'movie' | 'serie' | 'videogame';

  @Column('varchar', { array: true, nullable: true })
  genres: string[];

  @Column('varchar', { array: true, nullable: true })
  tags: string[];

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  releaseYear: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  season: number;

  @Column('varchar', { array: true, nullable: true })
  platform: string[];

  @OneToOne(() => Playlist, { nullable: true })
  @JoinColumn()
  playlist: Playlist;

  @ManyToMany(() => Team, (team) => team.medias, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  teams: Team[];
}
