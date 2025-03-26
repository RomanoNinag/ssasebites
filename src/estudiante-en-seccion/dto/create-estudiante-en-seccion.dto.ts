import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, ValidateNested } from "class-validator";

export class CreateEstudianteEnSeccionDto {
    @IsInt()
    id_estudiante: number;

    @IsInt()
    id_seccion: number;

    @IsInt()
    @IsOptional()
    nota_final?: number;
}

export class EstudianteNotaDto {
    @IsInt()
    id_estudiante: number;

    @IsOptional()
    @IsInt()
    nota?: number; // puedes añadir más notas aquí si es necesario
}
export class CreateEstudiantesEnSeccionLoteDto {
    @IsInt()
    id_seccion: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EstudianteNotaDto)
    estudiantes: EstudianteNotaDto[];
}