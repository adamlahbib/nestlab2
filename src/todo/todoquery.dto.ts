
import { IsEnum, IsOptional } from "class-validator";
import { Status } from "./status.enum";

export class TodoQueryDTO {
    @IsOptional()
    @IsEnum(Status)
    status?: string;
    @IsOptional()
    text?: string;
    take?: number;
    page?: number;
}