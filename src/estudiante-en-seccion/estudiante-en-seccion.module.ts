import { Module } from '@nestjs/common';
import { EstudianteEnSeccionService } from './estudiante-en-seccion.service';
import { EstudianteEnSeccionController } from './estudiante-en-seccion.controller';
import { SeccionModule } from 'src/seccion/seccion.module';
import { EstudianteModule } from 'src/estudiante/estudiante.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEnSeccion } from './entities/estudiante-en-seccion.entity';

@Module({
  controllers: [EstudianteEnSeccionController],
  providers: [EstudianteEnSeccionService],
  imports: [
    TypeOrmModule.forFeature([EstudianteEnSeccion]),
    SeccionModule,
    EstudianteModule,
  ],
  exports: [
    EstudianteEnSeccionService,
  ]
})
export class EstudianteEnSeccionModule {}
