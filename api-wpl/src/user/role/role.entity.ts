import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

@Entity()
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.roles)
  user: User;
}
