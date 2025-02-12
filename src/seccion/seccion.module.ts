import { Module } from '@nestjs/common';
import { SeccionService } from './seccion.service';
import { SeccionController } from './seccion.controller';
import { Seccion } from './entities/seccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaModule } from 'src/materia/materia.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seccion]),
    MateriaModule
  ],
  controllers: [SeccionController],
  providers: [SeccionService],
})
export class SeccionModule {}
