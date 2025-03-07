import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstudianteEnSeccionDto } from './dto/create-estudiante-en-seccion.dto';
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
}
