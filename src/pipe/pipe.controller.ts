import { ArgumentMetadata, BadRequestException, Body, Controller, Injectable, Post, UsePipes } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';

@Controller('pipes')
@Injectable()
export class PipeController implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        if (this.isTypeAcceptable(metadata.metatype, value) && metadata.type==='body') {
            return (value as string[]).map((val: string) => val.toLocaleUpperCase());
        }
        throw new BadRequestException(`Argument expected should be an array of strings!`);
    }

    isTypeAcceptable(type: any, value: any): boolean {
        if (typeof type === 'function' && Array.isArray(value)) {
          return value.every((val) => typeof val === 'string');
        }
        return false;
    }

    @Post('skills')
    @UsePipes(PipeController)
    skills(@Body('skills') skills:string[]): string{
        return skills.join("-"); 
    }
}

