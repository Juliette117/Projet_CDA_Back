import { IsString, IsOptional, IsUUID, IsArray, IsInt, Min } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  name!: string;

  @IsUUID()
  mediaId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  seasonNumber?: number;

  @IsArray()
  @IsUUID('all', { each: true })
  musicIds!: string[];
}
