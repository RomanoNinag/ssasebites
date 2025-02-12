import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDocenteDto {
    @IsString()
    @IsNotEmpty()
    formacion_academica: string;

    @IsString()
    formacion_edu_superior: string;

    @IsNumber()
    experiencia_docente: number;
}
