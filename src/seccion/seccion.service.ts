import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { Seccion } from './entities/seccion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from 'src/materia/entities/materia.entity';
import { MateriaService } from 'src/materia/materia.service';
import { DocenteService } from 'src/docente/docente.service';

@Injectable()
export class SeccionService {

  constructor(
    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,

    private readonly materiaService: MateriaService,

    private readonly docenteService: DocenteService,

  ) { }
  async create(createSeccionDto: CreateSeccionDto) {
    try {
      const materia = await this.materiaService.findOne(createSeccionDto.id_materia);
      if (!materia) {
        throw new BadRequestException(`Materia con id ${createSeccionDto.id_materia} no encontrada`);
      }

      const docente = await this.docenteService.findOne(createSeccionDto.id_docente);
      if (!docente) {
        throw new BadRequestException(`Docente con id ${createSeccionDto.id_docente} no encontrada`);
      }

      const seccion = this.seccionRepository.create({
        ...createSeccionDto,
        materia,
        docente
      });
      return await this.seccionRepository.save(seccion);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.seccionRepository.find({
      relations: ['materia', 'docente'],
      select: {
        id_seccion: true,
        anio: true,
        periodo: true,
        materia: {
          id_materia: true,
          nombre: true
        },
        docente: {
          id_persona: true,
          nombre: true,
          paterno: true,
          materno: true
        }
      }
    });
  }

  async findOne(id: number) {
    const seccion = await this.seccionRepository.findOne({
      where: {
        id_seccion: id,
      },
      relations: ['materia', 'docente']

    });
    if (!seccion) {
      throw new BadRequestException(`Seccion con id ${id} no encontrada`);
    }
    return seccion;
  }

  async update(id: number, updateSeccionDto: UpdateSeccionDto) {

    const materia = await this.materiaService.findOne(updateSeccionDto.id_materia);

    const seccion = await this.seccionRepository.preload({
      id_seccion: id,
      ...updateSeccionDto,
      materia
    });
    if (!seccion) {
      throw new BadRequestException(`Seccion con id ${id} no encontrada`);
    }
    try {
      return await this.seccionRepository.save(seccion);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const seccion = await this.findOne(id);
    await this.seccionRepository.remove(seccion);
    return seccion;
  }
  private handleDBExceptions(error) {
    console.log(error);

    if (error instanceof BadRequestException) throw error;
    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '23502') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Otro tipo de error de base de datos!');
  }
}
