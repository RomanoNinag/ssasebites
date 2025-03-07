import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) { }
  async create(createEstudianteDto: CreateEstudianteDto) {
    try {
      const estudiante = this.estudianteRepository.create(createEstudianteDto);

      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findAll() {
    return await this.estudianteRepository.find({
      // relations: ['secciones'],
    });
  }

  async findOne(id: number) {
    const estudiante = await this.estudianteRepository.findOne({ 
      where: {id_persona: id },
      relations: ['secciones'],
    });
    if (!estudiante) {
      throw new BadRequestException(`Estudiante con id ${id} no encontrado`);
    }
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.estudianteRepository.preload({
      id_persona: id,
      ...updateEstudianteDto
    });
    if (!estudiante) {
      throw new BadRequestException(`Estudiante con id ${id} no encontrado`);
    }
    try {
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const estudiante = await this.findOne(id);
    await this.estudianteRepository.remove(estudiante);
    return estudiante;
  }

  private handleDBExceptions(error) {
    console.log(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '23502') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Otro tipo de error de base de datos!');
  }
}
