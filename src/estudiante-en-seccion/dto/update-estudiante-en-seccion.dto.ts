import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteEnSeccionDto } from './create-estudiante-en-seccion.dto';

export class UpdateEstudianteEnSeccionDto extends PartialType(CreateEstudianteEnSeccionDto) {}
