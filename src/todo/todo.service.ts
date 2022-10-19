import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from './model';
import { Status } from './status.enum';
import { TodoAddDTO } from './todoadd.dto';
import { TodoUpdateDTO } from './todoupdate.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Todo } from 'src/models/item.entity';
import { TodoQueryDTO } from './todoquery.dto';

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

    async fetch(query?:TodoQueryDTO){
        let condition={};

        if(query.text && query.status){
            condition = [{title: Like(`%${query.text}%`), status: query.status}, {description: Like(`%${query.text}%`), status: query.status}];
        }
        else if(query.text){
            condition = [{title: Like(`%${query.text}%`)}, {description: Like(`%${query.text}%`)}];
        }
        else if(query.status){
            condition = {status: query.status};
        }
        return await this.repo.find({where: condition});
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

    async countByStatus(){
        const count = await this.repo.query('SELECT status, COUNT(*) FROM todo GROUP BY status');
        return(count);
    }
}
