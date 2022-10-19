import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ CommonModule ],
  controllers: [TodoController],
  providers: [TodoService ]
})
export class TodoModule {}
