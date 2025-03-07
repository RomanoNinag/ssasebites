import { Docente } from "src/docente/entities/docente.entity";
import { EstudianteEnSeccion } from "src/estudiante-en-seccion/entities/estudiante-en-seccion.entity";
import { Materia } from "src/materia/entities/materia.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seccion {
    @PrimaryGeneratedColumn()
    id_seccion: number;

    @Column('integer', {

    })
    anio: number;

    @Column('integer', {
        
    })
    periodo: number;
    
    @ManyToOne(() => Docente, (docente) => docente.secciones, {nullable: true, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_docente' })
    docente: Docente;

    @ManyToOne(() => Materia,{
    
    })
    @JoinColumn({ name: 'id_materia' })
    materia: Materia;

    @OneToMany(() => EstudianteEnSeccion, (estSeccion) => estSeccion.seccion)
    estudiantes: EstudianteEnSeccion[];
}
