import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteEnSeccionService } from './estudiante-en-seccion.service';
import { CreateEstudianteEnSeccionDto, CreateEstudiantesEnSeccionLoteDto } from './dto/create-estudiante-en-seccion.dto';
import { UpdateEstudianteEnSeccionDto } from './dto/update-estudiante-en-seccion.dto';

@Controller('estudiante-en-seccion')
export class EstudianteEnSeccionController {
  constructor(private readonly estudianteEnSeccionService: EstudianteEnSeccionService) {}

  @Post()
  create(@Body() createEstudianteEnSeccionDto: CreateEstudianteEnSeccionDto) {
    return this.estudianteEnSeccionService.create(createEstudianteEnSeccionDto);
  }
  @Post('lote')
  async createMany(@Body() body: CreateEstudiantesEnSeccionLoteDto) {
    return this.estudianteEnSeccionService.createMany(body);
  }

  @Get()
  findAll() {
    return this.estudianteEnSeccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteEnSeccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudianteEnSeccionDto: UpdateEstudianteEnSeccionDto) {
    return this.estudianteEnSeccionService.update(+id, updateEstudianteEnSeccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteEnSeccionService.remove(+id);
  }
}
