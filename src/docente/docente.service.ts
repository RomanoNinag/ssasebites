import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) { }
  async create(createDocenteDto: CreateDocenteDto) {
    try {
      const docente = this.docenteRepository.create(createDocenteDto);

      return await this.docenteRepository.save(docente);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.docenteRepository.find();
  }

  async findOne(id: number) {
    const docente = await this.docenteRepository.findOneBy({ id_persona: id });
    if (!docente) {
      throw new BadRequestException(`Docente con id ${id} no encontrado`);
    }
    return docente;
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    const docente = await this.docenteRepository.preload({
      id_persona: id,
      ...updateDocenteDto
    });
    if (!docente) {
      throw new BadRequestException(`Docente con id ${id} no encontrado`);
    }
    try {
      return await this.docenteRepository.save(docente);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const docente = await this.findOne(id);
    await this.docenteRepository.remove(docente);
    return docente;
  }

  private handleDBExceptions(error) {
    console.log(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '23502') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Otro tipo de error de base de datos!');
  }
}
