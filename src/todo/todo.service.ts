import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from './model';
import { Status } from './status.enum';
import { TodoAddDTO } from './todoadd.dto';
import { TodoUpdateDTO } from './todoupdate.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from 'src/models/item.entity';

@Injectable()
export class TodoService { 
    @Inject('UUID') uuid;   
    constructor(@InjectRepository(Todo) private readonly repo: Repository<Todo>){}
    
    todoList: Model[]=[];

    async create(todo: TodoAddDTO){
        const item = this.repo.create(todo);
        this.repo.save(item);
        return item;
    }

    async fetch(){
        return this.repo.find();
    }

    async get(id: any){
        const item=await this.repo.findOne({where: {id:id}});
        if (!item) {
            throw new NotFoundException('Todo not found');
        }
        return item;
    }

    async update(id: any, todo: TodoUpdateDTO){
        const item=await this.repo.findOne({where: {id:id}});
        if (!item) {
            throw new NotFoundException('Todo not found');
        }

        item.title=todo.title;
        item.description=todo.description;
        item.status=todo.status;

        return this.repo.save(item);
    }

    async delete(id: any){
        const item=await this.repo.findOne({where: {id:id}});
        if (!item) {
            throw new NotFoundException('Todo not found');
        }
        this.repo.softRemove(item);
        return item;
    }

    async restore(id: any){
        const item=await this.repo.findOne({where: {id:id}});
        if (!item) {
            return this.repo.restore(id);
        }
        else {
            return item;
        }
    }
}
