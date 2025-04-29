import { IsNumber } from 'class-validator';

export class AttachSeasonPlaylistDto {
  @IsNumber()
  playlistId: number;

  @IsNumber()
  season: number;
}
