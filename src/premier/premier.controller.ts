import { Controller, Get, Post, Delete, Put, Patch } from '@nestjs/common';

@Controller('premier')
export class PremierController {

@Get()
getPremier(){
    console.log('GET');
    return 'GET';
}


@Post()
postPremier(){
    console.log('POST');
    return 'POST';
}


@Delete()
deletePremier(){
    console.log('DELETE');
    return 'DELETE';
}

@Put()
putPremier(){
    console.log('PUT');
    return 'PUT';
}

@Patch()
patchPremier(){
    console.log('PATCH');
    return 'PATCH';
}


}