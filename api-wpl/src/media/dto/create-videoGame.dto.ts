import { IsArray, IsString } from 'class-validator';

export class CreateVideoGameDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsArray()
  platform: string[];
}
