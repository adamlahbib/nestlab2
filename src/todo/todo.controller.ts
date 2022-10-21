import { Query, Body, Param, Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { Model } from './model';
import { TodoAddDTO } from './todoadd.dto';
import { TodoUpdateDTO } from './todoupdate.dto';
import { TodoService } from './todo.service';
import { TodoQueryDTO } from './todoquery.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){}

    @Get()
    getTodoList(@Query() query: TodoQueryDTO) {
        return this.todoService.fetch(query);
    }

    @Post()
    createTodo(@Body() body: TodoAddDTO) {
        return this.todoService.create(body);
    }

    @Get('count')
    countByStatus(): any{
        return this.todoService.countByStatus();
    } 

    @Get('restore/:id')
    restore(@Param('id') id: string) {
        return this.todoService.restore(id);
    } 

    @Get(':id')
    getTodo(@Param('id') id: string) {
        return this.todoService.get(id);
    } 

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        return this.todoService.delete(id);
    }

    @Put(':id')
    updateTodo(@Param('id') id: string, @Body() body: TodoUpdateDTO) {
        return this.todoService.update(id, body);
    }

}
