import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  dateSortie: string;
}