import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

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

}

