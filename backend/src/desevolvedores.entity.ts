import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Niveis } from "./niveis.entity";

@Entity("desenvolvedores")
export class Desenvolvedores {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Niveis)
    @JoinColumn()
    nivel: number;

    @Column()
    nome: string;

    @Column()
    sexo: string;

    @Column()
    datanascimento: string

}