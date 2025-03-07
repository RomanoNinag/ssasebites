import { Module } from '@nestjs/common';
import { SeccionService } from './seccion.service';
import { SeccionController } from './seccion.controller';
import { Seccion } from './entities/seccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaModule } from 'src/materia/materia.module';
import { DocenteModule } from 'src/docente/docente.module';
import { EstudianteModule } from 'src/estudiante/estudiante.module';
import { EstudianteEnSeccionModule } from 'src/estudiante-en-seccion/estudiante-en-seccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seccion]),
    MateriaModule,
    DocenteModule,
  ],
  controllers: [SeccionController],
  providers: [SeccionService],
  exports: [SeccionService]
})
export class SeccionModule {}
