import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Docente extends Persona {
    @Column('text', {
    })
    formacion_academica: string;

    @Column('text', {

    })
    formacion_edu_superior: string;

    @Column('integer', {

    })
    experiencia_docente: number;
}
