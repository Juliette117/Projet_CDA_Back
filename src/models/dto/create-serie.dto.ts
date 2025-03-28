import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSerieDto {
  @IsNotEmpty()
  titre: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  nombreSaison: number;
  
}
