import {
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  actors?: string[];

  @IsOptional()
  @IsString()
  composer?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  posterUrl?: string;

  @IsOptional()
  @IsString()
  trailerUrl?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genre?: string[];

  @IsString()
  @IsNotEmpty()
  @IsIn(['movie', 'serie', 'videogame'])
  type!: 'movie' | 'serie' | 'videogame';
}
