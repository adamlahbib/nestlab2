import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CommonModule } from 'src/common/common.module';
import { Todo } from 'src/models/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ CommonModule, TypeOrmModule.forFeature([Todo]) ],
  controllers: [TodoController],
  providers: [TodoService ]
})
export class TodoModule {}
