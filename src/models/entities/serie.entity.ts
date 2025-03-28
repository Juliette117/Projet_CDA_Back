import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  nombreSaisons: number;
}