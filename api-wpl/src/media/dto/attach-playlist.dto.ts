import { IsNumber } from 'class-validator';

export class AttachPlaylistDto {
  @IsNumber()
  playlistId: number;
}
