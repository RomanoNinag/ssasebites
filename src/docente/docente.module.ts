import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Docente])
  ],
  controllers: [DocenteController],
  providers: [DocenteService],
  exports: [DocenteService]
})
export class DocenteModule { }
