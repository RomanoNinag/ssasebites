import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) { }
  async create(createMateriaDto: CreateMateriaDto) {
    try {
      const materia = this.materiaRepository.create(createMateriaDto);

      return await this.materiaRepository.save(materia);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.materiaRepository.find();
  }

  async findOne(id: number) {
    const materia = await this.materiaRepository.findOneBy({ id_materia: id });
    if (!materia) {
      throw new BadRequestException(`Materia con id ${id} no encontrada`);
    }
    return materia;
  }

  async update(id: number, updateMateriaDto: UpdateMateriaDto) {
    const materia = await this.materiaRepository.preload({
      id_materia: id,
      ...updateMateriaDto
    });
    if (!materia) {
      throw new BadRequestException(`Materia con id ${id} no encontrada`);
    }
    try {
      return await this.materiaRepository.save(materia);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const materia = await this.findOne(id);
    await this.materiaRepository.remove(materia);
    return materia;
  }
  
  private handleDBExceptions(error) {
    console.log(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '23502') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Otro tipo de error de base de datos!');
  }
}
