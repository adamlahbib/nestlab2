import { Status } from "./status.enum";

export class Model {
    constructor(
        public id:string='',
        public name:string='',
        public description:string='',
        public createdAt=new Date(),
        public status:Status=Status.waiting
    ){}
}
