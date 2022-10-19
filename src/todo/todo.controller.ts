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
    getTodoList(): any {
        return this.todoService.fetch();
    }

    @Post()
    createTodo(@Body() body: TodoAddDTO): any {
        return this.todoService.create(body);
    } 

    @Get(':id')
    getTodo(@Param('id') id: string): any{
        return this.todoService.get(id);
    } 

    @Get('restore/:id')
    restore(@Param('id') id: string): any{
        return this.todoService.restore(id);
    } 

    @Delete(':id')
    deleteTodo(@Param('id') id: string): any{
        return this.todoService.delete(id);
    }

    @Put(':id')
    updateTodo(@Param('id') id: string, @Body() body: TodoUpdateDTO): any{
        return this.todoService.update(id, body);
    }

}
