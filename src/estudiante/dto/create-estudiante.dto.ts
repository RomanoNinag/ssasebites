import { IsString } from "class-validator";

export class CreateEstudianteDto {
    @IsString()
    denominacion: string;
    @IsString()
    iglesia: string;
    @IsString()
    pastor_iglesia: string;
}
