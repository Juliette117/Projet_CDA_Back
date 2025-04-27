import { IsInt, IsString } from "class-validator";

export class CreateSerieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsInt()
  season: number;
}
