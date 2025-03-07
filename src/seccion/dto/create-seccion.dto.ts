import { IsIn, IsNumber, IsPositive } from "class-validator";

export class CreateSeccionDto {
    @IsNumber()
    @IsPositive()
    anio: number;

    @IsNumber()
    @IsPositive()
    @IsIn([1, 2], { message: 'El periodo solo puede ser 1 o 2' })
    periodo: number;

    @IsNumber()
    @IsPositive()
    id_materia: number;

    @IsNumber()
    @IsPositive()
    id_docente: number;
}
