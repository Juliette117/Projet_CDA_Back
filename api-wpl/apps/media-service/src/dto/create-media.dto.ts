import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  synopsis: string;

  @IsNotEmpty()
  type: 'movie' | 'serie' | 'videogame';

  @IsOptional()
  @IsArray()
  genres?: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  language?: string;

  @IsOptional()
  duration?: number;

  @IsOptional()
  image?: string;

  @IsOptional()
  releaseYear?: number;

  @IsInt()
  @IsOptional()
  season?: number;

  @IsArray()
  @IsOptional()
  platform?: string[];
}
