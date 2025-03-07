import { EstudianteEnSeccion } from "src/estudiante-en-seccion/entities/estudiante-en-seccion.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Estudiante extends Persona {
    @Column('text', {
    })
    denominacion: string;
    @Column('text', {

    })
    iglesia: string;
    @Column('text', {

    })
    pastor_iglesia: string;

    @Column({ type: 'int', nullable: true })
    nro_materias_ap: number;

    @Column({ type: 'int', nullable: true })
    nro_materias_rep: number;

    @OneToMany(() => EstudianteEnSeccion, (estSeccion) => estSeccion.estudiante)
    secciones: EstudianteEnSeccion[];
}

