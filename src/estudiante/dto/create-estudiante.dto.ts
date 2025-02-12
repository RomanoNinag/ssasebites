import { IsString } from "class-validator";
import { CreatePersonaDto } from "src/persona/dto/create-persona.dto";

export class CreateEstudianteDto extends CreatePersonaDto {
    @IsString()
    denominacion: string;
    @IsString()
    iglesia: string;
    @IsString()
    pastor_iglesia: string;
}
