import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DocenteModule } from './docente/docente.module';
import { PersonaModule } from './persona/persona.module';
import { MateriaModule } from './materia/materia.module';
import { SeccionModule } from './seccion/seccion.module';
import { EstudianteEnSeccionModule } from './estudiante-en-seccion/estudiante-en-seccion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envs.databaseUrl,
      autoLoadEntities: true,
      synchronize: true,
    }),
    EstudianteModule,
    DocenteModule,
    PersonaModule,
    MateriaModule,
    SeccionModule,
    EstudianteEnSeccionModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
