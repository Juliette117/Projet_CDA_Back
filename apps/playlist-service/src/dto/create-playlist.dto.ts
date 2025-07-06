import { IsString, IsOptional, IsUUID, IsArray, IsInt, IsIn, IsNumber } from 'class-validator';

export class CreatePlaylistDto {
@IsString()
  name!: string;

  @IsUUID()
  mediaId!: string;

  @IsIn(['movie', 'serie', 'videogame'])
  mediaType!: 'movie' | 'serie' | 'videogame';

  @IsArray()
  @IsUUID('all', { each: true })
  musicIds!: string[];

  @IsOptional()
  @IsNumber()
  seasonNumber?: number;
}

