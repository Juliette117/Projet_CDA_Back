import { IsNotEmpty } from 'class-validator';

export class CreateJeuVideoDto {
  @IsNotEmpty()
  titre: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  plateforme: string;
  
}
