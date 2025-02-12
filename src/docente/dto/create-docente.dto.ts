import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreatePersonaDto } from "src/persona/dto/create-persona.dto";

export class CreateDocenteDto extends CreatePersonaDto {
    @IsString()
    @IsNotEmpty()
    formacion_academica: string;

    @IsString()
    formacion_edu_superior: string;

    @IsNumber()
    experiencia_docente: number;
}
