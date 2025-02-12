import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Persona]),

    ],
})
export class PersonaModule { }
