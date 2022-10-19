import { Body, Param, Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { Model } from './model';
import { TodoAddDTO } from './todoadd.dto';
import { TodoUpdateDTO } from './todoupdate.dto';
import { TodoService } from './todo.service';
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){}

    todoList: Model[] = [];

    @Get()
    getTodoList(): Model[] {
        return this.todoService.fetch();
    }

    @Post()
    createTodo(@Body() body: TodoAddDTO): Model {
        return this.todoService.create(body);
    } 

    @Get(':id')
    getTodo(@Param('id') id: string): Model{
        return this.todoService.get(id);
    } 

    @Delete(':id')
    deleteTodo(@Param('id') id: string): Model{
        return this.todoService.delete(id);
    }

    @Put(':id')
    updateTodo(@Param('id') id: string, @Body() body: TodoUpdateDTO): Model{
        return this.todoService.update(id, body);
    }

}
