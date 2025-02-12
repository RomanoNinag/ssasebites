import { IsNumber, IsPositive } from "class-validator";

export class CreateSeccionDto {
    @IsNumber()
    anio: number;

    @IsNumber()
    @IsPositive()
    id_materia: number;
}
