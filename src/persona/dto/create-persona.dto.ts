import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePersonaDto {
    @IsString()
    @IsNotEmpty()
    ci: string; // Campo único

    @IsString()
    @IsNotEmpty()
    paterno: string;

    @IsString()
    @IsNotEmpty()
    materno: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    // Para fecha_nacimiento, podemos usar IsDateString si esperamos un ISO date, 
    // o IsString si recibimos un formato distinto.
    @IsOptional()
    @IsDateString()
    fecha_nacimiento?: string;

    @IsOptional()
    @IsString()
    sexo?: string;

    @IsOptional()
    @IsNumber()
    celular?: number;

    @IsOptional()
    @IsString()
    direccion?: string;
 }
