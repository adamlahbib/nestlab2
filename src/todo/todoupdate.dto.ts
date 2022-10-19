import { PartialType } from '@nestjs/mapped-types';
import { Status } from './status.enum';
import { TodoAddDTO } from './todoadd.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class TodoUpdateDTO extends PartialType(TodoAddDTO){
    @IsOptional()
    title?: string;
    @IsOptional()
    description?: string;
    @IsOptional()
    @IsEnum(Status)
    status: string;
    @IsOptional()
    createdAt?: Date;
}