import { IsArray, IsString } from 'class-validator';

export class CreateVideoGameDto {
  @IsString()
  title: string;

  @IsString()
  synopsis: string;

  @IsString()
  image?: string;

  @IsArray()
  platform?: string[];
}
