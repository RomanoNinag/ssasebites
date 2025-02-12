import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id_persona: number;

    @Column('text', {
        unique: true
    })
    ci: string;

    @Column('text', {

    })
    paterno: string;

    @Column('text', {

    })
    materno: string;

    @Column('text', {

    })
    nombre: string;

    @Column('date', {
        nullable: true
    })
    fecha_nacimiento: string;

    @Column('text', {
        nullable: true
    })
    sexo: string;

    @Column('integer', {
        nullable: true
    })
    celular: number;

    @Column('text', {
        nullable: true
    })
    direccion: string;
}
