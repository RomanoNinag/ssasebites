import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Materia {
    @PrimaryGeneratedColumn()
    id_materia: number;

    @Column('text', {
        unique: true
    })
    nombre: string;
}
