import { BaseModel } from "./base.entity";
import { Column, Entity } from "typeorm";
import { Status } from "src/todo/status.enum";

@Entity({name: 'todo'})
export class Todo extends BaseModel {
    @Column({type: 'varchar', length: 50})
    title: string;

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({ type: 'enum', enum: Status, default: Status.waiting })
    status: string;
}