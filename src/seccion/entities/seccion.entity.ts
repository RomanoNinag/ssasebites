import { Materia } from "src/materia/entities/materia.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seccion {
    @PrimaryGeneratedColumn()
    id_seccion: number;

    @Column('integer', {

    })
    anio: number;

    @ManyToOne(() => Materia,{
    
    })
    @JoinColumn({ name: 'id_materia' })
    materia: Materia;
}
