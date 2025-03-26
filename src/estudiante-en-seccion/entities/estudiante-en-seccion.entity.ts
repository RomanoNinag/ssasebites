import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Seccion } from "src/seccion/entities/seccion.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['estudiante', 'seccion'])
export class EstudianteEnSeccion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.secciones)
    estudiante: Estudiante;

    @ManyToOne(() => Seccion, (seccion) => seccion.estudiantes)
    seccion: Seccion;

    @Column({
        type: 'int',
        default: 0

    })
    nota_final: number;

}
