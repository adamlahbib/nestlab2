import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from './model';
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

    async verify(id) {
        const item=await this.repo.findOne({where: {id:id}});
        if (!item) {
            throw new NotFoundException('Todo not found');
        }
        return item;
    }

    async create(todo: TodoAddDTO){
        const item = this.repo.create(todo);
        this.repo.save(item);
        return item;
    }

    paginateResponse(data,page,limit) {
        const [result, total]=data;
        const lastPage=Math.ceil(total/limit);
        const nextPage=page+1 >lastPage ? null :page+1;
        const prevPage=page-1 < 1 ? null :page-1;
        return {
          statusCode: 'success',
          data: [...result],
          count: total,
          currentPage: page,
          nextPage: nextPage,
          prevPage: prevPage,
          lastPage: lastPage,
        }
    }

    async fetch(query?:TodoQueryDTO){
        const take=query.take || 2;
        const page=query.page || 1;
        const skip=(page-1)*take;

        let data={};
        
        if (query.status || query.text){
            const qb=this.repo.createQueryBuilder('todo');
            if (query.status) {
                qb.andWhere('todo.status = :status', {status: query.status});
            }
            if (query.text) {
                qb.andWhere('todo.title LIKE :text OR todo.description LIKE :text', {text: `%${query.text}%`});
            }
            qb.skip(skip);
            qb.take(take);
            const [result, total]=await qb.getManyAndCount();
            data = [result,total];

        } else {
            data = await this.repo.findAndCount({order: {createdAt: 'DESC'}, take: take, skip: skip});
        }

        return this.paginateResponse(data,page,take); 
    }

    async get(id: string){
        const item=await this.repo.findOne({where: {id:id}});
        if (!item) {
            throw new NotFoundException('Todo not found');
        }
        return item;
    }

    async update(id: string, todo: TodoUpdateDTO){
        const item=await this.repo.preload({id:id,...todo});
        if (!item) {
            throw new NotFoundException('Todo not found');
        }
        return this.repo.save(item);
    }

    async delete(id: string){
        const item = await this.verify(id);
        this.repo.softRemove(item);
        return item;
    }

    async restore(id: string){
        const item=await this.repo.findOne({where: {id:id}});
        if (!item) {
            return this.repo.restore(id);
        }
        else {
            return item;
        }
    }

    async countByStatus(){
        const qb=this.repo.createQueryBuilder('todo');
        qb.select('todo.status, COUNT(todo.status) as count');
        qb.groupBy('todo.status');
        return qb.getRawMany();
    }
}
