import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subject: string

    @Column()
    description: string

    @Column()
    completed: boolean;

}