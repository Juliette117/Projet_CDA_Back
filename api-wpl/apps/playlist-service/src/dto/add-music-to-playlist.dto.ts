import { IsNumber } from 'class-validator';

export class AddMusicToPlaylistDto {
  @IsNumber()
  musicId: number;
}
