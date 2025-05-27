import { IsInt, IsString } from "class-validator";

export class CreateSerieDto {
  @IsString()
  title: string;

  @IsString()
  synopsis: string;

  @IsString()
  image: string;

  @IsInt()
  season: number;
}
