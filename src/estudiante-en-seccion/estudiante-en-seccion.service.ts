import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEstudianteEnSeccionDto, CreateEstudiantesEnSeccionLoteDto } from './dto/create-estudiante-en-seccion.dto';
import { UpdateEstudianteEnSeccionDto } from './dto/update-estudiante-en-seccion.dto';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { SeccionService } from 'src/seccion/seccion.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEnSeccion } from './entities/estudiante-en-seccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteEnSeccionService {
  constructor(
    @InjectRepository(EstudianteEnSeccion)
    private readonly estudianteEnSeccionRepository: Repository<EstudianteEnSeccion>,

    private readonly seccionService: SeccionService,
    private readonly estudianteService: EstudianteService
  ) { }
  async create(createEstudianteEnSeccionDto: CreateEstudianteEnSeccionDto) {
    const estudiante = await this.estudianteService.findOne(createEstudianteEnSeccionDto.id_estudiante);
    if (!estudiante) {
      throw new BadRequestException(`Estudiante con id ${createEstudianteEnSeccionDto.id_estudiante} no encontrado`);
    }
    const seccion = await this.seccionService.findOne(createEstudianteEnSeccionDto.id_seccion);
    if (!seccion) {
      throw new BadRequestException(`Seccion con id ${createEstudianteEnSeccionDto.id_seccion} no encontrada`);
    }

    const estudianteEnSeccion = this.estudianteEnSeccionRepository.create({
      ...createEstudianteEnSeccionDto,
      estudiante,
      seccion
    });

    return await this.estudianteEnSeccionRepository.save(estudianteEnSeccion);
  }

  async createMany(createEstudiantesEnSeccionLoteDto: CreateEstudiantesEnSeccionLoteDto) {
    try {
      const { id_seccion, estudiantes } = createEstudiantesEnSeccionLoteDto;
      const seccion = await this.seccionService.findOne(id_seccion);
      if (!seccion) {
        throw new BadRequestException(`Seccion con id ${id_seccion} no encontrada`);
      }
      const ids_estudiantes = estudiantes.map(e => e.id_estudiante);
      const estudiantesEncontrados = await this.estudianteService.findByIds(ids_estudiantes);

      if (estudiantes.length !== estudiantesEncontrados.length) {
        throw new BadRequestException('Algunos estudiantes no se encontraron');
      }

      const estudiantesMap = new Map(estudiantesEncontrados.map(e => [e.id_persona, e]));

      const entidades = estudiantes.map(({ id_estudiante, nota }) => {
        return this.estudianteEnSeccionRepository.create({
          seccion,
          estudiante: estudiantesMap.get(id_estudiante),
          nota_final: nota
        })
      }
      );

      return await this.estudianteEnSeccionRepository.save(entidades);

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.estudianteEnSeccionRepository.find({
      relations: ['estudiante', 'seccion'],
      select: {
        id: true,
        nota_final: true,
        estudiante: {
          id_persona: true,
          nombre: true,
          paterno: true,
          materno: true
        },
        seccion: {
          id_seccion: true,
          anio: true,
          periodo: true
        }
      }
    });

  }

  async findOne(id: number) {
    return await this.estudianteEnSeccionRepository.findOne({
      where: { id },
      relations: ['estudiante', 'seccion'],
    });
  }

  update(id: number, updateEstudianteEnSeccionDto: UpdateEstudianteEnSeccionDto) {
    return `This action updates a #${id} estudianteEnSeccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudianteEnSeccion`;
  }
  private handleDBExceptions(error) {
    console.log(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '23502') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Otro tipo de error de base de datos!');
  }
}
