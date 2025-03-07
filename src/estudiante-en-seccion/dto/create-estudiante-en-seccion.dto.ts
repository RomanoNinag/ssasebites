import { IsInt, IsOptional } from "class-validator";

export class CreateEstudianteEnSeccionDto {
    @IsInt()
    id_estudiante: number;

    @IsInt()
    id_seccion: number;

    @IsInt()
    @IsOptional()
    nota_final: number;


}
