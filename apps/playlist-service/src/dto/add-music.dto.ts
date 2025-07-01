import { IsUUID } from 'class-validator';

export class AddMusicDto {
  @IsUUID()
  musicId!: string;
}