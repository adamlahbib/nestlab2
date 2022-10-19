import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class TodoAddDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(10)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;
}