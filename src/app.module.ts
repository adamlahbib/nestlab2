import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { PipeController } from './pipe/pipe.controller';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './models/item.entity';

@Module({
  imports: [PremierModule, TodoModule, CommonModule, 
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [AppController, PipeController],
  providers: [AppService],
})
export class AppModule {}
