import { IsUUID } from 'class-validator';

export class RemoveMusicDto {
  @IsUUID()
  musicId!: string;
}
