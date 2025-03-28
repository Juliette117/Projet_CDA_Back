import { IsNotEmpty } from "class-validator";

export class CreateFilmDto {
    @IsNotEmpty()
    titre: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    dateSortie: string;
}